"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, User } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function Booking() {
  const { toast } = useToast()
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Here you would typically send the data to your backend
    console.log("Booking submitted:", formData)

    toast({
      title: "Booking Request Received!",
      description: "We'll contact you within 24 hours to confirm your session.",
    })

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      level: "",
      date: "",
      time: "",
      message: "",
    })
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <section id="booking" className="py-16 md:py-24 bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Book Your First Session</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Ready to get started? Fill out the form below and we'll match you with the perfect tutor for your needs.
            </p>
          </div>

          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Session Booking Form</CardTitle>
              <CardDescription className="text-muted-foreground">
                Complete the form below to schedule your tutoring session. We'll confirm your booking within 24 hours.
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
                    <Select value={formData.subject} onValueChange={(value) => handleChange("subject", value)} required>
                      <SelectTrigger id="subject">
                        <SelectValue placeholder="Select a subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="math">Mathematics</SelectItem>
                        <SelectItem value="science">Science</SelectItem>
                        <SelectItem value="english">English & Literature</SelectItem>
                        <SelectItem value="languages">Languages</SelectItem>
                        <SelectItem value="computer">Computer Science</SelectItem>
                        <SelectItem value="test-prep">Test Preparation</SelectItem>
                        <SelectItem value="music">Music</SelectItem>
                        <SelectItem value="arts">Arts & Humanities</SelectItem>
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
                        <SelectItem value="elementary">Elementary (K-5)</SelectItem>
                        <SelectItem value="middle">Middle School (6-8)</SelectItem>
                        <SelectItem value="high">High School (9-12)</SelectItem>
                        <SelectItem value="college">College/University</SelectItem>
                        <SelectItem value="adult">Adult Learner</SelectItem>
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

                <Button type="submit" size="lg" className="w-full">
                  Submit Booking Request
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
