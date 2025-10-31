import { Header } from "@/components/header"
import { About } from "@/components/about"
import { Testimonials } from "@/components/testimonials"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Us - Edfored Tutoring",
  description:
    "Learn about Edfored's mission to provide quality education and personalized learning experiences with expert tutors.",
}

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-20">
        <About />
        <Testimonials />
      </div>
      <Footer />
    </main>
  )
}
