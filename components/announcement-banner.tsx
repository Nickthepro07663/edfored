"use client"

import { useState } from "react"
import { X } from "lucide-react"
import Link from "next/link"

interface AnnouncementBannerProps {
  message: string
  linkUrl?: string
  linkText?: string
  backgroundColor?: string
  textColor?: string
}

export function AnnouncementBanner({
  message,
  linkUrl,
  linkText,
  backgroundColor = "#3B82F6",
  textColor = "#FFFFFF",
}: AnnouncementBannerProps) {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="relative py-3 px-4 text-center" style={{ backgroundColor, color: textColor }}>
      <div className="container mx-auto flex items-center justify-center gap-4">
        <p className="text-sm md:text-base font-medium">
          {message}
          {linkUrl && linkText && (
            <>
              {" "}
              <Link href={linkUrl} className="underline hover:no-underline font-semibold">
                {linkText}
              </Link>
            </>
          )}
        </p>
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-4 top-1/2 -translate-y-1/2 hover:opacity-70 transition-opacity"
          aria-label="Close banner"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}
