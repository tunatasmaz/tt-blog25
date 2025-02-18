import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  // Auth callback'i engelleme
  if (req.nextUrl.pathname === '/auth/callback') {
    return res
  }

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Korumalı rotalara erişim kontrolü
  if (req.nextUrl.pathname.startsWith('/admin/dashboard')) {
    if (!session) {
      const redirectUrl = req.nextUrl.clone()
      redirectUrl.pathname = '/admin/login'
      return NextResponse.redirect(redirectUrl)
    }
  }

  // Login sayfasına erişim kontrolü
  if (req.nextUrl.pathname === '/admin/login') {
    if (session) {
      const redirectUrl = req.nextUrl.clone()
      redirectUrl.pathname = '/admin/dashboard'
      return NextResponse.redirect(redirectUrl)
    }
  }

  return res
}

export const config = {
  matcher: ['/admin/:path*', '/auth/callback']
}
