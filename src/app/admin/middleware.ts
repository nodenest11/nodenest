import { NextRequest, NextResponse } from 'next/server';

// This middleware handles client-side navigation issues in the admin section
export function middleware(request: NextRequest) {
  // Get the pathname from the request URL
  const { pathname } = request.nextUrl;

  // If we're already on an admin page, just continue
  if (pathname.startsWith('/admin/')) {
    return NextResponse.next();
  }

  // For the root admin path, ensure proper client-side routing
  if (pathname === '/admin') {
    // Add any specific admin route handling here if needed
    return NextResponse.next();
  }

  // Default behavior
  return NextResponse.next();
}

// Only run middleware on admin routes
export const config = {
  matcher: ['/admin/:path*']
}; 