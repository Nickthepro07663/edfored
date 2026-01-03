"use client"

import { useEffect, useState } from "react"
import { AnnouncementBanner } from "./announcement-banner"

export function AnnouncementBannerWrapper() {
  const [banner, setBanner] = useState<any>(null)

  useEffect(() => {
    fetch("/api/banners")
      .then((res) => res.json())
      .then((data) => {
        if (data.banner) {
          setBanner(data.banner)
        }
      })
      .catch((error) => console.error("Failed to load banner:", error))
  }, [])

  if (!banner) return null

  return (
    <AnnouncementBanner
      message={banner.message}
      linkUrl={banner.link_url}
      linkText={banner.link_text}
      backgroundColor={banner.background_color}
      textColor={banner.text_color}
    />
  )
}
