import { getCMSContent } from "@/app/actions/cms"
import { NextResponse } from "next/server"

export async function GET() {
  const content = await getCMSContent("about")
  return NextResponse.json(content)
}
