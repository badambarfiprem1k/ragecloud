import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

let supabaseClient: any = null

// Lazy load Supabase only when needed
function getSupabaseClient() {
  if (!supabaseClient) {
    try {
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL
      const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

      if (!url || !key || url.includes('your-project') || key.includes('your-')) {
        console.warn('Supabase not configured. Please update .env.local')
        return null
      }

      const { createClient } = require('@supabase/supabase-js')
      supabaseClient = createClient(url, key)
    } catch (error) {
      console.warn('Supabase initialization failed:', error)
      return null
    }
  }

  return supabaseClient
}

export function useSupabase() {
  const [supabase, setSupabase] = useState<any>(null)
  const [isConfigured, setIsConfigured] = useState(true)

  useEffect(() => {
    const client = getSupabaseClient()
    setSupabase(client)
    setIsConfigured(!!client)
  }, [])

  return { supabase, isConfigured }
}
