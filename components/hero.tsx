"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, Users, Award } from "lucide-react"

export function Hero() {
  const scrollToBooking = () => {
    const element = document.getElementById("booking")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section
      id="home"
      className="pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-primary/5 via-background to-accent/5"
    >
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-balance leading-tight">
              Unlock Your Academic Potential with Expert Tutoring
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Personalized one-on-one tutoring sessions designed to help students excel in their studies. From
              elementary to college level, we've got you covered.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-lg" onClick={scrollToBooking}>
                Get Started Today
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg bg-transparent">
                Learn More
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div className="text-2xl font-bold text-foreground">500+</div>
                <div className="text-sm text-muted-foreground">Students</div>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <div className="text-2xl font-bold text-foreground">15+</div>
                <div className="text-sm text-muted-foreground">Subjects</div>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <Award className="w-6 h-6 text-primary" />
                </div>
                <div className="text-2xl font-bold text-foreground">98%</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary to-accent p-1">
              <div className="w-full h-full rounded-xl bg-background flex items-center justify-center">
                <img
                  src="/students-studying-with-tutor-in-modern-classroom.jpg"
                  alt="Students learning"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
