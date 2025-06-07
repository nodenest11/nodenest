import { db } from './firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import imageCompression from 'browser-image-compression';

/**
 * Compresses an image file using browser-image-compression library
 * @param file The image file to compress
 * @param maxSizeMB Maximum size in MB
 * @param maxWidthOrHeight Maximum width or height in pixels
 * @returns Promise with compressed image file
 */
const compressImageFile = async (
  file: File, 
  maxSizeMB: number = 0.5, 
  maxWidthOrHeight: number = 800
): Promise<File> => {
  try {
    console.log(`Original image: ${file.name}, size: ${(file.size / 1024 / 1024).toFixed(2)}MB`);
    
    const options = {
      maxSizeMB,
      maxWidthOrHeight,
      useWebWorker: true,
      fileType: 'image/jpeg',
      initialQuality: 0.6,
    };
    
    const compressedFile = await imageCompression(file, options);
    console.log(`Compressed to: ${(compressedFile.size / 1024 / 1024).toFixed(2)}MB, ${Math.round((1 - compressedFile.size / file.size) * 100)}% reduction`);
    
    return compressedFile;
  } catch (error) {
    console.error('Error during image compression:', error);
    throw error;
  }
};

/**
 * Converts a file to base64 string
 */
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

/**
 * Determines if a file is an image that can be compressed
 */
const isCompressibleImage = (file: File): boolean => {
  return file.type.startsWith('image/') && 
         (file.type === 'image/jpeg' || 
          file.type === 'image/png' || 
          file.type === 'image/webp');
};

/**
 * Uploads a file to Firestore as base64 string with compression for images
 * @param file The file to upload
 * @param path The collection path
 * @param options Optional compression options
 * @returns Promise with the base64 string
 */
export const uploadFile = async (
  file: File, 
  path: string = 'uploads',
  options?: { maxSizeMB?: number; maxWidthOrHeight?: number }
): Promise<string> => {
  try {
    let base64String: string;
    
    // Apply compression for images, or use regular base64 conversion for other files
    if (isCompressibleImage(file)) {
      // Compress the image
      const compressedFile = await compressImageFile(
        file, 
        options?.maxSizeMB || 0.5, 
        options?.maxWidthOrHeight || 800
      );
      
      // Convert compressed file to base64
      base64String = await fileToBase64(compressedFile);
      
      // Emergency compression if still too large
      if (base64String.length > 750000) { // ~750KB to stay well under the 1MB limit
        console.warn(`Image still large after compression: ${(base64String.length / 1024 / 1024).toFixed(2)}MB`);
        
        // Try more aggressive compression
        const emergencyCompressedFile = await compressImageFile(
          file, 
          0.2, // Very aggressive compression
          600   // Smaller dimensions
        );
        
        base64String = await fileToBase64(emergencyCompressedFile);
        console.log(`After emergency compression: ${(base64String.length / 1024 / 1024).toFixed(2)}MB`);
      }
    } else {
      // For non-images, just convert to base64
      base64String = await fileToBase64(file);
    }
    
    // Store in Firestore (with size check)
    if (base64String.length > 1000000) { // Very close to 1MB limit
      console.error(`File too large for Firestore: ${(base64String.length / 1024 / 1024).toFixed(2)}MB`);
      throw new Error('File too large for Firestore storage. Please use a smaller file.');
    }
    
    // Create file metadata
    const fileData = {
      id: uuidv4(),
      filename: file.name,
      contentType: isCompressibleImage(file) ? 'image/jpeg' : file.type,
      size: base64String.length,
      base64Data: base64String,
      createdAt: new Date()
    };
    
    // Add document to Firestore
    const collectionRef = collection(db, path);
    await addDoc(collectionRef, fileData);
    
    return base64String;
  } catch (error) {
    console.error('Error uploading file to Firestore:', error);
    throw new Error('Failed to upload file: ' + (error instanceof Error ? error.message : 'Unknown error'));
  }
};

/**
 * Uploads multiple portfolio images to Firestore with aggressive compression
 * @param files Array of image files to upload
 * @returns Array of base64 strings
 */
export const uploadPortfolioImages = async (files: File[]): Promise<string[]> => {
  if (!files.length) return [];
  
  try {
    const results: string[] = [];
    
    // Process each file individually for better control
    for (const file of files) {
      // Dynamically adjust compression based on file count
      const options = {
        maxSizeMB: files.length > 1 ? 0.3 : 0.5,
        maxWidthOrHeight: files.length > 3 ? 600 : 800
      };
      
      const base64String = await uploadFile(file, 'portfolio_images', options);
      results.push(base64String);
    }
    
    return results;
  } catch (error) {
    console.error('Error processing portfolio images:', error);
    throw error;
  }
};

/**
 * Uploads a single image for a blog post to Firestore with compression
 * @param file The image file to upload
 * @returns Promise with the base64 string
 */
export const uploadBlogImage = async (file: File): Promise<string> => {
  // Less aggressive compression for blog images
  const options = {
    maxSizeMB: 0.6,
    maxWidthOrHeight: 1200
  };
  
  // Upload the image with compression
  return await uploadFile(file, 'blog_images', options);
};