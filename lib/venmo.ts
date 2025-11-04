export const VENMO_CONFIG = {
  username: process.env.NEXT_PUBLIC_VENMO_USERNAME || "edfored",
  phoneNumber: process.env.VENMO_PHONE || "+1234567890", // Add to env vars
}

export function generateVenmoPaymentLink(amount: number, bookingId: string): string {
  const venmoUsername = VENMO_CONFIG.username
  const amountInDollars = (amount / 100).toFixed(2)
  const note = `Tutoring Session - Booking ${bookingId.slice(0, 8)}`

  return `https://venmo.com/?txn=pay&recipients=${venmoUsername}&amount=${amountInDollars}&note=${encodeURIComponent(note)}`
}
