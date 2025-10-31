"use client"

import type React from "react"
import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, User, Check } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { TUTORING_SESSIONS } from "@/lib/products"
import Checkout from "@/components/checkout"

export default function BookingClientPage() {
  const { toast } = useToast()
  const router = useRouter()
  const supabase = createClient()
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState<"form" | "package" | "payment">("form")
  const [selectedPackage, setSelectedPackage] = useState<string>("")
  const [bookingId, setBookingId] = useState<string>("")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    level: "",
    date: "",
    time: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Check if user is authenticated
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        // Redirect to login if not authenticated
        toast({
          title: "Authentication Required",
          description: "Please log in or create an account to book a session.",
          variant: "destructive",
        })
        router.push("/auth/login")
        return
      }

      setStep("package")
    } catch (error) {
      console.error("Error:", error)
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handlePackageSelect = async (packageId: string) => {
    setSelectedPackage(packageId)
    setIsLoading(true)

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push("/auth/login")
        return
      }

      // Insert booking into database
      const { data, error } = await supabase
        .from("bookings")
        .insert({
          user_id: user.id,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          grade_level: formData.level,
          preferred_date: formData.date,
          preferred_time: formData.time,
          message: formData.message,
          is_paid: false,
          status: "pending",
        })
        .select()
        .single()

      if (error) throw error

      setBookingId(data.id)
      setStep("payment")
    } catch (error) {
      console.error("Error creating booking:", error)
      toast({
        title: "Error",
        description: "Failed to create booking. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <main className="min-h-screen">
      <Header />
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Book Your First Session</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {step === "form" &&
                  "Ready to get started? Fill out the form below and we'll match you with the perfect tutor for your needs."}
                {step === "package" && "Choose a tutoring package that fits your needs."}
                {step === "payment" && "Complete your payment to confirm your booking."}
              </p>
            </div>

            {step === "form" && (
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Session Booking Form</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Complete the form below to schedule your tutoring session.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-foreground">
                          Full Name *
                        </Label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="name"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={(e) => handleChange("name", e.target.value)}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-foreground">
                          Email Address *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={(e) => handleChange("email", e.target.value)}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-foreground">
                          Phone Number *
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="(555) 123-4567"
                          value={formData.phone}
                          onChange={(e) => handleChange("phone", e.target.value)}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subject" className="text-foreground">
                          Subject *
                        </Label>
                        <Select
                          value={formData.subject}
                          onValueChange={(value) => handleChange("subject", value)}
                          required
                        >
                          <SelectTrigger id="subject">
                            <SelectValue placeholder="Select a subject" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Mathematics">Mathematics</SelectItem>
                            <SelectItem value="Science">Science</SelectItem>
                            <SelectItem value="English & Literature">English & Literature</SelectItem>
                            <SelectItem value="Languages">Languages</SelectItem>
                            <SelectItem value="Computer Science">Computer Science</SelectItem>
                            <SelectItem value="Test Preparation">Test Preparation</SelectItem>
                            <SelectItem value="Music">Music</SelectItem>
                            <SelectItem value="Arts & Humanities">Arts & Humanities</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="level" className="text-foreground">
                          Grade Level *
                        </Label>
                        <Select value={formData.level} onValueChange={(value) => handleChange("level", value)} required>
                          <SelectTrigger id="level">
                            <SelectValue placeholder="Select grade level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Elementary (K-5)">Elementary (K-5)</SelectItem>
                            <SelectItem value="Middle School (6-8)">Middle School (6-8)</SelectItem>
                            <SelectItem value="High School (9-12)">High School (9-12)</SelectItem>
                            <SelectItem value="College/University">College/University</SelectItem>
                            <SelectItem value="Adult Learner">Adult Learner</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="date" className="text-foreground">
                          Preferred Date *
                        </Label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="date"
                            type="date"
                            value={formData.date}
                            onChange={(e) => handleChange("date", e.target.value)}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="time" className="text-foreground">
                          Preferred Time *
                        </Label>
                        <div className="relative">
                          <Clock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="time"
                            type="time"
                            value={formData.time}
                            onChange={(e) => handleChange("time", e.target.value)}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-foreground">
                        Additional Information
                      </Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us about your learning goals, any specific topics you'd like to focus on, or any questions you have..."
                        value={formData.message}
                        onChange={(e) => handleChange("message", e.target.value)}
                        rows={4}
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
                      {isLoading ? "Processing..." : "Continue to Package Selection"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}

            {step === "package" && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                  {TUTORING_SESSIONS.map((session) => (
                    <Card
                      key={session.id}
                      className={`border-2 cursor-pointer transition-all hover:shadow-lg ${
                        selectedPackage === session.id ? "border-primary" : "border-border"
                      }`}
                      onClick={() => handlePackageSelect(session.id)}
                    >
                      <CardHeader>
                        <CardTitle className="text-xl">{session.name}</CardTitle>
                        <CardDescription>{session.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="text-3xl font-bold text-primary">
                            ${(session.priceInCents / 100).toFixed(2)}
                          </div>
                          <div className="text-sm text-muted-foreground">Duration: {session.duration}</div>
                          <Button
                            className="w-full"
                            disabled={isLoading}
                            onClick={(e) => {
                              e.stopPropagation()
                              handlePackageSelect(session.id)
                            }}
                          >
                            {isLoading && selectedPackage === session.id ? (
                              "Processing..."
                            ) : (
                              <>
                                <Check className="w-4 h-4 mr-2" />
                                Select Package
                              </>
                            )}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <Button variant="outline" onClick={() => setStep("form")} className="w-full">
                  Back to Form
                </Button>
              </div>
            )}

            {step === "payment" && selectedPackage && bookingId && (
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Complete Payment</CardTitle>
                  <CardDescription className="text-muted-foreground">Secure payment powered by Stripe</CardDescription>
                </CardHeader>
                <CardContent>
                  <Checkout sessionId={selectedPackage} bookingId={bookingId} />
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
