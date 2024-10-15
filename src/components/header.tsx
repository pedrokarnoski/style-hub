'use client'

import { Shirt, ShoppingBasket, Trash } from 'lucide-react'
import Image from 'next/image'
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
import { useCart } from '@/context/cart-context'

import { Card } from './ui/card'

export function Header() {
  const { cartItems, removeFromCart } = useCart()
  const [isOpen, setIsOpen] = useState(false)

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

            <div className="flex-grow space-y-3">
              {cartItems.length === 0 ? (
                <p className="text-center text-muted-foreground">
                  Seu carrinho está vazio.
                </p>
              ) : (
                cartItems.map((item) => (
                  <Card
                    key={item.id}
                    className="flex items-start justify-between"
                  >
                    <div className="flex items-center gap-4 py-1">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={100}
                        height={60}
                      />

                      <div className="flex flex-col">
                        <span className="font-medium">{item.name}</span>
                        <strong className="text-lg text-primary">
                          {item.price}
                        </strong>
                        <span className="text-sm text-muted-foreground">
                          Quantidade: {item.quantity}
                        </span>
                      </div>
                    </div>

                    <div className="p-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 self-end text-red-400"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash className="h-5 w-5" />
                      </Button>
                    </div>
                  </Card>
                ))
              )}
            </div>

            <Separator className="my-4" />
            <BuyProduct className="w-full">Finalizar compra</BuyProduct>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}
