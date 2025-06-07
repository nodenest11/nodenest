import { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from './firebaseConfig';

interface UploadProgress {
  progress: number;
  url: string | null;
  error: string | null;
}

/**
 * Custom hook for managing file uploads to Firebase Storage
 */
export function useStorage() {
  const [uploading, setUploading] = useState<Record<string, UploadProgress>>({});

  /**
   * Upload a file to Firebase Storage
   * @param file The file to upload
   * @param path The storage path where the file should be saved
   * @param metadata Optional file metadata
   * @returns The unique upload ID to track progress
   */
  const uploadFile = (
    file: File,
    path: string,
    metadata?: any
  ): string => {
    if (!file) return '';

    // Create a unique ID for this upload
    const uploadId = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    
    // Initialize progress state
    setUploading(prev => ({
      ...prev,
      [uploadId]: { progress: 0, url: null, error: null }
    }));

    // Generate a unique filename
    const fileExtension = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExtension}`;
    
    // Create storage reference
    const storageRef = ref(storage, `${path}/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);

    // Listen for state changes
    uploadTask.on(
      'state_changed',
      // Progress
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploading(prev => ({
          ...prev,
          [uploadId]: { ...prev[uploadId], progress }
        }));
      },
      // Error
      (error) => {
        setUploading(prev => ({
          ...prev,
          [uploadId]: { ...prev[uploadId], error: error.message }
        }));
      },
      // Complete
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        setUploading(prev => ({
          ...prev,
          [uploadId]: { ...prev[uploadId], url, progress: 100 }
        }));
      }
    );

    return uploadId;
  };

  /**
   * Delete a file from Firebase Storage by URL
   * @param url The URL of the file to delete
   * @returns Promise that resolves when the file is deleted
   */
  const deleteFile = async (url: string): Promise<{ success: boolean; error: string | null }> => {
    try {
      // Extract the path from the URL
      const decodedUrl = decodeURIComponent(url);
      const startIndex = decodedUrl.indexOf('/o/') + 3;
      const endIndex = decodedUrl.indexOf('?');
      
      if (startIndex < 3 || endIndex < 0) {
        throw new Error('Invalid storage URL format');
      }
      
      const path = decodedUrl.substring(startIndex, endIndex);
      const fileRef = ref(storage, path);
      
      await deleteObject(fileRef);
      return { success: true, error: null };
    } catch (error: any) {
      console.error('Error deleting file:', error);
      return { success: false, error: error.message };
    }
  };

  return {
    uploading,
    uploadFile,
    deleteFile
  };
} 