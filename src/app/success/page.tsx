import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { Stripe } from 'stripe'

import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import { stripe } from '@/lib/stripe'

interface SuccessPageProps {
  searchParams: {
    session_id: string
  }
}

export async function generateMetadata({
  searchParams,
}: SuccessPageProps): Promise<Metadata> {
  const sessionId = searchParams.session_id

  if (!sessionId) {
    return {
      title: 'Compra Efetuada | StyleHub',
      description: 'Compra realizada com sucesso na StyleHub.',
      robots: {
        index: false,
        follow: false,
      },
    }
  }

  const checkoutSession: Stripe.Checkout.Session =
    await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items.data.price.product'],
    })

  const product = checkoutSession.line_items?.data[0].price
    ?.product as Stripe.Product

  return {
    title: `Compra de ${product.name} | StyleHub`,
    description: `Você comprou ${product.name}. Seu produto chegará em breve.`,
    robots: {
      index: false,
      follow: false,
    },
  }
}

export default async function Success({ searchParams }: SuccessPageProps) {
  const sessionId = searchParams.session_id

  if (!sessionId) {
    redirect('/')
  }

  const checkoutSession: Stripe.Checkout.Session =
    await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items.data.price.product'],
    })

  const product = checkoutSession.line_items?.data[0].price
    ?.product as Stripe.Product

  return (
    <>
      <Header />

      <div className="flex min-h-screen flex-col items-center justify-center px-14 text-center lg:px-20">
        <h1 className="p-4 text-xl font-semibold text-primary">
          Compra efetuada
        </h1>

        <div className="flex flex-col items-center">
          {checkoutSession.customer_details ? (
            <div>
              <p>
                Uhuuul <strong>{checkoutSession.customer_details.name}</strong>,
                sua <strong>{product.name}</strong> chegará em breve. 🚀
              </p>
              <p>Obrigado por comprar com a gente!</p>
            </div>
          ) : (
            <p>Erro: Detalhes do cliente não encontrados.</p>
          )}

          <div className="relative my-8 h-56 w-56 rounded-lg bg-gradient-to-b from-zinc-900 to-zinc-950 md:h-96 md:w-96">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="rounded-lg object-cover"
            />
          </div>

          <Button asChild>
            <Link href="/">Voltar ao catálogo</Link>
          </Button>
        </div>
      </div>
    </>
  )
}
