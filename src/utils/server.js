"use server";
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
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
}
export async function getUser() {
    // Create Supabase client
    const supabase = await createClient();
    // console.log(supabase.auth);
    
  const { data: { user } } = await supabase.auth.getUser();
  return user;
  }

  export async function getUserRole()
  {
     const supabase = await createClient();
     const user =await getUser();
    //  console.log(user);
let { data, error } = await supabase
  .from('users')
  .select('role').eq("id",user.id);
    //  console.log(data);
     return data;
  }
   export async function getUserName()
  {
     const supabase = await createClient();
     const user =await getUser();
    //  console.log(user);
let { data, error } = await supabase
  .from('users')
  .select('userName').eq("id",user.id);
    //  console.log(data);
     return data;
  }
  