import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase/firebaseConfig';
import { collection, getDocs, query, limit } from 'firebase/firestore';

type DatabaseTestData = {
  collection: string;
  documentId: string;
  exists: boolean;
} | null;

interface DatabaseStatus {
  status: string;
  timeTaken: number;
  error: string | null;
  data: DatabaseTestData;
}

export async function GET() {
  const startTime = performance.now();
  const results = {
    database: {
      status: 'unknown',
      timeTaken: 0,
      error: null,
      data: null as DatabaseTestData
    } as DatabaseStatus
  };

  // Test database connection
  try {
    const dbStartTime = performance.now();
    
    // Try to query any collection to test connection
    const collectionsToTry = ['services', 'about', 'portfolio', 'settings'];
    let data: DatabaseTestData = null;
    
    for (const collectionName of collectionsToTry) {
      try {
        const q = query(collection(db, collectionName), limit(1));
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
          data = {
            collection: collectionName,
            documentId: querySnapshot.docs[0].id,
            exists: true
          };
          break;
        }
      } catch (error) {
        // Continue to the next collection
        console.log(`Failed to query collection ${collectionName}`);
      }
    }
    
    const dbEndTime = performance.now();
    
    results.database = {
      status: data ? 'connected' : 'no-data',
      timeTaken: Math.round(dbEndTime - dbStartTime),
      error: null,
      data
    };
  } catch (error) {
    results.database = {
      status: 'error',
      timeTaken: 0,
      error: error instanceof Error ? error.message : String(error),
      data: null
    };
  }

  const endTime = performance.now();
  
  return NextResponse.json({
    success: true,
    message: 'Firebase connection test completed',
    timeTaken: Math.round(endTime - startTime),
    ...results
  });
} 