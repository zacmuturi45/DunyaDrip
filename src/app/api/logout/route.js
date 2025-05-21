import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function POST(request) {
  const requestUrl = new URL(request.url)
  const cookieStore = cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            try {
              cookieStore.set(name, value, options)
            } catch (error) {
              // Handle error if needed
            }
          })
        }
      }
    }
  )

  // Sign out from Supabase
  const { error } = await supabase.auth.signOut()

  if (error) {
    return NextResponse.json(
      { error: 'Logout failed' },
      { status: 500 }
    )
  }

  // Clear cookies manually as fallback
  cookieStore.delete('sb-access-token')
  cookieStore.delete('sb-refresh-token')

  // Redirect to home page after logout
  return NextResponse.json({ success: true }, { status: 200 })
}