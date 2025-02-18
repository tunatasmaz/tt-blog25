import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  // Refresh session if exists
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // If there is a session and the user tries to access login page,
  // redirect to dashboard
  if (session && req.nextUrl.pathname === '/admin/login') {
    return NextResponse.redirect(new URL('/admin/dashboard', req.url))
  }

  // If there is no session and the user tries to access protected routes,
  // redirect to login page
  if (!session && req.nextUrl.pathname.startsWith('/admin/dashboard')) {
    return NextResponse.redirect(new URL('/admin/login', req.url))
  }

  return res
}

export const config = {
  matcher: ['/admin/:path*']
}
