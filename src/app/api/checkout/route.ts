import { stripe } from '@/lib/stripe'

export async function POST(request: Request) {
  const { priceId } = await request.json()

  const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`
  const cancelUrl = `${process.env.NEXT_URL}/`

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: successUrl,
    cancel_url: cancelUrl,
    mode: 'payment',
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
  })

  return Response.json({
    checkoutUrl: checkoutSession.url,
  })
}
