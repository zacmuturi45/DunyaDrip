import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import { checkRateLimit } from './lib/rate-limiter' // Optional for rate limiting

export async function middleware(request) {
  // Create a response object
  const response = NextResponse.next()
  
  // Create a Supabase client configured to use cookies
  const supabase = createMiddlewareClient({ req: request, res: response })

  // Optional: Rate limiting for authentication endpoints
  if (['/api/auth', '/login', '/signup'].some(path => 
      request.nextUrl.pathname.startsWith(path))) {
    const rateLimited = await checkRateLimit(request)
    if (rateLimited) {
      return new NextResponse('Too many requests', { status: 429 })
    }
  }

  // Refresh the user's session if expired
  const { data: { session }, error } = await supabase.auth.getSession()

  // Handle protected routes
  if (requiresAuth(request.nextUrl.pathname)) {
    if (!session) {
      // Redirect to login with returnTo parameter
      const redirectUrl = new URL('/login', request.url)
      redirectUrl.searchParams.set('returnTo', request.nextUrl.pathname)
      return NextResponse.redirect(redirectUrl)
    }

    // Optional: Role-based access control
    if (request.nextUrl.pathname.startsWith('/admin') && 
        session.user?.user_metadata?.role !== 'admin') {
      return NextResponse.redirect(new URL('/unauthorized', request.url))
    }
  }

  // Handle auth routes for already authenticated users
  if (['/login', '/signup'].includes(request.nextUrl.pathname) && session) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return response
}

// Define paths that require authentication
function requiresAuth(path) {
  const protectedPaths = [
    '/dashboard',
    '/account',
    '/settings',
    '/api/private' // Protect your private API routes
  ]
  
  return protectedPaths.some(protectedPath => 
    path.startsWith(protectedPath) && 
    !path.startsWith('/api/auth')) // Exclude auth endpoints
}

// Config to specify matching paths
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, etc.
     * - public routes
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$|login|signup|$).*)',
  ]
}