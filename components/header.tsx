"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, GraduationCap } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">Edfored</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
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
              Services
            </Link>
            <Link
              href="/about"
              className={`transition-colors ${pathname === "/about" ? "text-primary font-semibold" : "text-foreground hover:text-primary"}`}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={`transition-colors ${pathname === "/contact" ? "text-primary font-semibold" : "text-foreground hover:text-primary"}`}
            >
              Contact
            </Link>
            <Link
              href="/auth/login"
              className={`transition-colors ${pathname === "/auth/login" ? "text-primary font-semibold" : "text-foreground hover:text-primary"}`}
            >
              Login
            </Link>
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
              Services
            </Link>
            <Link href="/about" className="text-left text-foreground hover:text-primary transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-left text-foreground hover:text-primary transition-colors">
              Contact
            </Link>
            <Link href="/auth/login" className="text-left text-foreground hover:text-primary transition-colors">
              Login
            </Link>
            <Link href="/booking">
              <Button className="w-full">Book a Session</Button>
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}
