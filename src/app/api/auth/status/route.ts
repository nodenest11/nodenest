import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session');
    
    return NextResponse.json({
      success: true,
      authenticated: !!sessionCookie,
      sessionCookieValue: sessionCookie ? 
        `${sessionCookie.value.substring(0, 10)}...${sessionCookie.value.substring(sessionCookie.value.length - 10)}` : 
        null,
      cookieCount: cookieStore.getAll().length,
      allCookies: cookieStore.getAll().map(c => c.name)
    });
  } catch (error) {
    console.error('Error checking auth status:', error);
    return NextResponse.json(
      { error: 'Failed to check auth status' },
      { status: 500 }
    );
  }
} 