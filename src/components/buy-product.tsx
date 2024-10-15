'use client'

import axios from 'axios'
import { useState } from 'react'

import PulsatingButton from '@/components/ui/pulsating-button'
import { useCart } from '@/context/cart-context'

export function BuyProduct() {
  const { cartItems } = useCart()
  const [isCreatingCheckout, setIsCreatingCheckout] = useState(false)

  async function handleBuyProduct() {
    try {
      setIsCreatingCheckout(true)

      const lineItems = cartItems.map((item) => ({
        price: item.defaultPriceId,
        quantity: item.quantity,
      }))

      const response = await axios.post('/api/checkout', {
        lineItems,
      })

      const { checkoutUrl } = response.data

      window.location.href = checkoutUrl
    } catch (error) {
      setIsCreatingCheckout(false)
      console.error('Erro ao criar sessão de checkout:', error)
    }
  }

  return (
    <PulsatingButton
      disabled={isCreatingCheckout || cartItems.length === 0}
      className="w-full"
      onClick={handleBuyProduct}
    >
      Finalizar compra
    </PulsatingButton>
  )
}
