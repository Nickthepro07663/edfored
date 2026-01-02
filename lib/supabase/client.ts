import { createBrowserClient } from "@supabase/ssr"
import type { SupabaseClient } from "@supabase/supabase-js"

let client: SupabaseClient | null = null

export function createClient(): SupabaseClient {
  // Return existing instance if already created
  if (client) {
    return client
  }

  // Create new instance only if it doesn't exist
  // Using 'as SupabaseClient' to bypass TypeScript's deep type inference
  client = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  ) as SupabaseClient

  return client
}
