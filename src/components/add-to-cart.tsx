'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/button'
import QuantityPicker from '@/components/ui/quantity-picker'
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
  const { addToCart } = useCart()

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity)
  }

  const handleAddToCart = () => {
    const productWithQuantity = {
      ...product,
      quantity,
    }

    addToCart(productWithQuantity)

    toast({
      title: 'Sucesso!',
      description: `Adicionado ${quantity} UN de ${product.name} à sacola!`,
    })
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
