"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, GraduationCap, LogOut } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  const [user, setUser] = useState<any>(null)
  const [userRole, setUserRole] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for authenticated user
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)

      if (user) {
        // Check if admin/owner from localStorage
        const adminSession = localStorage.getItem("adminSession")
        if (adminSession) {
          const session = JSON.parse(adminSession)
          setUserRole(session.role)
        } else {
          // Regular user
          setUserRole("user")
        }
      }
      setIsLoading(false)
    }

    checkUser()

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (!session?.user) {
        setUserRole(null)
        localStorage.removeItem("adminSession")
      }
    })

    return () => subscription.unsubscribe()
  }, [supabase])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    localStorage.removeItem("adminSession")
    sessionStorage.removeItem("admin_active")
    setUser(null)
    setUserRole(null)
    router.push("/")
  }

  const getDashboardLink = () => {
    if (userRole === "owner") return "/owner"
    if (userRole === "admin") return "/admin"
    return "/dashboard"
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">EDforED</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className={`transition-colors ${pathname === "/" ? "text-primary font-semibold" : "text-foreground hover:text-primary"}`}
            >
              Home
            </Link>
            <Link
              href="/services"
              className={`transition-colors ${pathname === "/services" ? "text-primary font-semibold" : "text-foreground hover:text-primary"}`}
            >
              Services & Pricing
            </Link>
            <Link
              href="/about"
              className={`transition-colors ${pathname === "/about" ? "text-primary font-semibold" : "text-foreground hover:text-primary"}`}
            >
              About & Tutors
            </Link>
            <Link
              href="/faq"
              className={`transition-colors ${pathname === "/faq" ? "text-primary font-semibold" : "text-foreground hover:text-primary"}`}
            >
              FAQ
            </Link>
            <Link
              href="/contact"
              className={`transition-colors ${pathname === "/contact" ? "text-primary font-semibold" : "text-foreground hover:text-primary"}`}
            >
              Contact
            </Link>
            {!isLoading &&
              (user ? (
                <>
                  <Link
                    href={getDashboardLink()}
                    className={`transition-colors ${pathname === getDashboardLink() ? "text-primary font-semibold" : "text-foreground hover:text-primary"}`}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-foreground hover:text-primary transition-colors flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  href="/auth/login"
                  className={`transition-colors ${pathname === "/auth/login" ? "text-primary font-semibold" : "text-foreground hover:text-primary"}`}
                >
                  Login
                </Link>
              ))}
          </nav>

          <div className="hidden md:block">
            <Link href="/booking">
              <Button size="lg">Book a Session</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 flex flex-col gap-4">
            <Link href="/" className="text-left text-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/services" className="text-left text-foreground hover:text-primary transition-colors">
              Services & Pricing
            </Link>
            <Link href="/about" className="text-left text-foreground hover:text-primary transition-colors">
              About & Tutors
            </Link>
            <Link href="/faq" className="text-left text-foreground hover:text-primary transition-colors">
              FAQ
            </Link>
            <Link href="/contact" className="text-left text-foreground hover:text-primary transition-colors">
              Contact
            </Link>
            {!isLoading &&
              (user ? (
                <>
                  <Link
                    href={getDashboardLink()}
                    className="text-left text-foreground hover:text-primary transition-colors"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-left text-foreground hover:text-primary transition-colors flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </>
              ) : (
                <Link href="/auth/login" className="text-left text-foreground hover:text-primary transition-colors">
                  Login
                </Link>
              ))}
            <Link href="/booking">
              <Button className="w-full">Book a Session</Button>
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}
