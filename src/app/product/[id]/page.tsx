import Image from 'next/image'
import Stripe from 'stripe'

import { BuyProduct } from '@/components/buy-product'
import { Header } from '@/components/header'
import { stripe } from '@/lib/stripe'

export default async function Product({ params }: { params: { id: string } }) {
  const response = await stripe.products.retrieve(params.id, {
    expand: ['default_price'],
  })

  const price = response.default_price as Stripe.Price

  const product = {
    id: response.id,
    name: response.name,
    description: response.description,
    image: response.images[0],
    price: new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format((price.unit_amount ?? 0) / 100),
    defaultPriceId: price.id,
  }

  return (
    <>
      <Header />

      <div className="flex min-h-screen flex-col items-center justify-center p-8 lg:p-20">
        <div className="flex w-full max-w-5xl flex-col items-center gap-12 lg:flex-row lg:items-start">
          <div className="flex w-full justify-center lg:w-1/2">
            <div className="relative h-96 w-96 rounded-lg bg-gradient-to-b from-gray-600 to-gray-800">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="rounded-lg object-contain"
              />
            </div>
          </div>

          <div className="flex h-full w-full flex-col justify-between lg:w-1/2">
            <div>
              <h1 className="mb-4 text-3xl font-bold">{product.name}</h1>
              <p className="mb-6 text-lg">{product.description}</p>
              <p className="mb-6 text-2xl font-semibold text-primary">
                {product.price}
              </p>
            </div>

            <BuyProduct defaultPriceId={product.defaultPriceId} />
          </div>
        </div>
      </div>
    </>
  )
}
