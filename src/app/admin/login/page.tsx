'use client'

import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { getSession } from '@/lib/auth'

export default function LoginPage() {
  const router = useRouter()

  useEffect(() => {
    const checkSession = async () => {
      const { session } = await getSession()
      if (session) {
        router.push('/admin/dashboard')
      }
    }
    checkSession()
  }, [router])

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6">Admin Girişi</h1>
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        providers={[]}
        localization={{
          variables: {
            sign_in: {
              email_label: 'Email adresiniz',
              password_label: 'Şifreniz',
              button_label: 'Giriş Yap',
            },
          },
        }}
      />
    </div>
  )
}
