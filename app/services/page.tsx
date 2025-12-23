import { Header } from "@/components/header"
import { Services } from "@/components/services"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Services & Pricing - EDforED Tutoring",
  description:
    "Explore our comprehensive tutoring services taught by qualified high-schoolers. Academics, Languages, Music, Computer Science, and Chess tutoring for K-8 students.",
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
