import { Header } from "@/components/header"
import { About } from "@/components/about"
import { Testimonials } from "@/components/testimonials"
import { Footer } from "@/components/footer"

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
