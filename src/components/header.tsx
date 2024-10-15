'use client'

import { Shirt, ShoppingBasket, Trash } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useState } from 'react'

import { BuyProduct } from '@/components/buy-product'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
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

export function Header() {
  const { cartItems, removeFromCart } = useCart()
  const [isOpen, setIsOpen] = useState(false)

  const totalItems = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0)
  }, [cartItems])

  const totalPrice = useMemo(() => {
    return cartItems
      .reduce((acc, item) => {
        const itemPrice =
          typeof item.price === 'string'
            ? parseFloat(item.price.replace(/[^\d,-]/g, '').replace(',', '.'))
            : item.price

        if (!isNaN(itemPrice)) {
          return acc + itemPrice * item.quantity
        } else {
          return acc
        }
      }, 0)
      .toFixed(2)
  }, [cartItems])

  const formattedTotalPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(Number(totalPrice))

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
            <div className="relative">
              <Button size="icon">
                <ShoppingBasket className="size-6" />
              </Button>
              {totalItems > 0 && (
                <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-white text-sm font-bold text-background">
                  {totalItems}
                </span>
              )}
            </div>
          </SheetTrigger>

          <SheetContent className="flex h-full flex-col justify-between overflow-y-auto py-10">
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
                    className="flex flex-col items-start justify-between sm:flex-row"
                  >
                    <div className="flex w-full flex-col items-center py-1 sm:flex-row">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={100}
                        height={60}
                      />

                      <div className="flex w-full flex-col items-center text-center sm:items-start sm:text-left">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-lg font-semibold text-primary">
                          {item.price}
                        </p>
                        <div className="flex items-center justify-between gap-4 lg:w-full">
                          <span className="text-sm text-muted-foreground">
                            Quantidade: {item.quantity}
                          </span>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="mr-2 h-8 w-8 text-red-400"
                              >
                                <Trash className="h-5 w-5" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Tem certeza que deseja remover este item?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  Vai remover {item.name} da sua sacola? 🥹
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => removeFromCart(item.id)}
                                >
                                  Remover
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>

            <Separator />

            {cartItems.length > 0 && (
              <div className="px-1">
                <div className="flex flex-row items-center justify-between">
                  <p className="text-sm">Quantidade:</p>
                  <p className="text-lg font-medium">{totalItems}</p>
                </div>
                <div className="flex flex-row items-center justify-between">
                  <p className="font-semibold">Total:</p>
                  <p className="text-2xl font-semibold text-primary">
                    {formattedTotalPrice}
                  </p>
                </div>
              </div>
            )}

            <Separator />

            {cartItems.length > 0 && <BuyProduct />}
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}
