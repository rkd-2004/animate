import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    // If user is authenticated and trying to access login page, redirect to dashboard
    if (req.nextUrl.pathname === '/' && req.nextauth.token) {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized({ req, token }) {
        // Allow public access to the login page
        if (req.nextUrl.pathname === '/') {
          return true;
        }
        // Require authentication for dashboard
        return !!token;
      },
    },
    pages: {
      signIn: '/',
    },
  }
);

// Protect dashboard routes
export const config = {
  matcher: ['/', '/dashboard/:path*']
};