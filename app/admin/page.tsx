"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, Users, DollarSign, LogOut, Loader2, Clock, Edit, BarChart3, Eye, FileText } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { getAllCMSContent, updateCMSContent } from "@/app/actions/cms"

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
  const [cmsContent, setCmsContent] = useState<any[]>([])
  const [editingSection, setEditingSection] = useState<string | null>(null)
  const [editContent, setEditContent] = useState<string>("")
  const [analytics, setAnalytics] = useState<any>({
    pageViews: 0,
    bookings: 0,
    signups: 0,
    topPages: [],
  })
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
      loadCMSContent()
      loadAnalytics()
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

  const loadCMSContent = async () => {
    try {
      const content = await getAllCMSContent()
      setCmsContent(content)
    } catch (error) {
      console.error("[v0] Error loading CMS content:", error)
    }
  }

  const loadAnalytics = async () => {
    try {
      const startDate = new Date()
      startDate.setDate(startDate.getDate() - 30)

      const { data: analyticsData, error } = await supabase
        .from("analytics")
        .select("*")
        .gte("created_at", startDate.toISOString())

      if (error) throw error

      const pageViews = analyticsData?.filter((e) => e.event_type === "page_view").length || 0
      const bookingEvents = analyticsData?.filter((e) => e.event_type === "booking_created").length || 0
      const signups = analyticsData?.filter((e) => e.event_type === "user_signup").length || 0

      const pageCounts: Record<string, number> = {}
      analyticsData?.forEach((e) => {
        if (e.page_path) {
          pageCounts[e.page_path] = (pageCounts[e.page_path] || 0) + 1
        }
      })

      const topPages = Object.entries(pageCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([path, count]) => ({ path, count }))

      setAnalytics({ pageViews, bookings: bookingEvents, signups, topPages })
    } catch (error) {
      console.error("[v0] Error loading analytics:", error)
    }
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

  const handleEditSection = (section: string, content: any) => {
    setEditingSection(section)
    setEditContent(JSON.stringify(content, null, 2))
  }

  const handleSaveSection = async () => {
    if (!editingSection) return

    try {
      const contentObj = JSON.parse(editContent)
      const result = await updateCMSContent(editingSection, contentObj, adminRole || "admin")

      if (result.success) {
        alert("Content updated successfully!")
        setEditingSection(null)
        loadCMSContent()
      } else {
        alert("Error updating content: " + result.error)
      }
    } catch (error) {
      alert("Invalid JSON format. Please check your syntax.")
    }
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
          <p className="text-gray-600">Manage bookings, content, and view analytics</p>
        </div>

        <Tabs defaultValue="bookings" className="space-y-6">
          <TabsList>
            <TabsTrigger value="bookings">
              <Calendar className="h-4 w-4 mr-2" />
              Bookings
            </TabsTrigger>
            <TabsTrigger value="analytics">
              <BarChart3 className="h-4 w-4 mr-2" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="cms">
              <FileText className="h-4 w-4 mr-2" />
              Edit Content
            </TabsTrigger>
          </TabsList>

          <TabsContent value="bookings" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-3">
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

            <div>
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

            <div>
              <h3 className="text-2xl font-bold mb-4">All Bookings</h3>
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
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Page Views</CardTitle>
                  <Eye className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analytics.pageViews}</div>
                  <p className="text-xs text-gray-600">Last 30 days</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Bookings Created</CardTitle>
                  <Calendar className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analytics.bookings}</div>
                  <p className="text-xs text-gray-600">Last 30 days</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">User Signups</CardTitle>
                  <Users className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analytics.signups}</div>
                  <p className="text-xs text-gray-600">Last 30 days</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Top Pages</CardTitle>
                <CardDescription>Most visited pages in the last 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analytics.topPages.length > 0 ? (
                    analytics.topPages.map((page: any, index: number) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm font-medium">{page.path || "/"}</span>
                        <Badge variant="secondary">{page.count} views</Badge>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-600 text-center py-4">No analytics data available yet</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cms" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Content Management</CardTitle>
                <CardDescription>Edit website content that appears on the homepage and other pages</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cmsContent.map((section) => (
                    <Card key={section.section} className="border-2">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-lg capitalize">{section.section}</CardTitle>
                            <CardDescription className="text-xs">
                              Last updated: {new Date(section.updated_at).toLocaleString()}
                            </CardDescription>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEditSection(section.section, section.content)}
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <pre className="bg-gray-50 p-3 rounded text-xs overflow-auto max-h-40">
                          {JSON.stringify(section.content, null, 2)}
                        </pre>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {editingSection && (
              <Card className="border-blue-500 border-2">
                <CardHeader>
                  <CardTitle>Editing: {editingSection}</CardTitle>
                  <CardDescription>Edit the JSON content below. Make sure to keep valid JSON format.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="font-mono text-sm min-h-[300px]"
                    placeholder="Edit JSON content here..."
                  />
                  <div className="flex gap-2">
                    <Button onClick={handleSaveSection}>Save Changes</Button>
                    <Button variant="outline" onClick={() => setEditingSection(null)}>
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
