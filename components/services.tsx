import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calculator, Beaker, Languages, Code, BookOpen, Brain, Music, Palette } from "lucide-react"

const services = [
  {
    icon: Calculator,
    title: "Mathematics",
    description:
      "From basic arithmetic to advanced calculus, we help students master mathematical concepts at every level.",
    subjects: ["Algebra", "Geometry", "Calculus", "Statistics"],
  },
  {
    icon: Beaker,
    title: "Science",
    description: "Comprehensive science tutoring covering biology, chemistry, physics, and environmental science.",
    subjects: ["Biology", "Chemistry", "Physics", "Earth Science"],
  },
  {
    icon: Languages,
    title: "Languages",
    description: "Master new languages or improve your native language skills with our expert language tutors.",
    subjects: ["English", "Spanish", "French", "Mandarin"],
  },
  {
    icon: Code,
    title: "Computer Science",
    description: "Learn programming, web development, and computer science fundamentals from industry professionals.",
    subjects: ["Python", "JavaScript", "Java", "Web Development"],
  },
  {
    icon: BookOpen,
    title: "English & Literature",
    description: "Improve reading comprehension, writing skills, and literary analysis with personalized guidance.",
    subjects: ["Writing", "Reading", "Literature", "Grammar"],
  },
  {
    icon: Brain,
    title: "Test Preparation",
    description: "Specialized coaching for SAT, ACT, GRE, GMAT, and other standardized tests.",
    subjects: ["SAT", "ACT", "GRE", "GMAT"],
  },
  {
    icon: Music,
    title: "Music",
    description: "Learn to play instruments or improve your music theory knowledge with experienced instructors.",
    subjects: ["Piano", "Guitar", "Theory", "Vocals"],
  },
  {
    icon: Palette,
    title: "Arts & Humanities",
    description: "Explore history, social studies, art, and philosophy with engaging and knowledgeable tutors.",
    subjects: ["History", "Geography", "Art", "Philosophy"],
  },
]

export function Services() {
  return (
    <section id="services" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Our Tutoring Services</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            We offer comprehensive tutoring across a wide range of subjects, tailored to meet each student's unique
            learning needs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon
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
                  <div className="flex flex-wrap gap-2">
                    {service.subjects.map((subject, idx) => (
                      <span key={idx} className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-full">
                        {subject}
                      </span>
                    ))}
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
