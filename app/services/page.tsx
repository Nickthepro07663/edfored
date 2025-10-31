import { Header } from "@/components/header"
import { Services } from "@/components/services"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Our Services - Edfored Tutoring",
  description:
    "Explore our comprehensive tutoring services including Math, Science, English, Languages, Computer Science, Test Prep, Music, and Arts.",
}

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-20">
        <Services />
      </div>
      <Footer />
    </main>
  )
}
