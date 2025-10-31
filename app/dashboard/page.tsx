import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Calendar, CheckCircle, LogOut, TrendingUp, Clock } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "My Dashboard - Edfored",
  description: "View your tutoring sessions, payment status, and booking history.",
}

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    redirect("/auth/login")
  }

  // Fetch user's bookings
  const { data: bookings } = await supabase
    .from("bookings")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  const totalHours = bookings?.length || 0
  const completedSessions = bookings?.filter((b) => b.status === "completed").length || 0
  const upcomingSessions = bookings?.filter((b) => b.status === "confirmed" || b.status === "pending").length || 0

  const handleSignOut = async () => {
    "use server"
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect("/auth/login")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <div>
              <h1 className="text-2xl font-bold text-blue-600">Edfored</h1>
              <p className="text-sm text-gray-600">Student Dashboard</p>
            </div>
          </Link>
          <form action={handleSignOut}>
            <Button variant="outline" size="sm" type="submit">
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </form>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Welcome back!</h2>
          <p className="text-gray-600">{user.email}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Sessions</CardTitle>
              <Calendar className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{bookings?.length || 0}</div>
              <p className="text-xs text-gray-600">All time bookings</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedSessions}</div>
              <p className="text-xs text-gray-600">Finished sessions</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
              <Clock className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{upcomingSessions}</div>
              <p className="text-xs text-gray-600">Scheduled sessions</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Learning Hours</CardTitle>
              <TrendingUp className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalHours}</div>
              <p className="text-xs text-gray-600">Total hours invested</p>
            </CardContent>
          </Card>
        </div>

        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-2xl font-bold">My Sessions</h3>
          <Link href="/booking">
            <Button>Book New Session</Button>
          </Link>
        </div>

        <div className="grid gap-4">
          {bookings && bookings.length > 0 ? (
            bookings.map((booking) => (
              <Card key={booking.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{booking.subject}</CardTitle>
                      <CardDescription>
                        {new Date(booking.preferred_date).toLocaleDateString()} at {booking.preferred_time}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Badge
                        variant={booking.is_paid ? "default" : "secondary"}
                        className={booking.is_paid ? "bg-green-600" : "bg-orange-500"}
                      >
                        {booking.is_paid ? "Paid" : "Pending Payment"}
                      </Badge>
                      <Badge variant="outline" className="capitalize">
                        {booking.status}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Grade Level:</span>
                      <span className="font-medium">{booking.grade_level}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Booked on:</span>
                      <span className="font-medium">{new Date(booking.created_at).toLocaleDateString()}</span>
                    </div>
                    {booking.message && (
                      <div className="mt-2 pt-2 border-t">
                        <p className="text-gray-600 text-xs">Message:</p>
                        <p className="text-sm">{booking.message}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-semibold mb-2">No sessions yet</h3>
                <p className="text-gray-600 mb-4">Book your first tutoring session to get started!</p>
                <Link href="/booking">
                  <Button>Book a Session</Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
