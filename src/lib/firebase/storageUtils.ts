'use server';
// Firebase Storage Utilities for Server Components

import { storage } from './firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { storage as adminStorage } from './firebaseAdmin';

/**
 * Deletes a file from Firebase Storage
 * @param url The full URL of the file to delete
 * @returns Promise<boolean> True if successful, false otherwise
 */
export async function deleteFileFromStorage(url: string): Promise<boolean> {
  try {
    if (!url || !url.includes('firebasestorage')) {
      return false;
    }
    
    // Extract the file path from the URL
    const urlObj = new URL(url);
    const fullPath = urlObj.pathname.split('/o/')[1];
    
    if (!fullPath) {
      return false;
    }
    
    // Decode the path
    const decodedPath = decodeURIComponent(fullPath);
    
    // Delete the file
    const bucket = adminStorage.bucket();
    await bucket.file(decodedPath).delete();
    
    return true;
  } catch (error) {
    console.error('Error deleting file from storage:', error);
    return false;
  }
}

/**
 * Validates a file URL to ensure it belongs to our Firebase Storage
 * @param url The URL to validate
 * @returns boolean True if valid, false otherwise
 */
export function isValidFirebaseStorageUrl(url: string): boolean {
  if (!url) return false;
  
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.includes('firebasestorage.googleapis.com') && 
           urlObj.pathname.includes('/o/');
  } catch (error) {
    return false;
  }
}

/**
 * Uploads a file to Firebase Storage
 * @param file The file to upload
 * @param path The storage path (folder)
 * @returns Promise with the download URL
 */
export const uploadFile = async (file: File, path: string = 'uploads'): Promise<string> => {
  try {
    // Create a unique filename to prevent collisions
    const fileExtension = file.name.split('.').pop();
    const fileName = `${uuidv4()}.${fileExtension}`;
    const fullPath = `${path}/${fileName}`;
    
    // Create a storage reference
    const storageRef = ref(storage, fullPath);
    
    // Upload the file
    const snapshot = await uploadBytes(storageRef, file);
    
    // Get the download URL
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    return downloadURL;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw new Error('Failed to upload file');
  }
};

/**
 * Uploads multiple files to Firebase Storage
 * @param files Array of files to upload
 * @param path The storage path (folder)
 * @returns Promise with an array of download URLs
 */
export const uploadMultipleFiles = async (files: File[], path: string = 'uploads'): Promise<string[]> => {
  try {
    // Upload each file and collect the promises
    const uploadPromises = files.map(file => uploadFile(file, path));
    
    // Wait for all uploads to complete
    const downloadURLs = await Promise.all(uploadPromises);
    
    return downloadURLs;
  } catch (error) {
    console.error('Error uploading multiple files:', error);
    throw new Error('Failed to upload one or more files');
  }
};

/**
 * Uploads images for a portfolio project
 * @param files Array of image files
 * @param projectId Optional project ID for organizing files
 * @returns Promise with an array of download URLs
 */
export const uploadPortfolioImages = async (files: File[], projectId?: string): Promise<string[]> => {
  // Create a specific path for portfolio images
  const path = projectId ? `portfolio/${projectId}` : 'portfolio';
  
  // Upload the images
  return await uploadMultipleFiles(files, path);
};
