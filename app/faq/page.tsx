import type { Metadata } from "next"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "FAQ | EDforED",
  description: "Frequently asked questions about EDforED tutoring services. Find answers to common questions.",
}

const faqs = [
  {
    question: "How do I book a tutoring session?",
    answer:
      "Simply visit our Booking page, fill out the form with your details and preferences. You'll receive a confirmation email with your session details and payment instructions.",
  },
  {
    question: "What subjects do you offer tutoring for?",
    answer:
      "We offer tutoring in Academics (Math, English, Science, History), Languages (Spanish, Mandarin), Music (Guitar, Piano, Trombone, Saxophone), Computer Science (Python), and Chess. Check our Services page for complete details and pricing.",
  },
  {
    question: "Who are your tutors?",
    answer:
      "Our tutors are carefully selected high school students who excel in their subjects. All tutors must be in all honors classes with a minimum A average, submit transcripts, provide a list of achievements and teaching experience, and complete multiple interviews with our hiring team.",
  },
  {
    question: "What are your rates?",
    answer:
      "Our rates vary by subject. Academic and Language tutoring is $25/hr in-person or $20/hr online. Music, Computer Science, and Chess are $30/hr in-person or $25/hr online. Visit our Services & Pricing page for complete details.",
  },
  {
    question: "Do you offer online or in-person sessions?",
    answer:
      "We offer both online and in-person tutoring sessions. You can choose your preferred format when booking. We serve students in 10+ towns throughout Bergen County.",
  },
  {
    question: "How do I pay for sessions?",
    answer:
      "We accept payment via Venmo. After booking your session, you'll receive payment instructions including our Venmo username. Payment confirmation is required before your session begins.",
  },
  {
    question: "What if I need to cancel or reschedule?",
    answer:
      "Please contact us at least 24 hours in advance if you need to cancel or reschedule. You can reach us at edfored2025@gmail.com or (551) 502-3368.",
  },
  {
    question: "How long are tutoring sessions?",
    answer:
      "Standard tutoring sessions are 1 hour long. This duration has proven most effective for focused learning while maintaining student engagement.",
  },
  {
    question: "What age groups do you teach?",
    answer:
      "We specialize in K-8 students. Our younger tutors connect with K-8 students in a unique way, helping them build confidence and enjoy school again.",
  },
  {
    question: "Do you offer group lessons?",
    answer: "Group lessons are coming soon! Stay tuned for updates on our group tutoring options.",
  },
  {
    question: "What areas do you serve?",
    answer:
      "We currently have tutors in 8 different towns throughout Bergen County, with over 21 team members ready to help students succeed.",
  },
  {
    question: "How does EDforED give back?",
    answer:
      "We're committed to giving back — 10% of our profits support students in South America, helping provide educational opportunities to those in need.",
  },
]

export default function FAQPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="pt-20 bg-gradient-to-br from-blue-50 to-white">
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
                Frequently Asked <span className="text-blue-600">Questions</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto text-pretty">
                Find answers to common questions about our tutoring services
              </p>
            </div>

            <Card>
              <CardContent className="pt-6">
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                      <AccordionContent className="text-gray-700">{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>

            <div className="mt-12 text-center bg-blue-50 rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
              <p className="text-gray-700 mb-6">Can't find the answer you're looking for? Our team is here to help.</p>
              <a href="/contact" className="text-blue-600 font-semibold hover:underline">
                Contact Us →
              </a>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  )
}
