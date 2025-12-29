"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function getCMSContent(section: string) {
  const supabase = await createClient()
  const { data, error } = await supabase.from("cms_content").select("*").eq("section", section).single()

  if (error) {
    console.error("[v0] CMS get error:", error)
    return null
  }

  return data
}

export async function updateCMSContent(section: string, content: any, updatedBy: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("cms_content")
    .update({
      content,
      updated_at: new Date().toISOString(),
      updated_by: updatedBy,
    })
    .eq("section", section)
    .select()
    .single()

  if (error) {
    console.error("[v0] CMS update error:", error)
    return { success: false, error: error.message }
  }

  // Revalidate all pages to show new content
  revalidatePath("/")
  revalidatePath("/about")
  revalidatePath("/contact")
  revalidatePath("/services")

  return { success: true, data }
}

export async function getAllCMSContent() {
  const supabase = await createClient()
  const { data, error } = await supabase.from("cms_content").select("*").order("section")

  if (error) {
    console.error("[v0] CMS get all error:", error)
    return []
  }

  return data || []
}
