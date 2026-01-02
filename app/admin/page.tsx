"use client"

import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calendar, DollarSign, Users, Eye, FileText, LogOut, Loader2, Clock, Plus, Trash2 } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import Link from "next/link"
import { getAllCMSContent, updateCMSContent } from "@/app/actions/cms"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

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
  const [editContent, setEditContent] = useState<string>("") // For advanced mode
  const [editMode, setEditMode] = useState<"simple" | "advanced">("simple") // For CMS editing mode

  // Simple mode state
  const [simpleContent, setSimpleContent] = useState<any>({})

  // Advanced mode state (already present but redefined for clarity in updates)
  const [advancedContent, setAdvancedContent] = useState<string>("")

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
      // Map booking data to match the updated Booking interface
      const formattedBookings = (data || []).map((booking: any) => ({
        ...booking,
        student_name: booking.name, // Assuming 'name' from DB maps to 'student_name'
        name: booking.name, // Keep original 'name' field if it's still used elsewhere or for compatibility
        phone: booking.phone || "",
        message: booking.message || "",
        grade_level: booking.grade_level || "",
        subject: booking.subject || "",
      }))
      setBookings(formattedBookings)
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
    setSimpleContent(content)
    setAdvancedContent(JSON.stringify(content, null, 2))
  }

  const handleSaveSection = async () => {
    if (!editingSection) return

    try {
      const contentToSave = editMode === "simple" ? simpleContent : JSON.parse(advancedContent)

      const result = await updateCMSContent(editingSection, contentToSave, adminRole || "admin")

      if (result.success) {
        alert("Content updated successfully! The changes will appear on the website.")
        setEditingSection(null)
        loadCMSContent()
      } else {
        alert("Error updating content: " + result.error)
      }
    } catch (error) {
      alert("Invalid JSON format in advanced mode. Please check your syntax.")
    }
  }

  const handleSimpleInputChange = (field: string, value: any) => {
    setSimpleContent((prev: any) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleStatChange = (index: number, field: string, value: string) => {
    const newStats = [...(simpleContent.stats || [])]
    newStats[index] = { ...newStats[index], [field]: value }
    setSimpleContent((prev: any) => ({
      ...prev,
      stats: newStats,
    }))
  }

  const handleSocialChange = (platform: string, value: string) => {
    setSimpleContent((prev: any) => ({
      ...prev,
      social: {
        ...(prev.social || {}),
        [platform]: value,
      },
    }))
  }

  const RichTextEditor = ({
    value,
    onChange,
    placeholder,
  }: { value: string; onChange: (value: string) => void; placeholder: string }) => {
    const [textColor, setTextColor] = useState("#000000")
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    const stripHtml = (html: string) => {
      const tmp = document.createElement("DIV")
      tmp.innerHTML = html
      return tmp.textContent || tmp.innerText || ""
    }

    const applyFormatting = (format: "bold" | "italic" | "underline" | "color") => {
      if (!textareaRef.current) return
      const start = textareaRef.current.selectionStart
      const end = textareaRef.current.selectionEnd
      const plainText = stripHtml(value)
      const selectedText = plainText.substring(start, end)

      if (!selectedText) {
        alert("Please select text first before applying formatting")
        return
      }

      let formattedText = ""
      switch (format) {
        case "bold":
          formattedText = `<strong>${selectedText}</strong>`
          break
        case "italic":
          formattedText = `<em>${selectedText}</em>`
          break
        case "underline":
          formattedText = `<u>${selectedText}</u>`
          break
        case "color":
          formattedText = `<span style="color: ${textColor}">${selectedText}</span>`
          break
      }

      const newValue = plainText.substring(0, start) + formattedText + plainText.substring(end)
      onChange(newValue)
    }

    return (
      <div className="space-y-2">
        <div className="flex gap-2 flex-wrap border rounded-md p-2 bg-muted/50">
          <Button type="button" variant="outline" size="sm" onClick={() => applyFormatting("bold")} title="Bold">
            <strong>B</strong>
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={() => applyFormatting("italic")} title="Italic">
            <em>I</em>
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => applyFormatting("underline")}
            title="Underline"
          >
            <u>U</u>
          </Button>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
              className="w-8 h-8 rounded border cursor-pointer"
              title="Text Color"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => applyFormatting("color")}
              title="Apply Color"
            >
              Color
            </Button>
          </div>
        </div>
        <Textarea
          ref={textareaRef}
          value={stripHtml(value)}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={6}
          className="font-sans"
        />
        <div className="text-xs text-muted-foreground">
          Tip: Select text first, then click formatting button. The formatting will be applied automatically.
        </div>
      </div>
    )
  }

  const renderSimpleEditor = () => {
    if (!editingSection) return null

    switch (editingSection) {
      case "hero":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="headline">Main Headline</Label>
              <Input
                id="headline"
                value={simpleContent.headline || ""}
                onChange={(e) => handleSimpleInputChange("headline", e.target.value)}
                placeholder="Enter main headline"
              />
            </div>
            <div>
              <Label htmlFor="subheadline">Description</Label>
              <RichTextEditor
                value={simpleContent.subheadline || ""}
                onChange={(value) => handleSimpleInputChange("subheadline", value)}
                placeholder="Enter description"
              />
            </div>
            <div className="space-y-2">
              <Label>Statistics (shown below main text)</Label>
              {(simpleContent.stats || []).map((stat: any, index: number) => (
                <div key={index} className="flex gap-2">
                  <Input
                    placeholder="Number (e.g., 20+)"
                    value={stat.value || ""}
                    onChange={(e) => handleStatChange(index, "value", e.target.value)}
                    className="w-32"
                  />
                  <Input
                    placeholder="Label (e.g., Members)"
                    value={stat.label || ""}
                    onChange={(e) => handleStatChange(index, "label", e.target.value)}
                  />
                </div>
              ))}
            </div>
          </div>
        )

      case "services":
        return (
          <div className="space-y-4">
            <Label>Services List</Label>
            {(simpleContent.services || []).map((service: any, index: number) => (
              <Card key={index} className="p-4">
                <div className="space-y-3">
                  <Input
                    placeholder="Service Title (e.g., Academics)"
                    value={service.title || ""}
                    onChange={(e) => {
                      const newServices = [...(simpleContent.services || [])]
                      newServices[index] = { ...newServices[index], title: e.target.value }
                      handleSimpleInputChange("services", newServices)
                    }}
                  />
                  <Textarea
                    placeholder="Description"
                    value={service.description || ""}
                    onChange={(e) => {
                      const newServices = [...(simpleContent.services || [])]
                      newServices[index] = { ...newServices[index], description: e.target.value }
                      handleSimpleInputChange("services", newServices)
                    }}
                    rows={2}
                  />
                  <Input
                    placeholder="Subjects (comma separated: Math, English, Science)"
                    value={(service.subjects || []).join(", ")}
                    onChange={(e) => {
                      const newServices = [...(simpleContent.services || [])]
                      newServices[index] = {
                        ...newServices[index],
                        subjects: e.target.value.split(",").map((s) => s.trim()),
                      }
                      handleSimpleInputChange("services", newServices)
                    }}
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      placeholder="In-Person Price"
                      value={service.priceInPerson || ""}
                      onChange={(e) => {
                        const newServices = [...(simpleContent.services || [])]
                        newServices[index] = { ...newServices[index], priceInPerson: e.target.value }
                        handleSimpleInputChange("services", newServices)
                      }}
                    />
                    <Input
                      placeholder="Online Price"
                      value={service.priceOnline || ""}
                      onChange={(e) => {
                        const newServices = [...(simpleContent.services || [])]
                        newServices[index] = { ...newServices[index], priceOnline: e.target.value }
                        handleSimpleInputChange("services", newServices)
                      }}
                    />
                  </div>
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      const newServices = (simpleContent.services || []).filter((_: any, i: number) => i !== index)
                      handleSimpleInputChange("services", newServices)
                    }}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Remove Service
                  </Button>
                </div>
              </Card>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                const newServices = [
                  ...(simpleContent.services || []),
                  {
                    title: "",
                    description: "",
                    subjects: [],
                    priceInPerson: "",
                    priceOnline: "",
                  },
                ]
                handleSimpleInputChange("services", newServices)
              }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Service
            </Button>
          </div>
        )

      case "faq":
        return (
          <div className="space-y-4">
            <Label>FAQ Items</Label>
            {(simpleContent.faqs || []).map((faq: any, index: number) => (
              <Card key={index} className="p-4">
                <div className="space-y-3">
                  <Input
                    placeholder="Question"
                    value={faq.question || ""}
                    onChange={(e) => {
                      const newFaqs = [...(simpleContent.faqs || [])]
                      newFaqs[index] = { ...newFaqs[index], question: e.target.value }
                      handleSimpleInputChange("faqs", newFaqs)
                    }}
                  />
                  <Textarea
                    placeholder="Answer"
                    value={faq.answer || ""}
                    onChange={(e) => {
                      const newFaqs = [...(simpleContent.faqs || [])]
                      newFaqs[index] = { ...newFaqs[index], answer: e.target.value }
                      handleSimpleInputChange("faqs", newFaqs)
                    }}
                    rows={3}
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      const newFaqs = (simpleContent.faqs || []).filter((_: any, i: number) => i !== index)
                      handleSimpleInputChange("faqs", newFaqs)
                    }}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Remove FAQ
                  </Button>
                </div>
              </Card>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                const newFaqs = [...(simpleContent.faqs || []), { question: "", answer: "" }]
                handleSimpleInputChange("faqs", newFaqs)
              }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add FAQ
            </Button>
          </div>
        )

      case "contact":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={simpleContent.email || ""}
                onChange={(e) => handleSimpleInputChange("email", e.target.value)}
                placeholder="contact@example.com"
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={simpleContent.phone || ""}
                onChange={(e) => handleSimpleInputChange("phone", e.target.value)}
                placeholder="(555) 123-4567"
              />
            </div>
            <div>
              <Label htmlFor="address">Address/Location</Label>
              <Input
                id="address"
                value={simpleContent.address || ""}
                onChange={(e) => handleSimpleInputChange("address", e.target.value)}
                placeholder="City, State"
              />
            </div>
            <div className="space-y-2">
              <Label>Social Media Links</Label>
              <div>
                <Label htmlFor="instagram" className="text-xs text-muted-foreground">
                  Instagram
                </Label>
                <Input
                  id="instagram"
                  value={simpleContent.social?.instagram || ""}
                  onChange={(e) => handleSocialChange("instagram", e.target.value)}
                  placeholder="https://instagram.com/yourpage"
                />
              </div>
              <div>
                <Label htmlFor="youtube" className="text-xs text-muted-foreground">
                  YouTube
                </Label>
                <Input
                  id="youtube"
                  value={simpleContent.social?.youtube || ""}
                  onChange={(e) => handleSocialChange("youtube", e.target.value)}
                  placeholder="https://youtube.com/@yourchannel"
                />
              </div>
              <div>
                <Label htmlFor="tiktok" className="text-xs text-muted-foreground">
                  TikTok
                </Label>
                <Input
                  id="tiktok"
                  value={simpleContent.social?.tiktok || ""}
                  onChange={(e) => handleSocialChange("tiktok", e.target.value)}
                  placeholder="https://tiktok.com/@yourpage"
                />
              </div>
            </div>
          </div>
        )

      case "about":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="mission">Mission Statement</Label>
              <RichTextEditor
                value={simpleContent.mission || ""}
                onChange={(value) => handleSimpleInputChange("mission", value)}
                placeholder="Enter your mission statement"
              />
            </div>
            <div>
              <Label htmlFor="vision">Vision Statement</Label>
              <RichTextEditor
                value={simpleContent.vision || ""}
                onChange={(value) => handleSimpleInputChange("vision", value)}
                placeholder="Enter your vision statement"
              />
            </div>
          </div>
        )

      default:
        return <p className="text-muted-foreground">No simple editor available for this section.</p>
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
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground">{adminRole === "owner" ? "Owner" : "Admin"} Panel</p>
          </div>
          <div className="flex gap-2">
            <Link href="/">
              <Button variant="outline">View Website</Button>
            </Link>
            <Button variant="destructive" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="bookings" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="cms">Edit Website</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
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

          <TabsContent value="cms" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Website Content Management</CardTitle>
                <CardDescription>
                  Edit your website content easily. Simple Mode shows normal text, Advanced Mode shows code.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {[
                    { id: "hero", name: "Homepage Hero", icon: "🏠" },
                    { id: "services", name: "Services & Pricing", icon: "📚" },
                    { id: "about", name: "About Us", icon: "ℹ️" },
                    { id: "faq", name: "FAQ", icon: "❓" },
                    { id: "contact", name: "Contact Info", icon: "📧" },
                  ].map((section) => (
                    <Button
                      key={section.id}
                      variant="outline"
                      className="h-auto flex-col gap-2 p-6 bg-transparent"
                      onClick={() => {
                        const content = cmsContent.find((c) => c.section === section.id)?.content || {}
                        handleEditSection(section.id, content)
                      }}
                    >
                      <span className="text-3xl">{section.icon}</span>
                      <span>{section.name}</span>
                    </Button>
                  ))}
                </div>

                {editingSection && (
                  <Card className="border-2 border-primary">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>Editing: {editingSection.toUpperCase()}</CardTitle>
                        <div className="flex items-center gap-2">
                          <Label htmlFor="edit-mode" className="text-sm">
                            Mode:
                          </Label>
                          <Switch
                            id="edit-mode"
                            checked={editMode === "advanced"}
                            onCheckedChange={(checked) => setEditMode(checked ? "advanced" : "simple")}
                          />
                          <span className="text-sm text-muted-foreground">
                            {editMode === "simple" ? "Simple" : "Advanced"}
                          </span>
                        </div>
                      </div>
                      <CardDescription>
                        {editMode === "simple"
                          ? "Edit content with easy-to-use fields"
                          : "Advanced: Edit raw JSON (for technical users)"}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {editMode === "simple" ? (
                        renderSimpleEditor()
                      ) : (
                        <div>
                          <Label htmlFor="advanced-editor">JSON Content</Label>
                          <Textarea
                            id="advanced-editor"
                            value={advancedContent}
                            onChange={(e) => setAdvancedContent(e.target.value)}
                            rows={15}
                            className="font-mono text-sm"
                            placeholder="Edit JSON content..."
                          />
                        </div>
                      )}

                      <div className="flex gap-2">
                        <Button onClick={handleSaveSection} className="flex-1">
                          Save Changes
                        </Button>
                        <Button variant="outline" onClick={() => setEditingSection(null)}>
                          Cancel
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Page Views</CardTitle>
                  <Eye className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analytics.pageViews}</div>
                  <p className="text-xs text-muted-foreground">All time visits</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analytics.bookings}</div>
                  <p className="text-xs text-muted-foreground">Session requests</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">User Signups</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analytics.signups}</div>
                  <p className="text-xs text-muted-foreground">Registered users</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Top Pages</CardTitle>
                <CardDescription>Most visited pages on your website</CardDescription>
              </CardHeader>
              <CardContent>
                {analytics.topPages.length === 0 ? (
                  <p className="text-muted-foreground text-center py-4">No analytics data yet</p>
                ) : (
                  <div className="space-y-2">
                    {analytics.topPages.map((page: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{page.path}</span>
                        </div>
                        <Badge variant="secondary">{page.count} views</Badge>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
