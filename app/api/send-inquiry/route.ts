import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json()

    const supabase = await createClient()

    // Store inquiry in database
    const { error: dbError } = await supabase.from("inquiries").insert({
      name,
      email,
      subject,
      message,
      created_at: new Date().toISOString(),
    })

    if (dbError) {
      console.error("[v0] Database error:", dbError)
    }

    // Send email notification to edfored2025@gmail.com
    const emailBody = `
New Inquiry from ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}
    `

    // Note: This creates a record. To actually send emails, you'll need to set up
    // an email service like Resend, SendGrid, or similar
    console.log("[v0] Inquiry received:", emailBody)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Error processing inquiry:", error)
    return NextResponse.json({ error: "Failed to process inquiry" }, { status: 500 })
  }
}
