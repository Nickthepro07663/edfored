import { createClient } from "@/lib/supabase/server"

export interface AnalyticsEvent {
  event_type: "page_view" | "booking_created" | "user_signup" | "form_submission"
  page_path?: string
  user_id?: string
  metadata?: Record<string, any>
}

export async function trackEvent(event: AnalyticsEvent) {
  try {
    const supabase = await createClient()
    const { error } = await supabase.from("analytics").insert({
      event_type: event.event_type,
      page_path: event.page_path,
      user_id: event.user_id,
      metadata: event.metadata,
    })

    if (error) {
      console.error("[v0] Analytics tracking error:", error)
    }
  } catch (err) {
    console.error("[v0] Analytics error:", err)
  }
}

export async function getAnalytics(days = 30) {
  try {
    const supabase = await createClient()
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)

    const { data, error } = await supabase
      .from("analytics")
      .select("*")
      .gte("created_at", startDate.toISOString())
      .order("created_at", { ascending: false })

    if (error) throw error
    return data || []
  } catch (err) {
    console.error("[v0] Get analytics error:", err)
    return []
  }
}
