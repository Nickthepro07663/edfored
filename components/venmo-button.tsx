"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Check } from "lucide-react"
import { generateVenmoPaymentLink } from "@/lib/venmo"

interface VenmoButtonProps {
  amount: number
  bookingId: string
  onSuccess?: () => void
}

export default function VenmoButton({ amount, bookingId, onSuccess }: VenmoButtonProps) {
  const [isPaid, setIsPaid] = useState(false)
  const [showInstructions, setShowInstructions] = useState(false)

  const handleOpenVenmo = () => {
    const venmoLink = generateVenmoPaymentLink(amount, bookingId)
    window.open(venmoLink, "_blank")
    setShowInstructions(true)
  }

  const handleConfirmPayment = () => {
    setIsPaid(true)
    if (onSuccess) {
      onSuccess()
    }
  }

  if (isPaid) {
    return (
      <Card className="border-green-200 bg-green-50">
        <CardContent className="pt-6 flex items-center gap-3">
          <Check className="h-5 w-5 text-green-600" />
          <div>
            <p className="font-semibold text-green-900">Payment Confirmed</p>
            <p className="text-sm text-green-700">Your Venmo payment has been received</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <Button
        onClick={handleOpenVenmo}
        size="lg"
        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
      >
        Pay with Venmo
      </Button>

      {showInstructions && (
        <Card className="border-amber-200 bg-amber-50">
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2 text-amber-900">
              <AlertCircle className="h-4 w-4" />
              Payment Instructions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p className="text-amber-800">
              1. Send ${(amount / 100).toFixed(2)} to <strong>@edfored</strong> on Venmo
            </p>
            <p className="text-amber-800">2. Include your booking reference in the note</p>
            <p className="text-amber-800">3. Confirm payment below once sent</p>
            <Button
              onClick={handleConfirmPayment}
              variant="outline"
              className="w-full border-amber-300 hover:bg-amber-100 bg-transparent"
            >
              I've Sent the Payment
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
