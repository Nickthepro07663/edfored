"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Users, GraduationCap, MapPin } from "lucide-react"
import Link from "next/link"

export function Hero() {
  return (
    <section
      id="home"
      className="pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-primary/5 via-background to-accent/5"
    >
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-balance leading-tight">
              High School Tutors for K-8 Students
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Our younger tutors connect with K–8 students, in a unique way. We help them build confidence, strengthen
              character, and enjoy school again. We hand-select top students from various schools through a rigorous
              process including applications, grade reviews, and several interviews. And we're committed to giving back
              — 10% of our profits support students in South America.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/booking">
                <Button size="lg" className="text-lg">
                  Get Started Today
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/about">
                <Button size="lg" variant="outline" className="text-lg bg-transparent">
                  Learn More
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div className="text-2xl font-bold text-foreground">20+</div>
                <div className="text-sm text-muted-foreground">Members</div>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <GraduationCap className="w-6 h-6 text-primary" />
                </div>
                <div className="text-2xl font-bold text-foreground">5</div>
                <div className="text-sm text-muted-foreground">Categories</div>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div className="text-2xl font-bold text-foreground">10+</div>
                <div className="text-sm text-muted-foreground">Towns</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary to-accent p-1">
              <div className="w-full h-full rounded-xl bg-background flex items-center justify-center">
                <img
                  src="/edfored-team-2025.jpg"
                  alt="EDforED end of 2025 team"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 bg-primary text-primary-foreground rounded-2xl p-8 text-center">
          <p className="text-lg md:text-xl leading-relaxed">
            Developing a special connection with students. Mentoring students to become high-achieving and find learning
            fun.
          </p>
        </div>
      </div>
    </section>
  )
}
