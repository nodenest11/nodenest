import { db } from './firebaseConfig';
import { collection, getDocs, query, limit } from 'firebase/firestore';
import { COLLECTIONS } from './firestoreUtils';

/**
 * Tests the connection to the Firebase database
 * @returns {Promise<boolean>} True if connection is successful
 */
export async function testDatabaseConnection(): Promise<boolean> {
  try {
    // Try to fetch a single document from any collection to test connection
    const testQuery = query(collection(db, COLLECTIONS.SETTINGS), limit(1));
    await getDocs(testQuery);
    return true;
  } catch (error) {
    console.error('Database connection test failed:', error);
    return false;
  }
}

/**
 * Checks if the database is empty (no documents in main collections)
 * @returns {Promise<{isEmpty: boolean, totalDocuments: number}>} Status of database
 */
export async function checkForEmptyDatabase(): Promise<{isEmpty: boolean, totalDocuments: number}> {
  try {
    let totalDocuments = 0;
    
    // Check each main collection
    for (const collectionName of Object.values(COLLECTIONS)) {
      const snapshot = await getDocs(collection(db, collectionName));
      totalDocuments += snapshot.size;
    }
    
    return {
      isEmpty: totalDocuments === 0,
      totalDocuments
    };
  } catch (error) {
    console.error('Error checking database:', error);
    return {
      isEmpty: true,
      totalDocuments: 0
    };
  }
} 