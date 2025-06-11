import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function POST(request) {
  try {
    const { email, password, firstName, lastName } = await request.json()
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
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options)
              )
            } catch {
              // The `setAll` method was called from a Server Component.
              // This can be ignored if you have middleware refreshing
              // user sessions.
            }
          },
        },
      }
    )
  
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName
        },
        emailRedirectTo: `${requestUrl.origin}/api/auth/callback`
      }
    })
  
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    if (data.user) {
      const { id } = data.user
      const { error: profileError } = await supabase
      .from('profiles')
      .insert([{ unique_identifier: id, first_name: firstName, last_name: lastName }])

      if(profileError) {
        return NextResponse.json({ error: profileError.message }, { status: 500 })
      }
    }
  
    return NextResponse.json({ user: data.user })
  } catch (err) {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}