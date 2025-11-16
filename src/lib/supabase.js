import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anon = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(url, anon, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
})

export const getProfileFromMetadata = (user) => {
  if (!user) return null
  const md = user.user_metadata || {}
  return {
    sic: (md.sic || '').toString().toUpperCase(),
    full_name: md.full_name || '',
    branch: md.branch || '',
    year: md.year || '',
  }
}
