import Stripe from 'stripe'

let stripe: Stripe | null = null

export const getStripeInstance = () => {
  if (!stripe) {
    stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2024-09-30.acacia',
      appInfo: {
        name: 'StyleHub',
      },
    })
  }

  return stripe
}
