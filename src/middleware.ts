import { NextRequest, NextResponse } from 'next/server';

// Only run middleware on admin routes
export const config = {
  matcher: ['/admin/:path*']
};

/**
 * Check if the request path should bypass auth check
 */
function shouldBypassAuth(pathname: string): boolean {
  // Normalize the path to handle trailing slashes
  const normalizedPath = pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
  
  // Main admin login page should bypass auth check (it handles auth internally)
  if (normalizedPath === '/admin') {
    return true;
  }
  
  // Static files and API routes should bypass
  if (pathname.includes('.') || pathname.startsWith('/api/')) {
    return true;
  }
  
  return false;
}

/**
 * Middleware to protect admin routes
 */
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  
  // Skip middleware for certain paths
  if (shouldBypassAuth(pathname)) {
    return NextResponse.next();
  }
  
  try {
    // Get the session cookie
    const sessionCookie = req.cookies.get('session')?.value;
    
    // For development purposes, allow all admin routes without authentication
    // Remove this in production
    if (process.env.NODE_ENV === 'development') {
      return NextResponse.next();
    }
    
    if (!sessionCookie) {
      return redirectToLogin(req);
    }
    
    // In a production environment, we would validate the session token
    // with Firebase Auth or another authentication service
    if (process.env.NODE_ENV === 'production' && !isValidSession(sessionCookie)) {
      return redirectToLogin(req);
    }
    
    return NextResponse.next();
    
  } catch (error) {
    console.error('Middleware auth error:', error);
    return redirectToLogin(req);
  }
}

/**
 * Check if a session token is valid
 * In production, this should validate the token with your auth service
 */
function isValidSession(sessionCookie: string): boolean {
  try {
    // In production, implement proper validation
    // For example, with Firebase Admin SDK:
    // return await admin.auth().verifySessionCookie(sessionCookie, true);
    
    // For now, we'll do a basic check that the cookie exists and has a reasonable format
    return sessionCookie !== undefined && sessionCookie.length > 20;
  } catch (error) {
    console.error('Session validation error:', error);
    return false;
  }
}

/**
 * Create a redirect response to the login page
 */
function redirectToLogin(req: NextRequest): NextResponse {
  // Ensure we redirect to the exact admin path without trailing slash
  const url = new URL('/admin', req.url);
  return NextResponse.redirect(url, { status: 302 });
}
