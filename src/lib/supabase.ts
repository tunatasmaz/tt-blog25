import { createClient } from '@supabase/supabase-js'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from './database.types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Server-side client
export const supabaseServer = createClient<Database>(supabaseUrl, supabaseKey)

// Client-side client with auth
export const supabase = createClientComponentClient<Database>()
