'use client'

import { useEffect, useState } from 'react'
import Stripe from 'stripe'

import { Button } from '@/components/ui/button'
import QuantityPicker from '@/components/ui/quantity-picker'
import SizePicker from '@/components/ui/size-picker'
import { ToastAction } from '@/components/ui/toast'
import { useCart } from '@/context/cart-context'
import { toast } from '@/hooks/use-toast'

interface AddToCartProps {
  product: {
    id: string
    name: string
    defaultPrice: string
    priceBySize: Record<string, Stripe.Price>
    defaultPriceId: string
    size: string
    quantity: number
    image: string
  }
}

export function AddToCart({ product }: AddToCartProps) {
  const { addToCart, removeFromCart } = useCart()

  const [quantity, setQuantity] = useState(1)
  const [size, setSize] = useState<string | undefined>(undefined)
  const [price, setPrice] = useState(product.defaultPrice)

  useEffect(() => {
    if (size) {
      const selectedPrice = product.priceBySize[size]
      if (selectedPrice) {
        setPrice(
          new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format((selectedPrice.unit_amount ?? 0) / 100),
        )
      }
    }
  }, [size, product.priceBySize])

  const handleSizeChange = (newSize: string) => {
    setSize(newSize)
  }

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity)
  }

  const handleAddToCart = () => {
    try {
      if (!size) {
        return toast({
          description: 'Selecione um tamanho para adicionar à sacola.',
          variant: 'destructive',
        })
      }

      const productWithQuantity = {
        ...product,
        size,
        quantity,
        price,
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
    <div className="w-full space-y-4 sm:w-1/2">
      <p className="text-2xl font-semibold text-primary">{price}</p>
      <SizePicker
        priceBySize={product.priceBySize}
        onSizeChange={handleSizeChange}
      />

      <QuantityPicker onQuantityChange={handleQuantityChange} />

      <Button className="w-full" size="lg" onClick={handleAddToCart}>
        Adicionar a sacola
      </Button>
    </div>
  )
}
