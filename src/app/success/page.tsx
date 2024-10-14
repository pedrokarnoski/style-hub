import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { Stripe } from 'stripe'

import { Confetti } from '@/components/confetti'
import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import { MagicCard } from '@/components/ui/magic-card'
import Particles from '@/components/ui/particles'
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

      <Particles
        className="absolute inset-0"
        quantity={100}
        ease={80}
        color="#fff"
        refresh
      />

      <Confetti />

      <div className="flex min-h-screen flex-col items-center justify-center px-14 text-center lg:px-20">
        <h1 className="p-4 text-xl font-semibold text-primary">
          Compra efetuada
        </h1>

        <div className="flex flex-col items-center space-y-8">
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

          <div className="flex w-full max-w-6xl flex-col items-center lg:flex-row lg:items-start">
            <MagicCard
              className="cursor-pointer flex-col items-center justify-center whitespace-nowrap bg-gradient-to-bl from-zinc-900 to-zinc-950 text-4xl shadow-2xl"
              gradientColor="#262626"
            >
              <Image
                src={product.images[0]}
                alt={product.name}
                width={520}
                height={480}
              />
            </MagicCard>
          </div>

          <Button size="lg" asChild>
            <Link href="/">Voltar ao catálogo</Link>
          </Button>
        </div>
      </div>
    </>
  )
}
