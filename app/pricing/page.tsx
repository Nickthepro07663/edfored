import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Pricing | Edfored",
  description: "Affordable tutoring packages for every student. Choose the plan that works best for you.",
}

const pricingPlans = [
  {
    name: "Single Session",
    price: 50,
    description: "Perfect for trying out our services",
    features: [
      "1 hour tutoring session",
      "Subject of your choice",
      "Personalized learning plan",
      "Session recording available",
      "Email support",
    ],
    popular: false,
  },
  {
    name: "Monthly Package",
    price: 180,
    description: "Best value for regular learners",
    features: [
      "4 hours of tutoring (weekly sessions)",
      "All subjects included",
      "Priority scheduling",
      "Progress tracking dashboard",
      "Session recordings",
      "24/7 email support",
      "Study materials included",
    ],
    popular: true,
  },
  {
    name: "Intensive Package",
    price: 320,
    description: "For students who need extra support",
    features: [
      "8 hours of tutoring (2x weekly)",
      "All subjects included",
      "Priority scheduling",
      "Dedicated tutor assignment",
      "Progress tracking & reports",
      "Session recordings",
      "24/7 priority support",
      "Study materials & resources",
      "Parent progress meetings",
    ],
    popular: false,
  },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
              Simple, Transparent <span className="text-blue-600">Pricing</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto text-pretty">
              Choose the package that fits your learning goals and budget
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3 mb-12">
            {pricingPlans.map((plan) => (
              <Card key={plan.name} className={`relative ${plan.popular ? "border-blue-600 border-2 shadow-xl" : ""}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                  <CardDescription className="text-base mb-4">{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-5xl font-bold text-blue-600">${plan.price}</span>
                    <span className="text-gray-600 ml-2">/ month</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/booking">
                    <Button
                      className={`w-full ${plan.popular ? "bg-blue-600 hover:bg-blue-700" : ""}`}
                      variant={plan.popular ? "default" : "outline"}
                    >
                      Get Started
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-blue-50 rounded-lg p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Need a Custom Plan?</h3>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              We offer customized packages for groups, test preparation, and specialized subjects. Contact us to discuss
              your specific needs.
            </p>
            <Link href="/contact">
              <Button variant="outline" size="lg">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
