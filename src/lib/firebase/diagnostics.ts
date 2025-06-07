/**
 * Firebase Diagnostics Utilities
 * Helps diagnose connection issues with Firebase services
 */

import { app, auth, db } from './firebaseConfig';
import { collection, getDocs, query, limit } from 'firebase/firestore';
import { signInWithEmailAndPassword } from 'firebase/auth';

/**
 * Tests Firebase Authentication connection
 * @param email User email
 * @param password User password
 * @returns Result object with timing and status information
 */
export async function testAuthConnection(email: string, password: string) {
  const startTime = performance.now();
  let result = {
    success: false,
    time: 0,
    error: null as string | null,
    user: null as any
  };

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    result.success = true;
    result.user = {
      uid: userCredential.user.uid,
      email: userCredential.user.email,
    };
  } catch (error: any) {
    result.success = false;
    result.error = error.message || 'Unknown authentication error';
  }

  const endTime = performance.now();
  result.time = Math.round(endTime - startTime);
  
  return result;
}

/**
 * Tests Firestore Database connection
 * @param collectionName Optional collection name to test
 * @returns Result object with timing and status information
 */
export async function testDatabaseConnection(collectionName?: string) {
  const startTime = performance.now();
  let result = {
    success: false,
    time: 0,
    error: null as string | null,
    data: null as any
  };

  try {
    // If a specific collection is requested, test it
    if (collectionName) {
      const q = query(collection(db, collectionName), limit(1));
      const querySnapshot = await getDocs(q);
      
      result.success = true;
      result.data = {
        collectionName,
        empty: querySnapshot.empty,
        docCount: querySnapshot.size,
        firstDocId: querySnapshot.empty ? null : querySnapshot.docs[0].id
      };
    } 
    // Otherwise try several collections
    else {
      const collectionsToTry = ['services', 'about', 'portfolio', 'settings'];
      
      for (const name of collectionsToTry) {
        try {
          const q = query(collection(db, name), limit(1));
          const querySnapshot = await getDocs(q);
          
          if (!querySnapshot.empty) {
            result.success = true;
            result.data = {
              collectionName: name,
              empty: false,
              docCount: querySnapshot.size,
              firstDocId: querySnapshot.docs[0].id
            };
            break;
          }
        } catch (e) {
          // Try next collection
        }
      }
      
      // If we got here and still no success, we could connect but found no data
      if (!result.success && !result.error) {
        result.success = true;
        result.data = { noData: true };
      }
    }
  } catch (error: any) {
    result.success = false;
    result.error = error.message || 'Unknown database error';
  }

  const endTime = performance.now();
  result.time = Math.round(endTime - startTime);
  
  return result;
}

/**
 * Run a comprehensive test of all Firebase services
 * @returns Diagnostic information about all services
 */
export async function runFullDiagnostics() {
  const startTime = performance.now();
  
  // Test database connection without auth
  const dbResult = await testDatabaseConnection();
  
  const endTime = performance.now();
  
  return {
    success: dbResult.success,
    timeTaken: Math.round(endTime - startTime),
    firebase: {
      appInitialized: !!app,
      authInitialized: !!auth,
      dbInitialized: !!db,
    },
    database: dbResult
  };
} 