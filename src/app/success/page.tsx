import { Metadata } from 'next'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import { Stripe } from 'stripe'

import { ClearCart } from '@/components/clear-cart'
import { Confetti } from '@/components/confetti'
import { Header } from '@/components/header'
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
    .map((item) => {
      const product = item.price?.product
      return typeof product === 'object' && 'name' in product
        ? product.name
        : 'Produto desconhecido'
    })
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

          <div className="flex w-full max-w-6xl flex-col items-center px-10 lg:flex-row lg:flex-wrap lg:items-start">
            {checkoutSession.line_items?.data.length === 1 ? (
              <div className="flex flex-col items-center">
                <Card
                  key={checkoutSession.line_items.data[0].id}
                  className="z-10 cursor-pointer flex-col items-center justify-center rounded-full bg-gradient-to-bl from-zinc-900 to-zinc-950 shadow-2xl"
                >
                  {checkoutSession.line_items.data[0].price &&
                    checkoutSession.line_items.data[0].price.product && (
                      <Image
                        src={
                          typeof checkoutSession.line_items.data[0].price
                            .product === 'object' &&
                          'images' in
                            checkoutSession.line_items.data[0].price.product
                            ? checkoutSession.line_items.data[0].price.product
                                .images[0]
                            : ''
                        }
                        alt={
                          typeof checkoutSession.line_items.data[0].price
                            .product === 'object' &&
                          'name' in
                            checkoutSession.line_items.data[0].price.product
                            ? checkoutSession.line_items.data[0].price.product
                                .name
                            : 'Produto desconhecido'
                        }
                        className="h-[160px] w-[160px] md:h-[360px] md:w-[360px]"
                        width={520}
                        height={480}
                      />
                    )}
                </Card>
              </div>
            ) : (
              <div className="flex flex-row flex-wrap items-center justify-center">
                {checkoutSession.line_items?.data?.map((item, index) => (
                  <Card
                    key={item.id}
                    className={`z-10 cursor-pointer flex-col items-center justify-center whitespace-nowrap rounded-full bg-gradient-to-bl from-zinc-900 to-zinc-950 shadow-2xl ${
                      index > 0 ? 'relative -mt-16 md:-ml-28 md:mt-0' : ''
                    }`}
                  >
                    {item.price && item.price.product && (
                      <Image
                        src={
                          typeof item.price.product === 'object' &&
                          'images' in item.price.product
                            ? item.price.product.images[0]
                            : ''
                        }
                        alt={
                          typeof item.price.product === 'object' &&
                          'name' in item.price.product
                            ? item.price.product.name
                            : 'Produto desconhecido'
                        }
                        className="h-[160px] w-[160px] md:h-[360px] md:w-[360px]"
                        width={520}
                        height={480}
                      />
                    )}
                  </Card>
                ))}
              </div>
            )}
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

          <ClearCart />
        </div>
      </div>
    </>
  )
}
