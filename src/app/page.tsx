import Image from 'next/image'
import Link from 'next/link'
import Stripe from 'stripe'

import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { stripe } from '@/lib/stripe'

export const revalidate = 60 * 60 * 2 // 2h

export default async function Home() {
  const response = await stripe.products.list({
    expand: ['data.default_price'],
  })

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      description: product.description,
      image: product.images[0],
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format((price.unit_amount ?? 0) / 100),
    }
  })

  return (
    <>
      <Header />

      <div className="flex min-h-screen flex-col items-center justify-center px-14 lg:px-20">
        <Carousel className="select-none">
          <CarouselContent>
            {products.map((product) => (
              <CarouselItem
                key={product.id}
                className="group relative flex select-none flex-col items-center justify-center md:basis-1/2 lg:basis-1/3"
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  width={520}
                  height={480}
                />

                <div className="absolute inset-0 flex flex-col items-center justify-center rounded-lg bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <h3 className="text-lg font-semibold text-white">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-300">{product.description}</p>
                  <p className="text-lg font-semibold text-primary">
                    {product.price}
                  </p>
                  <Button className="mt-4" asChild>
                    <Link
                      href={`/product/${product.id}`}
                      key={product.id}
                      prefetch={false}
                    >
                      Ver mais
                    </Link>
                  </Button>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </>
  )
}
