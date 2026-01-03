import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/client"

export async function GET() {
  try {
    const supabase = createClient()
    const { data, error } = await supabase
      .from("announcement_banners")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: false })
      .limit(1)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ banner: data && data.length > 0 ? data[0] : null })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const supabase = createClient()

    // First, deactivate all existing banners
    await supabase.from("announcement_banners").update({ is_active: false }).eq("is_active", true)

    // Then insert the new banner
    const { data, error } = await supabase
      .from("announcement_banners")
      .insert({
        message: body.message,
        link_url: body.linkUrl,
        link_text: body.linkText,
        background_color: body.backgroundColor || "#3B82F6",
        text_color: body.textColor || "#FFFFFF",
        is_active: true,
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ banner: data })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const { isActive } = await request.json()
    const supabase = createClient()

    const { error } = await supabase.from("announcement_banners").update({ is_active: isActive }).eq("is_active", true)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
