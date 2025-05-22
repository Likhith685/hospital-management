import { createServerClient } from '@supabase/ssr'
import { NextResponse  } from 'next/server'
import { getUserRole } from './utils/server'
export async function middleware(request) {
  return await updateSession(request)
}
export async function updateSession( request) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )
      const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
    const publicPaths = ['/', '/auth/login', '/auth/signUp']
    if (!publicPaths.includes(request.nextUrl.pathname)) {
      return NextResponse.redirect(new URL('/', request.url))
    }
    return supabaseResponse
  }
      const data=await getUserRole(); 
      const role=data[0].role;
       let redirectPath = '/';
      if(role=='patient')redirectPath = '/patient';
      if(role=='admin')redirectPath="/admin";
      if(role=='doctor')redirectPath="/doctor";
       if (request.nextUrl.pathname !== redirectPath) {
    return NextResponse.redirect(new URL(redirectPath, request.url));
  }

  return supabaseResponse
}
export const config = {
  matcher: [
    
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}