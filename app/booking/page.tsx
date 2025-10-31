import type { Metadata } from "next"
import BookingClientPage from "./_components/booking-client-page"

export const metadata: Metadata = {
  title: "Book a Session - Edfored",
  description: "Schedule your personalized tutoring session. Choose from flexible packages and secure payment options.",
}

export default function BookingPage() {
  return <BookingClientPage />
}
