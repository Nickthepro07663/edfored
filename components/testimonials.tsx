import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Parent of High School Student",
    content:
      "EduMaster has been a game-changer for my daughter. Her math grades improved from a C to an A in just one semester. The tutors are patient, knowledgeable, and truly care about their students.",
    rating: 5,
    image: "/professional-woman-smiling.png",
  },
  {
    name: "Michael Chen",
    role: "College Student",
    content:
      "The computer science tutoring I received helped me land my dream internship. The tutor not only taught me programming concepts but also helped me prepare for technical interviews.",
    rating: 5,
    image: "/young-asian-man-smiling.png",
  },
  {
    name: "Emily Rodriguez",
    role: "Parent of Middle School Student",
    content:
      "My son was struggling with reading comprehension. After working with EduMaster for three months, his confidence has soared and he actually enjoys reading now!",
    rating: 5,
    image: "/hispanic-woman-smiling.jpg",
  },
  {
    name: "David Thompson",
    role: "High School Senior",
    content:
      "Thanks to the SAT prep tutoring, I scored 200 points higher than my initial practice test. I got into my top choice university! Highly recommend EduMaster.",
    rating: 5,
    image: "/teenage-boy-smiling.jpg",
  },
]

export function Testimonials() {
  return (
    <section id="testimonials" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">What Our Students Say</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Don't just take our word for it. Here's what students and parents have to say about their experience with
            EduMaster.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-border">
              <CardContent className="pt-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">"{testimonial.content}"</p>
                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
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
