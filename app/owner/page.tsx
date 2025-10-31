"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users, Shield, LogOut, Loader2, UserPlus } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface Profile {
  id: string
  email: string
  full_name: string | null
  phone: string | null
  role: string
  created_at: string
}

export default function OwnerDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newUserEmail, setNewUserEmail] = useState("")
  const [newUserPassword, setNewUserPassword] = useState("")
  const [newUserName, setNewUserName] = useState("")
  const [newUserRole, setNewUserRole] = useState("user")
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const adminSession = localStorage.getItem("admin_session")
    const adminRole = localStorage.getItem("admin_role")
    if (adminSession !== "true" || adminRole !== "owner") {
      router.push("/auth/admin-login")
      return
    }
    setIsAuthenticated(true)
    fetchProfiles()
  }, [router])

  const fetchProfiles = async () => {
    setIsLoading(true)
    const { data, error } = await supabase.from("profiles").select("*").order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching profiles:", error)
    } else {
      setProfiles(data || [])
    }
    setIsLoading(false)
  }

  const handleRoleChange = async (userId: string, newRole: string) => {
    const { error } = await supabase.from("profiles").update({ role: newRole }).eq("id", userId)

    if (error) {
      console.error("Error updating role:", error)
      alert("Failed to update role. Please try again.")
    } else {
      setProfiles(profiles.map((p) => (p.id === userId ? { ...p, role: newRole } : p)))
    }
  }

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      // Create user account using Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: newUserEmail,
        password: newUserPassword,
        options: {
          data: {
            full_name: newUserName,
          },
        },
      })

      if (authError) {
        alert(`Failed to create user: ${authError.message}`)
        return
      }

      if (authData.user) {
        // Create profile with specified role
        const { error: profileError } = await supabase.from("profiles").insert({
          id: authData.user.id,
          email: newUserEmail,
          full_name: newUserName,
          role: newUserRole,
        })

        if (profileError) {
          console.error("Error creating profile:", profileError)
          alert("User created but profile setup failed. Please try again.")
        } else {
          alert("User created successfully!")
          setIsCreateDialogOpen(false)
          setNewUserEmail("")
          setNewUserPassword("")
          setNewUserName("")
          setNewUserRole("user")
          fetchProfiles()
        }
      }
    } catch (error) {
      console.error("Error creating user:", error)
      alert("An error occurred while creating the user.")
    }
  }

  const handleSignOut = () => {
    localStorage.removeItem("admin_session")
    localStorage.removeItem("admin_role")
    router.push("/auth/admin-login")
  }

  const handleViewBookings = () => {
    router.push("/admin")
  }

  if (!isAuthenticated) {
    return null
  }

  const totalUsers = profiles.length
  const adminUsers = profiles.filter((p) => p.role === "admin").length
  const regularUsers = profiles.filter((p) => p.role === "user").length

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-blue-600">Edfored Owner</h1>
            <p className="text-sm text-gray-600">Owner Dashboard - Full Access</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleViewBookings}>
              View Bookings
            </Button>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">User Management</h2>
          <p className="text-gray-600">Manage all users, roles, and permissions</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalUsers}</div>
              <p className="text-xs text-gray-600">All registered users</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Admin Users</CardTitle>
              <Shield className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{adminUsers}</div>
              <p className="text-xs text-gray-600">Users with admin access</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Regular Users</CardTitle>
              <Users className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{regularUsers}</div>
              <p className="text-xs text-gray-600">Standard user accounts</p>
            </CardContent>
          </Card>
        </div>

        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-2xl font-bold">All Users</h3>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="h-4 w-4 mr-2" />
                Create User
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New User</DialogTitle>
                <DialogDescription>Add a new user account with specific role and permissions</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCreateUser} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={newUserName}
                    onChange={(e) => setNewUserName(e.target.value)}
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newUserEmail}
                    onChange={(e) => setNewUserEmail(e.target.value)}
                    placeholder="user@example.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={newUserPassword}
                    onChange={(e) => setNewUserPassword(e.target.value)}
                    placeholder="Minimum 6 characters"
                    required
                    minLength={6}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select value={newUserRole} onValueChange={setNewUserRole}>
                    <SelectTrigger id="role">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit" className="w-full">
                  Create User
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          </div>
        ) : (
          <div className="grid gap-4">
            {profiles.length > 0 ? (
              profiles.map((profile) => (
                <Card key={profile.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>{profile.full_name || "No name"}</CardTitle>
                        <CardDescription>
                          {profile.email} {profile.phone && `• ${profile.phone}`}
                        </CardDescription>
                      </div>
                      <Badge
                        variant={
                          profile.role === "owner" ? "default" : profile.role === "admin" ? "secondary" : "outline"
                        }
                        className={
                          profile.role === "owner" ? "bg-purple-600" : profile.role === "admin" ? "bg-blue-600" : ""
                        }
                      >
                        {profile.role}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600">
                        Joined: {new Date(profile.created_at).toLocaleDateString()}
                      </div>
                      {profile.role !== "owner" && (
                        <div className="flex items-center gap-2">
                          <Label htmlFor={`role-${profile.id}`} className="text-sm">
                            Change Role:
                          </Label>
                          <Select value={profile.role} onValueChange={(value) => handleRoleChange(profile.id, value)}>
                            <SelectTrigger id={`role-${profile.id}`} className="w-[140px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="user">User</SelectItem>
                              <SelectItem value="admin">Admin</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <Users className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-lg font-semibold mb-2">No users yet</h3>
                  <p className="text-gray-600">Create your first user account to get started.</p>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
