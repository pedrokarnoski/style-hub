'use client'

import { Shirt, ShoppingBasket } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

import { BuyProduct } from '@/components/buy-product'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

// Simulando itens do carrinho
const cartItems = [
  { id: 'price_1', name: 'T-Shirt', price: 19.99 },
  { id: 'price_2', name: 'Hoodie', price: 39.99 },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const handleCheckout = async () => {
    // Enviar a requisição para criar uma sessão de checkout
    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        priceId: cartItems.map((item) => item.id), // Enviando todos os IDs de preços
      }),
    })

    const { checkoutUrl } = await response.json()

    // Redirecionar para a URL do checkout
    window.location.href = checkoutUrl
  }

  return (
    <div className="absolute z-20 w-full border-b bg-background lg:px-40">
      <div className="flex h-16 items-center justify-between gap-6 px-6">
        <Link href="/">
          <div className="flex items-center gap-3 font-semibold text-foreground">
            <Shirt className="h-5 w-5 text-muted-foreground" />
            <span className="flex flex-row text-xl tracking-wide text-primary">
              Style<p className="text-muted-foreground">Hub</p>
            </span>
          </div>
        </Link>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button size="icon">
              <ShoppingBasket className="size-6" />
            </Button>
          </SheetTrigger>

          <SheetContent className="flex h-full flex-col justify-between py-10">
            <SheetHeader>
              <SheetTitle>Sacola de compras</SheetTitle>
              <SheetDescription>
                Aqui estão os itens que você adicionou a sua sacola.
              </SheetDescription>
            </SheetHeader>

            <div className="flex-grow">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between py-2"
                >
                  <span>{item.name}</span>
                  <span>${item.price.toFixed(2)}</span>
                </div>
              ))}
              <Separator className="my-4" />
            </div>

            <BuyProduct className="w-full" onClick={handleCheckout}>
              Finalizar compra
            </BuyProduct>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}
