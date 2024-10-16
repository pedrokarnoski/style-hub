'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/button'
import QuantityPicker from '@/components/ui/quantity-picker'
import { ToastAction } from '@/components/ui/toast'
import { useCart } from '@/context/cart-context'
import { toast } from '@/hooks/use-toast'

interface AddToCartProps {
  product: {
    id: string
    name: string
    price: string
    defaultPriceId: string
    quantity: number
    image: string
  }
}

export function AddToCart({ product }: AddToCartProps) {
  const [quantity, setQuantity] = useState(1)
  const { addToCart, removeFromCart } = useCart()

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity)
  }

  const handleAddToCart = () => {
    try {
      const productWithQuantity = {
        ...product,
        quantity,
      }

      addToCart(productWithQuantity)

      toast({
        title: 'Sucesso!',
        description: `Adicionado ${quantity} UN de ${product.name} à sacola!`,
        action: (
          <ToastAction
            altText="Desfazer"
            onClick={() => removeFromCart(product.id)}
          >
            Desfazer
          </ToastAction>
        ),
      })
    } catch (error) {
      toast({
        title: 'Erro!',
        description: 'Ocorreu um erro ao adicionar o produto à sacola.',
        variant: 'destructive',
      })
    }
  }

  return (
    <>
      <QuantityPicker onQuantityChange={handleQuantityChange} />

      <Button className="w-full sm:w-1/2" size="lg" onClick={handleAddToCart}>
        Adicionar a sacola
      </Button>
    </>
  )
}
