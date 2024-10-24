import { Metadata } from 'next'
import Image from 'next/image'
import Stripe from 'stripe'

import { AddToCart } from '@/components/add-to-cart'
import { Header } from '@/components/header'
import { MagicCard } from '@/components/ui/magic-card'
import Particles from '@/components/ui/particles'
import { Separator } from '@/components/ui/separator'
import { getStripeInstance } from '@/lib/stripe'

export async function generateMetadata({
  params,
}: {
  params: { id: string }
}): Promise<Metadata> {
  const stripe = getStripeInstance()

  const response = await stripe.products.retrieve(params.id)
  const productName = response.name

  return {
    title: `${productName} | StyleHub`,
    description: `Compre ${productName} na StyleHub!`,
  }
}

export default async function Product({ params }: { params: { id: string } }) {
  const stripe = getStripeInstance()

  const response = await stripe.products.retrieve(params.id, {
    expand: ['default_price', 'prices'],
  })

  const prices = await stripe.prices.list({
    product: params.id,
    expand: ['data.product'],
  })

  const priceBySize = prices.data.reduce(
    (acc: Record<string, Stripe.Price>, price) => {
      const size = price.nickname?.toLowerCase()
      if (size) {
        acc[size] = price
      }
      return acc
    },
    {},
  )

  const defaultPrice = response.default_price as Stripe.Price

  const product = {
    id: response.id,
    name: response.name,
    description: response.description,
    image: response.images[0],
    defaultPrice: new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format((defaultPrice.unit_amount ?? 0) / 100),
    priceBySize,
    defaultPriceId: defaultPrice.id,
    size: '',
    quantity: 1,
  }

  return (
    <>
      <Header showBag />

      <Particles
        className="absolute inset-0"
        quantity={100}
        ease={80}
        color="#fff"
        refresh
      />

      <div className="flex min-h-screen flex-col items-center justify-center px-8 py-20">
        <div className="flex w-full max-w-6xl flex-col items-center gap-6 sm:gap-16 lg:flex-row lg:items-start">
          <MagicCard
            className="cursor-pointer flex-col items-center justify-center whitespace-nowrap bg-gradient-to-bl from-zinc-900 to-zinc-950 text-4xl shadow-2xl"
            gradientColor="#262626"
          >
            <Image
              src={product.image}
              alt={product.name}
              width={520}
              height={480}
            />
          </MagicCard>

          <div className="w-full space-y-4">
            <div className="flex h-full w-full flex-col justify-between">
              <div className="space-y-4">
                <h1 className="text-2xl font-bold">{product.name}</h1>
                <p className="text-muted-foreground">{product.description}</p>
              </div>
            </div>

            <Separator />

            <AddToCart product={product} />
          </div>
        </div>
      </div>
    </>
  )
}
