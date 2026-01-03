"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"

export function TutorsSection() {
  const [tutors, setTutors] = useState<any[]>([])

  useEffect(() => {
    fetch("/api/tutors")
      .then((res) => res.json())
      .then((data) => setTutors(data.filter((t: any) => t.is_active)))
      .catch((error) => console.error("Error loading tutors:", error))
  }, [])

  if (tutors.length === 0) return null

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Meet Our Tutors</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our carefully selected team of high school tutors who are passionate about helping K-8 students succeed
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {tutors.map((tutor) => (
            <Card key={tutor.id} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  {tutor.image_url && (
                    <img
                      src={tutor.image_url || "/placeholder.svg"}
                      alt={tutor.name}
                      className="w-32 h-32 rounded-full object-cover mb-4"
                    />
                  )}
                  <h3 className="text-xl font-semibold mb-2">{tutor.name}</h3>
                  <p className="text-muted-foreground mb-4">{tutor.bio}</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {tutor.subjects?.map((subject: string) => (
                      <span
                        key={subject}
                        className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                      >
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
