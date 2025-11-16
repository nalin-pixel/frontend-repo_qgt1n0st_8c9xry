import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anon = import.meta.env.VITE_SUPABASE_ANON_KEY

export const isConfigured = Boolean(url && anon)

let client

if (isConfigured) {
  client = createClient(url, anon, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
    },
  })
} else {
  // Provide a harmless stub so the app doesn't crash when env vars are missing
  const notConfigured = () => {
    const err = new Error('Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment.')
    err.code = 'SUPABASE_NOT_CONFIGURED'
    throw err
  }
  client = {
    auth: {
      async getSession() { return { data: { session: null }, error: null } },
      onAuthStateChange() { return { data: { subscription: { unsubscribe(){} } } } },
      async signInWithPassword() { notConfigured() },
      async signUp() { notConfigured() },
      async signOut() { return { error: null } },
    },
  }
  // eslint-disable-next-line no-console
  console.warn('[Cinemax] Supabase env vars missing. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to enable auth & data.')
}

export const supabase = client

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
