import type { Metadata } from "next"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "FAQ | Edfored",
  description: "Frequently asked questions about Edfored tutoring services. Find answers to common questions.",
}

const faqs = [
  {
    question: "How do I book a tutoring session?",
    answer:
      "Simply visit our Booking page, fill out the form with your details and preferences, select your package, and complete the payment. You'll receive a confirmation email with your session details.",
  },
  {
    question: "What subjects do you offer tutoring for?",
    answer:
      "We offer tutoring in Mathematics, Science (Physics, Chemistry, Biology), English, Computer Science, History, and more. Check our Services page for a complete list of subjects.",
  },
  {
    question: "Can I choose my own tutor?",
    answer:
      "Yes! You can browse our Tutors page to see all available tutors, their specializations, and ratings. When booking, you can request a specific tutor, and we'll do our best to accommodate your preference.",
  },
  {
    question: "What if I need to cancel or reschedule?",
    answer:
      "You can cancel or reschedule up to 24 hours before your session without any penalty. Simply log into your dashboard and manage your bookings. Cancellations within 24 hours may incur a fee.",
  },
  {
    question: "How are the sessions conducted?",
    answer:
      "All sessions are conducted online via video conferencing. You'll receive a link to join your session before the scheduled time. We use secure, easy-to-use platforms that work on any device.",
  },
  {
    question: "Do you offer group tutoring?",
    answer:
      "Yes! We offer group tutoring sessions at discounted rates. Contact us to discuss group packages for 2-5 students studying the same subject.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards, debit cards, and digital payment methods through our secure PayPal payment gateway. All transactions are encrypted and secure.",
  },
  {
    question: "Can I get a refund if I'm not satisfied?",
    answer:
      "We offer a satisfaction guarantee. If you're not happy with your first session, contact us within 48 hours and we'll either provide a replacement session or issue a full refund.",
  },
  {
    question: "How do I track my progress?",
    answer:
      "Students have access to a personal dashboard where you can view your session history, track learning progress, access session recordings, and see tutor notes and recommendations.",
  },
  {
    question: "Are the tutors qualified?",
    answer:
      "All our tutors are thoroughly vetted and have relevant degrees, teaching certifications, and extensive experience in their subjects. Many hold advanced degrees and have years of teaching experience.",
  },
  {
    question: "Do you offer test preparation?",
    answer:
      "Yes! We offer specialized test preparation for SAT, ACT, AP exams, and other standardized tests. Our tutors use proven strategies and practice materials to help you achieve your best score.",
  },
  {
    question: "What age groups do you teach?",
    answer:
      "We work with students of all ages, from elementary school through college and adult learners. Our tutors adapt their teaching style to match each student's age and learning level.",
  },
]

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
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
            <p className="text-gray-700 mb-6">
              Can't find the answer you're looking for? Our support team is here to help.
            </p>
            <a href="/contact" className="text-blue-600 font-semibold hover:underline">
              Contact Support →
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
