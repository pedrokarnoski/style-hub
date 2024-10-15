import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { Stripe } from 'stripe'

import { Confetti } from '@/components/confetti'
import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
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
      title: 'Compra efetuada | StyleHub',
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

  const productNames = checkoutSession.line_items?.data
    .map((item) => item.price.product.name)
    .join(', ')

  return {
    title: `Compra de ${productNames} | StyleHub`,
    description: `Você comprou ${productNames}. Seu(s) produto(s) chegarão em breve.`,
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

  return (
    <>
      <Header showBag={false} />
      <Particles
        className="absolute inset-0"
        quantity={100}
        ease={80}
        color="#fff"
        refresh
      />
      <Confetti />
      <div className="flex min-h-screen flex-col items-center justify-center px-10 text-center lg:px-20">
        <div className="flex flex-col items-center space-y-8 md:space-y-16">
          <h1 className="text-2xl font-semibold text-primary md:text-4xl">
            Compra efetuada!
          </h1>
          <div className="flex w-full max-w-6xl flex-col items-center lg:flex-row lg:items-start">
            {checkoutSession.line_items?.data.map((item, index) => (
              <Card
                key={item.id}
                className={`z-10 cursor-pointer flex-col items-center justify-center whitespace-nowrap rounded-full bg-gradient-to-bl from-zinc-900 to-zinc-950 shadow-2xl ${
                  index > 0 ? 'relative -mt-16 md:-ml-28 md:mt-0' : ''
                }`}
              >
                {item.price && item.price.product && (
                  <Image
                    src={item.price.product.images[0]}
                    alt={item.price.product.name}
                    className="h-[150px] w-[150px] md:h-[450px] md:w-[450px]"
                    width={520} // largura padrão
                    height={480} // altura padrão
                    sizes="(max-width: 640px) 150px, (min-width: 641px) 450px" // Definindo tamanhos responsivos
                  />
                )}
              </Card>
            ))}
          </div>
          {checkoutSession.customer_details ? (
            <div className="text-xl">
              <p>
                Uhuuul <strong>{checkoutSession.customer_details.name}</strong>,
                sua compra chegará em breve! 🚀
              </p>
              <p>Obrigado por comprar com a gente!</p>
            </div>
          ) : (
            <p>Erro: Detalhes do cliente não encontrados.</p>
          )}
          <Button variant="link" asChild>
            <Link href="/">Voltar ao catálogo</Link>
          </Button>
        </div>
      </div>
    </>
  )
}
