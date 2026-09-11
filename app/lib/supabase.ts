import { createBrowserClient } from '@supabase/ssr'
import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Client-side: fallback ke dummy string saat inisialisasi modul jika env var belum terpasang di Vercel agar browser tidak crash
export const supabaseClient = createBrowserClient(
    supabaseUrl || 'https://placeholder.supabase.co',
    supabaseAnonKey || 'placeholder'
)

// Server-side only (service role)
// Hanya diinisialisasi di environment server dan jika SUPABASE_SERVICE_ROLE_KEY tersedia
export const supabaseAdmin: SupabaseClient = (
    typeof window === 'undefined' && process.env.SUPABASE_SERVICE_ROLE_KEY && supabaseUrl
        ? createClient(supabaseUrl, process.env.SUPABASE_SERVICE_ROLE_KEY)
        : null
) as unknown as SupabaseClient