"use client"

import { useEffect, useRef, useState } from "react"
import { createPayPalOrder, capturePayPalOrder } from "@/app/actions/paypal"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "paypal-buttons": any
    }
  }
}

interface PayPalButtonProps {
  amount: string
  bookingId: string
  onSuccess: () => void
}

export default function PayPalButton({ amount, bookingId, onSuccess }: PayPalButtonProps) {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const paypalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const script = document.createElement("script")
    script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}`
    script.async = true
    script.onload = () => {
      ;(window as any).paypal
        .Buttons({
          createOrder: async () => {
            try {
              const response = await createPayPalOrder(amount, bookingId)
              return response.id
            } catch (error) {
              toast({
                title: "Error",
                description: "Failed to create payment order",
                variant: "destructive",
              })
              throw error
            }
          },
          onApprove: async (data: any) => {
            try {
              await capturePayPalOrder(data.orderID, bookingId)
              toast({
                title: "Success",
                description: "Payment completed successfully!",
              })
              onSuccess()
            } catch (error) {
              toast({
                title: "Error",
                description: "Failed to complete payment",
                variant: "destructive",
              })
            }
          },
          onError: () => {
            toast({
              title: "Error",
              description: "Payment failed",
              variant: "destructive",
            })
          },
        })
        .render(paypalRef.current)
      setIsLoading(false)
    }
    document.head.appendChild(script)

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script)
      }
    }
  }, [amount, bookingId, onSuccess, toast])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    )
  }

  return <div ref={paypalRef} />
}
