import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Edfored - Expert Online Tutoring Services",
  description:
    "Get personalized one-on-one tutoring in Math, Science, English, and more. Expert tutors available for all grade levels.",
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Footer />
    </main>
  )
}
