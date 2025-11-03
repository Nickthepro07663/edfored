import paypalCheckoutServerSDK from "@paypal/checkout-server-sdk"

const clientId = process.env.PAYPAL_CLIENT_ID!
const clientSecret = process.env.PAYPAL_CLIENT_SECRET!

const environment = new paypalCheckoutServerSDK.core.SandboxEnvironment(clientId, clientSecret)
const client = new paypalCheckoutServerSDK.core.PayPalHttpClient(environment)

export { client }
