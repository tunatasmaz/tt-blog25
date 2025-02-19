import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    const requestUrl = new URL(request.url)
    const code = requestUrl.searchParams.get('code')

    if (code) {
      const cookieStore = cookies()
      const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
      await supabase.auth.exchangeCodeForSession(code)
    }

    // Her durumda dashboard'a yönlendir
    return NextResponse.redirect(new URL('/admin/dashboard', request.url))
  } catch (error) {
    console.error('Auth callback error:', error)
    // Hata durumunda login'e yönlendir
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }
}
