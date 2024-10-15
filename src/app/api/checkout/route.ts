import { stripe } from '@/lib/stripe'

export async function POST(request: Request) {
  const { lineItems } = await request.json()

  const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`
  const cancelUrl = `${process.env.NEXT_URL}/`

  try {
    const checkoutSession = await stripe.checkout.sessions.create({
      success_url: successUrl,
      cancel_url: cancelUrl,
      mode: 'payment',
      line_items: lineItems,
    })

    return Response.json({
      checkoutUrl: checkoutSession.url,
    })
  } catch (error) {
    console.error('Erro ao criar sessão de checkout:', error)
    return new Response('Erro ao criar sessão de checkout', { status: 500 })
  }
}
