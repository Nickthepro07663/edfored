import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, FileText, Video, Download } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Learning Resources | Edfored",
  description: "Free learning resources, study guides, and educational materials for students.",
}

const resources = [
  {
    category: "Mathematics",
    items: [
      { title: "Algebra Fundamentals Guide", type: "PDF", icon: FileText, link: "#" },
      { title: "Calculus Practice Problems", type: "PDF", icon: FileText, link: "#" },
      { title: "Geometry Video Tutorials", type: "Video", icon: Video, link: "#" },
      { title: "Statistics Cheat Sheet", type: "PDF", icon: FileText, link: "#" },
    ],
  },
  {
    category: "Science",
    items: [
      { title: "Physics Formula Reference", type: "PDF", icon: FileText, link: "#" },
      { title: "Chemistry Lab Safety Guide", type: "PDF", icon: FileText, link: "#" },
      { title: "Biology Study Notes", type: "PDF", icon: FileText, link: "#" },
      { title: "Science Experiment Videos", type: "Video", icon: Video, link: "#" },
    ],
  },
  {
    category: "English",
    items: [
      { title: "Essay Writing Guide", type: "PDF", icon: FileText, link: "#" },
      { title: "Grammar Rules Reference", type: "PDF", icon: FileText, link: "#" },
      { title: "Literature Analysis Templates", type: "PDF", icon: FileText, link: "#" },
      { title: "Reading Comprehension Tips", type: "PDF", icon: FileText, link: "#" },
    ],
  },
  {
    category: "Test Preparation",
    items: [
      { title: "SAT Practice Tests", type: "PDF", icon: FileText, link: "#" },
      { title: "ACT Study Guide", type: "PDF", icon: FileText, link: "#" },
      { title: "Test-Taking Strategies", type: "Video", icon: Video, link: "#" },
      { title: "Time Management Tips", type: "PDF", icon: FileText, link: "#" },
    ],
  },
]

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
              Learning <span className="text-blue-600">Resources</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto text-pretty">
              Free study materials, guides, and resources to support your learning journey
            </p>
          </div>

          <div className="grid gap-8 mb-12">
            {resources.map((category) => (
              <Card key={category.category}>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <BookOpen className="h-6 w-6 text-blue-600" />
                    {category.category}
                  </CardTitle>
                  <CardDescription>Study materials and resources for {category.category.toLowerCase()}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    {category.items.map((item, idx) => {
                      const Icon = item.icon
                      return (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-4 border rounded-lg hover:bg-blue-50 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <Icon className="h-5 w-5 text-blue-600" />
                            <div>
                              <p className="font-medium">{item.title}</p>
                              <p className="text-sm text-gray-600">{item.type}</p>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" asChild>
                            <a href={item.link} target="_blank" rel="noopener noreferrer">
                              <Download className="h-4 w-4" />
                            </a>
                          </Button>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-blue-50 rounded-lg p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Need More Resources?</h3>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              Our tutors can provide personalized study materials and resources tailored to your specific needs.
            </p>
            <Link href="/booking">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Book a Session
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
