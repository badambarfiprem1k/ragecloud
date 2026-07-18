import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Create client only if credentials are available
let supabase: any = null

if (supabaseUrl && supabaseKey) {
  try {
    supabase = createClient(supabaseUrl, supabaseKey)
  } catch (error) {
    console.error('Failed to initialize Supabase client:', error)
  }
} else {
  console.warn(
    'Supabase credentials not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local'
  )
}

export const getSupabaseClient = () => {
  if (!supabase) {
    throw new Error(
      'Supabase client not initialized. Please configure environment variables.'
    )
  }
  return supabase
}

export { supabase }

// Server-side client for sensitive operations
export const supabaseServer = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const key = process.env.SUPABASE_SERVICE_KEY!

  if (!url || !key) {
    throw new Error(
      'Missing Supabase server environment variables. Please check your .env.local file.'
    )
  }

  return createClient(url, key)
}
