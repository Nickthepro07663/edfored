"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Languages, Music, Code, ChevronRight as ChessKnight, Users } from "lucide-react"

const defaultServices = [
  {
    icon: "BookOpen",
    title: "Academics",
    description: "Taught by top students, we teach K-8 in various school subjects.",
    subjects: ["Math", "English", "Science", "History"],
    priceInPerson: "$25.00/hr",
    priceOnline: "$20.00/hr",
  },
  {
    icon: "Languages",
    title: "Languages",
    description:
      "Taught by tutors with experience and proficiency in the language, we teach beginner-intermediate students.",
    subjects: ["Spanish", "Mandarin"],
    priceInPerson: "$25.00/hr",
    priceOnline: "$20.00/hr",
  },
  {
    icon: "Music",
    title: "Music",
    description:
      "Taught by tutors with proficiency and experience in the instrument. All tutors have awards or play in a higher band. For beginner-intermediate students.",
    subjects: ["Guitar", "Piano", "Trombone", "Saxophone"],
    priceInPerson: "$30.00/hr",
    priceOnline: "$25.00/hr",
  },
  {
    icon: "Code",
    title: "Computer Science",
    description: "Taught by tutors with proficiency and certification in coding. For beginner-intermediate students.",
    subjects: ["Python"],
    priceInPerson: "$30.00/hr",
    priceOnline: "$25.00/hr",
  },
  {
    icon: "ChessKnight",
    title: "Chess",
    description:
      "Taught by Candidate Master Leon S., this class is for beginner-intermediate students (no elo-1100 elo students).",
    subjects: ["Chess Strategy", "Chess Tactics"],
    priceInPerson: "$30.00/hr",
    priceOnline: "$25.00/hr",
  },
  {
    icon: "Users",
    title: "Group Lessons",
    description: "Coming soon! Group lessons for multiple students learning together.",
    subjects: ["Various Subjects"],
    priceInPerson: "Coming Soon",
    priceOnline: "Coming Soon",
  },
]

const iconMap: any = {
  BookOpen,
  Languages,
  Music,
  Code,
  ChessKnight,
  Users,
}

export function Services() {
  const [services, setServices] = useState(defaultServices)
  const [heading, setHeading] = useState("Our Services & Pricing")
  const [description, setDescription] = useState(
    "Our tutoring services are taught by qualified high-schoolers with experience and recognition in their subjects.",
  )

  useEffect(() => {
    fetch("/api/cms/services")
      .then((res) => res.json())
      .then((data) => {
        if (data.content) {
          if (data.content.services) setServices(data.content.services)
          if (data.content.heading) setHeading(data.content.heading)
          if (data.content.description) setDescription(data.content.description)
        }
      })
      .catch((error) => console.error("Failed to load services:", error))
  }, [])

  return (
    <section id="services" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">{heading}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">{description}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon] || BookOpen
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow border-border">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-foreground">{service.title}</CardTitle>
                  <CardDescription className="text-muted-foreground">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {service.subjects.map((subject, idx) => (
                      <span key={idx} className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-full">
                        {subject}
                      </span>
                    ))}
                  </div>
                  <div className="border-t border-border pt-4 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">In-Person:</span>
                      <span className="font-semibold text-primary">{service.priceInPerson}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Online:</span>
                      <span className="font-semibold text-primary">{service.priceOnline}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
