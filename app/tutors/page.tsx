import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { GraduationCap, Star, BookOpen, Award } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Our Tutors | Edfored",
  description: "Meet our experienced and qualified tutors at Edfored. Expert educators dedicated to your success.",
}

const tutors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    image: "/professional-female-teacher.png",
    subjects: ["Mathematics", "Physics"],
    education: "PhD in Mathematics, MIT",
    experience: "15 years",
    rating: 4.9,
    reviews: 127,
    bio: "Specialized in advanced mathematics and physics. Passionate about making complex concepts accessible to all students.",
    achievements: ["Published researcher", "Award-winning educator", "Curriculum developer"],
  },
  {
    id: 2,
    name: "Prof. Michael Chen",
    image: "/professional-male-teacher.png",
    subjects: ["Computer Science", "Programming"],
    education: "MS Computer Science, Stanford",
    experience: "12 years",
    rating: 4.8,
    reviews: 98,
    bio: "Former software engineer turned educator. Expert in teaching coding and computer science fundamentals.",
    achievements: ["Tech industry veteran", "Coding bootcamp instructor", "Open source contributor"],
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    image: "/professional-female-english-teacher.jpg",
    subjects: ["English", "Literature"],
    education: "MA English Literature, Yale",
    experience: "10 years",
    rating: 5.0,
    reviews: 156,
    bio: "Passionate about literature and creative writing. Helps students develop strong communication skills.",
    achievements: ["Published author", "Writing workshop leader", "Literary magazine editor"],
  },
  {
    id: 4,
    name: "Dr. James Wilson",
    image: "/professional-male-science-teacher.jpg",
    subjects: ["Chemistry", "Biology"],
    education: "PhD in Chemistry, Harvard",
    experience: "18 years",
    rating: 4.9,
    reviews: 143,
    bio: "Research scientist and educator with a passion for making science engaging and understandable.",
    achievements: ["Research publications", "Science fair judge", "Lab safety expert"],
  },
]

export default function TutorsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
              Meet Our Expert <span className="text-blue-600">Tutors</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto text-pretty">
              Learn from experienced educators who are passionate about your success
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 mb-12">
            {tutors.map((tutor) => (
              <Card key={tutor.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3 bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center p-8">
                    <img
                      src={tutor.image || "/placeholder.svg"}
                      alt={tutor.name}
                      className="rounded-full w-32 h-32 object-cover border-4 border-white shadow-lg"
                    />
                  </div>
                  <div className="md:w-2/3">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-2xl mb-2">{tutor.name}</CardTitle>
                          <CardDescription className="text-base">{tutor.education}</CardDescription>
                        </div>
                        <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-full">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold">{tutor.rating}</span>
                          <span className="text-sm text-gray-600">({tutor.reviews})</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex flex-wrap gap-2">
                          {tutor.subjects.map((subject) => (
                            <Badge key={subject} variant="secondary" className="bg-blue-100 text-blue-700">
                              {subject}
                            </Badge>
                          ))}
                        </div>

                        <p className="text-sm text-gray-700">{tutor.bio}</p>

                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <GraduationCap className="h-4 w-4" />
                            <span>{tutor.experience}</span>
                          </div>
                        </div>

                        <div className="pt-2">
                          <p className="text-xs font-semibold text-gray-700 mb-2">Achievements:</p>
                          <div className="flex flex-wrap gap-2">
                            {tutor.achievements.map((achievement, idx) => (
                              <div key={idx} className="flex items-center gap-1 text-xs text-gray-600">
                                <Award className="h-3 w-3 text-blue-600" />
                                <span>{achievement}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Link href="/booking">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                <BookOpen className="h-5 w-5 mr-2" />
                Book a Session
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
