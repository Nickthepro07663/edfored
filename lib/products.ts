export interface TutoringSession {
  id: string
  name: string
  description: string
  priceInCents: number
  duration: string
}

// Tutoring session pricing
export const TUTORING_SESSIONS: TutoringSession[] = [
  {
    id: "single-session-1hr",
    name: "1 Hour Tutoring Session",
    description: "One-on-one tutoring session with an expert tutor",
    priceInCents: 5000, // $50.00
    duration: "1 hour",
  },
  {
    id: "package-5-sessions",
    name: "5 Session Package",
    description: "Five 1-hour tutoring sessions (Save 10%)",
    priceInCents: 22500, // $225.00 (was $250)
    duration: "5 hours",
  },
  {
    id: "package-10-sessions",
    name: "10 Session Package",
    description: "Ten 1-hour tutoring sessions (Save 20%)",
    priceInCents: 40000, // $400.00 (was $500)
    duration: "10 hours",
  },
]
