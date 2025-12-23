import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

// This route can be called by a cron job service (like cron-job.org or Vercel Cron)
// to keep the Supabase database active and prevent it from pausing
export async function GET(request: Request) {
  try {
    // Verify the request is from a cron job (optional security)
    const authHeader = request.headers.get("authorization")
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const supabase = await createClient()

    // Simple query to keep the connection alive
    const { data, error } = await supabase.from("bookings").select("id").limit(1)

    if (error) {
      console.error("[v0] Keep-alive error:", error)
      return NextResponse.json(
        {
          success: false,
          error: error.message,
          timestamp: new Date().toISOString(),
        },
        { status: 500 },
      )
    }

    console.log("[v0] Supabase keep-alive successful")
    return NextResponse.json({
      success: true,
      message: "Database pinged successfully",
      timestamp: new Date().toISOString(),
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
