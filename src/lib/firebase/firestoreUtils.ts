// Firestore utility functions for content management
import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  limit, 
  serverTimestamp,
  Timestamp,
  DocumentData,
  QueryDocumentSnapshot,
  Query
} from 'firebase/firestore';
import { db } from './firebaseConfig';
import { BaseContent, ContentCreateAction, ContentUpdateAction, ContentDeleteAction } from './standardTypes';

// Collection names
export const COLLECTIONS = {
  ABOUT: 'about',
  SERVICES: 'services',
  PORTFOLIO: 'portfolio',
  TEAM: 'team',
  BLOG: 'blog',
  SETTINGS: 'settings',
  CONTACTS: 'contacts'
};

// Ensure consistent field names for indexing
export const SORT_FIELDS = {
  CREATED_AT: 'createdAt',
  UPDATED_AT: 'updatedAt',
  ORDER: 'order',
  FEATURED: 'featured',
  DATE: 'date'
};

// Generate a URL-friendly slug from a string
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-')     // Replace spaces with hyphens
    .replace(/-+/g, '-')      // Remove consecutive hyphens
    .trim();
}

// Convert Firestore document to typed object
export function convertDoc<T extends BaseContent>(doc: QueryDocumentSnapshot<DocumentData>): T {
  const data = doc.data();
  return {
    ...data,
    id: doc.id
  } as T;
}

// Get all documents from a collection
export async function getAllDocuments<T extends BaseContent>(
  collectionName: string,
  publishedOnly: boolean = false,
  orderByField: string = 'createdAt',
  orderDirection: 'asc' | 'desc' = 'desc',
  limitCount: number = 100
): Promise<T[]> {
  try {
    let q = query(
      collection(db, collectionName),
      orderBy(orderByField, orderDirection),
      limit(limitCount)
    );
    
    // Add filter for published items only if requested
    if (publishedOnly) {
      q = query(q, where('published', '==', true));
    }
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => convertDoc<T>(doc));
  } catch (error) {
    console.error(`Error getting documents from ${collectionName}:`, error);
    return [];
  }
}

// New function: Get documents with multiple sorting criteria
export async function getSortedDocuments<T extends BaseContent>(
  collectionName: string,
  publishedOnly: boolean = false,
  sortFields: Array<{field: string, direction: 'asc' | 'desc'}> = [{field: 'createdAt', direction: 'desc'}],
  limitCount: number = 100
): Promise<T[]> {
  try {
    // Start with collection reference
    let q: Query = collection(db, collectionName);
    
    // Add published filter if needed
    if (publishedOnly) {
      q = query(q, where('published', '==', true));
    }
    
    // Add all sort fields
    for (const sort of sortFields) {
      q = query(q, orderBy(sort.field, sort.direction));
    }
    
    // Add limit
    q = query(q, limit(limitCount));
    
    console.log(`Fetching from ${collectionName} with ${sortFields.length} sort criteria`);
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => convertDoc<T>(doc));
  } catch (error) {
    console.error(`Error getting sorted documents from ${collectionName}:`, error);
    return [];
  }
}

// Get a single document by ID
export async function getDocumentById<T extends BaseContent>(
  collectionName: string,
  docId: string
): Promise<T | null> {
  try {
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        ...docSnap.data(),
        id: docSnap.id
      } as T;
    }
    
    return null;
  } catch (error) {
    console.error(`Error getting document ${docId} from ${collectionName}:`, error);
    return null;
  }
}

// Add a new document
export async function addDocument<T extends BaseContent>(
  collectionName: string,
  data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>
): Promise<string | null> {
  try {
    const docData = {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      published: data.published ?? false
    };
    
    const docRef = await addDoc(collection(db, collectionName), docData);
    return docRef.id;
  } catch (error) {
    console.error(`Error adding document to ${collectionName}:`, error);
    return null;
  }
}

// Update an existing document
export async function updateDocument<T extends BaseContent>(
  collectionName: string,
  docId: string,
  data: Partial<Omit<T, 'id' | 'createdAt' | 'updatedAt'>>
): Promise<boolean> {
  try {
    const docRef = doc(db, collectionName, docId);
    
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp()
    });
    
    return true;
  } catch (error) {
    console.error(`Error updating document ${docId} in ${collectionName}:`, error);
    return false;
  }
}

// Delete a document
export async function deleteDocument(
  collectionName: string,
  docId: string
): Promise<boolean> {
  try {
    const docRef = doc(db, collectionName, docId);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error(`Error deleting document ${docId} from ${collectionName}:`, error);
    return false;
  }
}

// Get documents by field value
export async function getDocumentsByField<T extends BaseContent>(
  collectionName: string,
  fieldName: string,
  fieldValue: any,
  publishedOnly: boolean = false
): Promise<T[]> {
  try {
    let q = query(
      collection(db, collectionName),
      where(fieldName, '==', fieldValue)
    );
    
    // Add filter for published items only if requested
    if (publishedOnly) {
      q = query(q, where('published', '==', true));
    }
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => convertDoc<T>(doc));
  } catch (error) {
    console.error(`Error getting documents from ${collectionName} where ${fieldName} = ${fieldValue}:`, error);
    return [];
  }
} 