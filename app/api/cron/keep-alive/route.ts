import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    // Verify the request is from a cron job (optional security)
    const authHeader = request.headers.get("authorization")
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const supabase = await createClient()

    // Perform multiple random queries to keep the database active
    const queries = [
      supabase.from("bookings").select("id").limit(1),
      supabase.from("bookings").select("count"),
      supabase.from("admin_users").select("username").limit(1),
      supabase.from("bookings").select("created_at").order("created_at", { ascending: false }).limit(5),
    ]

    // Execute all queries in parallel
    const results = await Promise.allSettled(queries)

    const successCount = results.filter((r) => r.status === "fulfilled").length
    const failedCount = results.filter((r) => r.status === "rejected").length

    console.log(`[v0] Supabase keep-alive: ${successCount} queries succeeded, ${failedCount} failed`)

    return NextResponse.json({
      success: true,
      message: "Database pinged successfully with multiple queries",
      timestamp: new Date().toISOString(),
      queriesExecuted: queries.length,
      successCount,
      failedCount,
    })
  } catch (error) {
    console.error("[v0] Keep-alive exception:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
