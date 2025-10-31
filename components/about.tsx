import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, Target, Heart, Lightbulb } from "lucide-react"

const values = [
  {
    icon: Target,
    title: "Personalized Learning",
    description:
      "Every student learns differently. We create customized lesson plans tailored to individual learning styles and goals.",
  },
  {
    icon: Heart,
    title: "Passionate Educators",
    description:
      "Our tutors are not just experts in their fields—they genuinely care about student success and growth.",
  },
  {
    icon: Lightbulb,
    title: "Proven Methods",
    description: "We use evidence-based teaching strategies that have been proven to improve academic performance.",
  },
  {
    icon: CheckCircle2,
    title: "Flexible Scheduling",
    description: "Book sessions at times that work for you, with both in-person and online options available.",
  },
]

export function About() {
  return (
    <section id="about" className="py-16 md:py-24 bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance">About Edfored Tutoring</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p className="text-lg">
                Founded in 2015, Edfored Tutoring has been dedicated to helping students achieve their academic goals
                through personalized, high-quality education.
              </p>
              <p className="text-lg">
                Our team consists of certified educators, subject matter experts, and passionate teachers who believe
                that every student has the potential to excel. We've helped over 500 students improve their grades,
                build confidence, and develop a genuine love for learning.
              </p>
              <p className="text-lg">
                Whether you're struggling with a specific subject, preparing for standardized tests, or looking to get
                ahead, we're here to support your educational journey every step of the way.
              </p>
            </div>

            <div className="mt-8 space-y-3">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-foreground">Certified and experienced tutors</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-foreground">One-on-one personalized attention</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-foreground">Flexible online and in-person sessions</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-foreground">Progress tracking and regular feedback</span>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <Card key={index} className="border-border">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2 text-foreground">{value.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
