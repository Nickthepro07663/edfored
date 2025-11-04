"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Calendar, Users, DollarSign, LogOut, Loader2, Clock } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

interface Booking {
  id: string
  user_id: string
  name: string
  email: string
  phone: string | null
  subject: string
  grade_level: string
  preferred_date: string
  preferred_time: string
  message: string | null
  is_paid: boolean
  status: string
  created_at: string
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [bookings, setBookings] = useState<Booking[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [adminRole, setAdminRole] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const adminSessionStr = localStorage.getItem("adminSession")
    const isActive = sessionStorage.getItem("admin_active")

    if (!adminSessionStr || !isActive) {
      router.push("/auth/admin-login")
      return
    }

    try {
      const sessionData = JSON.parse(adminSessionStr)
      if (sessionData.role !== "admin" && sessionData.role !== "owner" && sessionData.role !== "staff") {
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

      setAdminRole(sessionData.role)
      setIsAuthenticated(true)
      fetchBookings()
    } catch (error) {
      router.push("/auth/admin-login")
    }
  }, [router])

  const fetchBookings = async () => {
    setIsLoading(true)
    const { data, error } = await supabase.from("bookings").select("*").order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching bookings:", error)
    } else {
      setBookings(data || [])
    }
    setIsLoading(false)
  }

  const handlePaymentToggle = async (bookingId: string, currentStatus: boolean) => {
    const { error } = await supabase.from("bookings").update({ is_paid: !currentStatus }).eq("id", bookingId)

    if (error) {
      console.error("Error updating payment status:", error)
    } else {
      setBookings(bookings.map((b) => (b.id === bookingId ? { ...b, is_paid: !currentStatus } : b)))
    }
  }

  const handleStatusChange = async (bookingId: string, newStatus: string) => {
    const { error } = await supabase.from("bookings").update({ status: newStatus }).eq("id", bookingId)

    if (error) {
      console.error("Error updating status:", error)
    } else {
      setBookings(bookings.map((b) => (b.id === bookingId ? { ...b, status: newStatus } : b)))
    }
  }

  const handleSignOut = () => {
    localStorage.removeItem("adminSession")
    sessionStorage.removeItem("admin_active")
    router.push("/")
  }

  if (!isAuthenticated) {
    return null
  }

  const totalBookings = bookings.length
  const paidBookings = bookings.filter((b) => b.is_paid).length
  const pendingBookings = bookings.filter((b) => !b.is_paid).length

  const upcomingSessions = bookings
    .filter((b) => new Date(b.preferred_date) >= new Date())
    .sort((a, b) => new Date(a.preferred_date).getTime() - new Date(b.preferred_date).getTime())

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <div>
              <h1 className="text-2xl font-bold text-blue-600">Edfored Admin</h1>
              <p className="text-sm text-gray-600">Administrative Dashboard</p>
            </div>
          </Link>
          <div className="flex gap-2">
            {adminRole === "owner" && (
              <Link href="/owner">
                <Button variant="outline" size="sm">
                  Manage Users
                </Button>
              </Link>
            )}
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Dashboard Overview</h2>
          <p className="text-gray-600">Manage all bookings and sessions</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
              <Calendar className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalBookings}</div>
              <p className="text-xs text-gray-600">All time bookings</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Paid Sessions</CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{paidBookings}</div>
              <p className="text-xs text-gray-600">Completed payments</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Payment</CardTitle>
              <Users className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingBookings}</div>
              <p className="text-xs text-gray-600">Awaiting payment</p>
            </CardContent>
          </Card>
        </div>

        <div className="mb-8">
          <h3 className="text-2xl font-bold mb-4">Upcoming Sessions Calendar</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {upcomingSessions.length > 0 ? (
              upcomingSessions.slice(0, 6).map((booking) => (
                <Card key={booking.id} className="border-l-4 border-l-blue-500">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-base">{booking.name}</CardTitle>
                        <CardDescription className="text-xs">{booking.subject}</CardDescription>
                      </div>
                      <Badge
                        variant={booking.is_paid ? "default" : "secondary"}
                        className={booking.is_paid ? "bg-green-600" : "bg-orange-500"}
                      >
                        {booking.is_paid ? "Paid" : "Unpaid"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="h-4 w-4" />
                      {new Date(booking.preferred_date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="h-4 w-4" />
                      {booking.preferred_time}
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="md:col-span-2 lg:col-span-3">
                <CardContent className="py-8 text-center text-gray-600">No upcoming sessions scheduled</CardContent>
              </Card>
            )}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-2xl font-bold">All Bookings</h3>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          </div>
        ) : (
          <div className="grid gap-4">
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <Card key={booking.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>{booking.name}</CardTitle>
                        <CardDescription>
                          {booking.email} {booking.phone && `• ${booking.phone}`}
                        </CardDescription>
                      </div>
                      <Badge
                        variant={booking.is_paid ? "default" : "secondary"}
                        className={booking.is_paid ? "bg-green-600" : "bg-orange-500"}
                      >
                        {booking.is_paid ? "Paid" : "Unpaid"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      <div className="grid gap-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Subject:</span>
                          <span className="font-medium">{booking.subject}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Grade Level:</span>
                          <span className="font-medium">{booking.grade_level}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Preferred Date:</span>
                          <span className="font-medium">
                            {new Date(booking.preferred_date).toLocaleDateString()} at {booking.preferred_time}
                          </span>
                        </div>
                        {booking.message && (
                          <div className="mt-2 pt-2 border-t">
                            <p className="text-gray-600 text-xs mb-1">Message:</p>
                            <p className="text-sm">{booking.message}</p>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="flex items-center space-x-2">
                          <Switch
                            id={`payment-${booking.id}`}
                            checked={booking.is_paid}
                            onCheckedChange={() => handlePaymentToggle(booking.id, booking.is_paid)}
                          />
                          <Label htmlFor={`payment-${booking.id}`} className="cursor-pointer">
                            Mark as {booking.is_paid ? "Unpaid" : "Paid"}
                          </Label>
                        </div>

                        <div className="flex items-center gap-2">
                          <Label htmlFor={`status-${booking.id}`} className="text-sm">
                            Status:
                          </Label>
                          <Select
                            value={booking.status}
                            onValueChange={(value) => handleStatusChange(booking.id, value)}
                          >
                            <SelectTrigger id={`status-${booking.id}`} className="w-[140px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="confirmed">Confirmed</SelectItem>
                              <SelectItem value="completed">Completed</SelectItem>
                              <SelectItem value="cancelled">Cancelled</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-lg font-semibold mb-2">No bookings yet</h3>
                  <p className="text-gray-600">Bookings will appear here once students start booking sessions.</p>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
