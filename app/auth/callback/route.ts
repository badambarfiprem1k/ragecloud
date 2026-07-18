import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const error = searchParams.get('error')
  const error_description = searchParams.get('error_description')

  // If there's an error, redirect to login with error message
  if (error) {
    return NextResponse.redirect(
      new URL(`/login?error=${error_description || error}`, request.url)
    )
  }

  if (code) {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    try {
      const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)

      if (exchangeError) {
        return NextResponse.redirect(
          new URL(`/login?error=${exchangeError.message}`, request.url)
        )
      }

      // Redirect to dashboard on success
      return NextResponse.redirect(new URL('/dashboard', request.url))
    } catch (error) {
      return NextResponse.redirect(new URL('/login?error=Auth failed', request.url))
    }
  }

  // Redirect to login if no code or error
  return NextResponse.redirect(new URL('/login', request.url))
}
