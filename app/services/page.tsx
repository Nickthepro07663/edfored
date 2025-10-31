import { Header } from "@/components/header"
import { Services } from "@/components/services"
import { Footer } from "@/components/footer"

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
