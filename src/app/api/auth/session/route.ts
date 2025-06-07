import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

// Create a session (POST)
export async function POST(req: NextRequest) {
  try {
    const { sessionToken } = await req.json();
    
    if (!sessionToken) {
      return NextResponse.json(
        { error: 'Session token is required' },
        { status: 400 }
      );
    }
    
    // Set the session cookie
    const cookieStore = await cookies();
    cookieStore.set({
      name: 'session',
      value: sessionToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      // 5 days expiry, matching Firebase default
      maxAge: 60 * 60 * 24 * 5
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error setting session:', error);
    return NextResponse.json(
      { error: 'Failed to set session' },
      { status: 500 }
    );
  }
}

// Delete a session (DELETE)
export async function DELETE() {
  try {
    // Delete the session cookie
    const cookieStore = await cookies();
    cookieStore.delete('session');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting session:', error);
    return NextResponse.json(
      { error: 'Failed to delete session' },
      { status: 500 }
    );
  }
} 