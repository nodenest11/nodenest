import { NextResponse } from 'next/server';
import { addDocument, COLLECTIONS } from '@/lib/firebase/firestoreUtils';
import { Contact } from '@/lib/firebase/contentTypes';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase/firebaseConfig';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Validate required fields
    if (!data.name || !data.email || !data.message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required fields' },
        { status: 400 }
      );
    }
    
    // Format contact data
    const contactData: Omit<Contact, 'id' | 'createdAt' | 'updatedAt'> = {
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      subject: data.subject || '',
      message: data.message,
      date: new Date().toISOString(),
      status: 'new',
      published: true,
      ...(data.tags && { tags: data.tags }),
      ...(data.priority && { priority: data.priority }),
    };
    
    // Try using utility function first
    let docId = await addDocument<Contact>(COLLECTIONS.CONTACTS, contactData);
    
    // If that fails, try direct approach
    if (!docId) {
      try {
        const directData = {
          ...contactData,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        };
        
        const docRef = await addDoc(collection(db, COLLECTIONS.CONTACTS), directData);
        docId = docRef.id;
      } catch (directError) {
        throw directError;
      }
    }
    
    if (!docId) {
      return NextResponse.json(
        { error: 'Failed to save contact submission' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Contact submission received',
      id: docId,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'An error occurred while processing your request' },
      { status: 500 }
    );
  }
} 