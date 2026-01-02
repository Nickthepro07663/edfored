import { getCMSContent } from "@/app/actions/cms"
import { NextResponse } from "next/server"

export async function GET() {
  const content = await getCMSContent("hero")
  return NextResponse.json(content)
}
