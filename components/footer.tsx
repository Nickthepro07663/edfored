import { GraduationCap, Instagram, Youtube, Mail, Phone } from "lucide-react"
import { SiTiktok } from "react-icons/si"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center">
                <GraduationCap className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold">EDforED</span>
            </Link>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              High School Tutors for K-8 Students. Building confidence, strengthening character, and making school
              enjoyable again.
            </p>
            <div className="mt-4 space-y-2 text-sm text-primary-foreground/80">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <a href="mailto:edfored2025@gmail.com" className="hover:text-primary-foreground transition-colors">
                  edfored2025@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <a href="tel:+15515023368" className="hover:text-primary-foreground transition-colors">
                  (551) 502-3368
                </a>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Services & Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  About & Tutors
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Get Started</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/booking"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Book a Session
                </Link>
              </li>
              <li>
                <Link
                  href="/auth/login"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Student Login
                </Link>
              </li>
              <li>
                <Link
                  href="/auth/sign-up"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Create Account
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Connect With Us</h3>
            <p className="text-primary-foreground/80 text-sm mb-4">Follow us on social media for updates and tips.</p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
                aria-label="TikTok"
              >
                <SiTiktok className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 text-center text-sm text-primary-foreground/80">
          <p>&copy; {new Date().getFullYear()} EDforED Tutoring. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
