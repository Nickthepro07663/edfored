import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/client"

export async function GET() {
  try {
    const supabase = createClient()
    const { data, error } = await supabase.from("cms_content").select("*").eq("section", "services").single()

    if (error && error.code !== "PGRST116") {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ content: data?.content || null })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { content } = await request.json()
    const supabase = createClient()

    const { data, error } = await supabase
      .from("cms_content")
      .upsert(
        {
          section: "services",
          content,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "section" },
      )
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ content: data })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
