"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, LogOut, Loader2, Users } from "lucide-react"
import Link from "next/link"

interface Booking {
  id: string
  name: string
  email: string
  subject: string
  grade_level: string
  preferred_date: string
  preferred_time: string
  status: string
  is_paid: boolean
}

export default function StaffDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [bookings, setBookings] = useState<Booking[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const staffSessionStr = localStorage.getItem("adminSession")
    const isActive = sessionStorage.getItem("admin_active")

    if (!staffSessionStr || !isActive) {
      router.push("/auth/admin-login")
      return
    }

    try {
      const sessionData = JSON.parse(staffSessionStr)
      if (sessionData.role !== "staff" && sessionData.role !== "admin") {
        router.push("/auth/admin-login")
        return
      }

      const maxAge = sessionData.rememberMe ? 7 * 24 : 24
      const hoursSinceLogin = (Date.now() - sessionData.timestamp) / (1000 * 60 * 60)
      if (hoursSinceLogin > maxAge) {
        localStorage.removeItem("adminSession")
        sessionStorage.removeItem("admin_active")
        router.push("/auth/admin-login")
        return
      }

      setIsAuthenticated(true)
      fetchSessions()
    } catch (error) {
      router.push("/auth/admin-login")
    }
  }, [router])

  const fetchSessions = async () => {
    setIsLoading(true)
    const { data, error } = await supabase.from("bookings").select("*").order("preferred_date", { ascending: true })

    if (error) {
      console.error("Error fetching sessions:", error)
    } else {
      setBookings(data || [])
    }
    setIsLoading(false)
  }

  const handleSignOut = () => {
    localStorage.removeItem("adminSession")
    sessionStorage.removeItem("admin_active")
    router.push("/")
  }

  if (!isAuthenticated) {
    return null
  }

  const upcomingSessions = bookings.filter((b) => new Date(b.preferred_date) >= new Date())
  const completedSessions = bookings.filter((b) => new Date(b.preferred_date) < new Date())

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <div>
              <h1 className="text-2xl font-bold text-blue-600">Edfored Staff</h1>
              <p className="text-sm text-gray-600">Tutor Session Dashboard</p>
            </div>
          </Link>
          <Button variant="outline" size="sm" onClick={handleSignOut}>
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Your Sessions</h2>
          <p className="text-gray-600">View all upcoming and completed tutoring sessions</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Sessions</CardTitle>
              <Calendar className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{upcomingSessions.length}</div>
              <p className="text-xs text-gray-600">Scheduled for the future</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Sessions</CardTitle>
              <Users className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{bookings.length}</div>
              <p className="text-xs text-gray-600">All time bookings</p>
            </CardContent>
          </Card>
        </div>

        <div className="mb-6">
          <h3 className="text-2xl font-bold mb-4">Upcoming Sessions Calendar</h3>
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
          ) : upcomingSessions.length > 0 ? (
            <div className="grid gap-4">
              {upcomingSessions.map((booking) => (
                <Card key={booking.id} className="border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>{booking.name}</CardTitle>
                        <CardDescription>{booking.email}</CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Badge
                          variant={booking.is_paid ? "default" : "secondary"}
                          className={booking.is_paid ? "bg-green-600" : "bg-orange-500"}
                        >
                          {booking.is_paid ? "Paid" : "Unpaid"}
                        </Badge>
                        <Badge variant="outline">{booking.status}</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid gap-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Subject:</span>
                        <span className="font-medium">{booking.subject}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Grade Level:</span>
                        <span className="font-medium">{booking.grade_level}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="h-4 w-4" />
                        {new Date(booking.preferred_date).toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="h-4 w-4" />
                        {booking.preferred_time}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-semibold mb-2">No upcoming sessions</h3>
                <p className="text-gray-600">All your sessions have been completed!</p>
              </CardContent>
            </Card>
          )}
        </div>

        {completedSessions.length > 0 && (
          <div className="mb-6">
            <h3 className="text-2xl font-bold mb-4">Completed Sessions</h3>
            <div className="grid gap-4">
              {completedSessions.map((booking) => (
                <Card key={booking.id} className="opacity-75">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-sm">{booking.name}</CardTitle>
                        <CardDescription>{booking.subject}</CardDescription>
                      </div>
                      <Badge variant="outline">Completed</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm text-gray-600">
                    {new Date(booking.preferred_date).toLocaleDateString()} at {booking.preferred_time}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
