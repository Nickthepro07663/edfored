"use server"

import { stripe } from "@/lib/stripe"
import { TUTORING_SESSIONS } from "@/lib/products"

export async function startCheckoutSession(sessionId: string, bookingId: string) {
  const session = TUTORING_SESSIONS.find((s) => s.id === sessionId)
  if (!session) {
    throw new Error(`Session with id "${sessionId}" not found`)
  }

  // Create Checkout Sessions
  const checkoutSession = await stripe.checkout.sessions.create({
    ui_mode: "embedded",
    redirect_on_completion: "never",
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: session.name,
            description: session.description,
          },
          unit_amount: session.priceInCents,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    metadata: {
      bookingId: bookingId,
    },
  })

  return checkoutSession.client_secret
}
