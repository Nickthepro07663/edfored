import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const supabase = createClient()

    const { data, error } = await supabase.from("tutors").select("*").order("display_order", { ascending: true })

    if (error) throw error

    return NextResponse.json(data || [])
  } catch (error) {
    console.error("Error fetching tutors:", error)
    return NextResponse.json({ error: "Failed to fetch tutors" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const supabase = createClient()
    const body = await request.json()

    const { data, error } = await supabase.from("tutors").insert([body]).select().single()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error creating tutor:", error)
    return NextResponse.json({ error: "Failed to create tutor" }, { status: 500 })
  }
}
