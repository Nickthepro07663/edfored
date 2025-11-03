"use server"

import { client } from "@/lib/paypal"
import paypalCheckoutServerSDK from "@paypal/checkout-server-sdk"
import { createClient as createServerClient } from "@/lib/supabase/server"

export async function createPayPalOrder(amount: string, bookingId: string) {
  const request = new paypalCheckoutServerSDK.orders.OrdersCreateRequest()

  request.prefer("return=representation")
  request.body = {
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "USD",
          value: amount,
        },
        reference_id: bookingId,
      },
    ],
    application_context: {
      brand_name: "Edfored Tutoring",
      user_action: "PAY_NOW",
    },
  }

  try {
    const response = await client.execute(request)
    return { id: response.result.id }
  } catch (error) {
    console.error("PayPal Error:", error)
    throw error
  }
}

export async function capturePayPalOrder(orderId: string, bookingId: string) {
  const request = new paypalCheckoutServerSDK.orders.OrdersCaptureRequest(orderId)
  request.requestBody({})

  try {
    const response = await client.execute(request)

    // Update booking as paid in Supabase
    const supabase = await createServerClient()
    const { error } = await supabase.from("bookings").update({ is_paid: true }).eq("id", bookingId)

    if (error) throw error

    return { success: true, orderId: response.result.id }
  } catch (error) {
    console.error("PayPal Capture Error:", error)
    throw error
  }
}
