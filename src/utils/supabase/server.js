import { createServerComponentClient } from '@supabase/ssr';
import { cookies } from "next/headers";


export function createServerClient() {
    const cookieStore = cookies();
    return createServerComponentClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        { 
            cookies: {
                getAll: () => cookieStore.getAll(),
                setAll: (cookiesToSet) => {
                    cookiesToSet.forEach(({ name, value, options }) => {
                        cookieStore.set(name, value, options)
                    })
                }
            }
        }
    );
}


