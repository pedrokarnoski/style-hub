import Image from 'next/image'
import Link from 'next/link'
import Stripe from 'stripe'

import { Header } from '@/components/header'
import BlurFade from '@/components/ui/blur-fade'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import Particles from '@/components/ui/particles'
import { RainbowButton } from '@/components/ui/rainbow-button'
import { stripe } from '@/lib/stripe'

export const revalidate = 60 * 60 * 24 // 1 dia

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
      <Header showBag />

      <Particles
        className="absolute inset-0"
        quantity={100}
        ease={80}
        color="#fff"
        refresh
      />

      <div className="flex min-h-screen flex-col items-center justify-center">
        <Carousel className="z-10 select-none">
          <CarouselContent>
            {products.map((product, idx) => (
              <CarouselItem
                key={product.id}
                className="md:basis-1/2 lg:basis-1/3"
              >
                <BlurFade
                  className="flex flex-col items-center justify-center"
                  delay={0.25 + idx * 0.05}
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={520}
                    height={480}
                    className="object-cover"
                  />

                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p className="text-xl font-semibold text-primary">
                    {product.price}
                  </p>

                  <div className="mt-8">
                    <RainbowButton>
                      <Link href={`/product/${product.id}`} prefetch={false}>
                        Ver mais
                      </Link>
                    </RainbowButton>
                  </div>
                </BlurFade>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </>
  )
}
