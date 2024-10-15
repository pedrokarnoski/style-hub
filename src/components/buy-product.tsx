'use client'

import axios from 'axios'
import { useState } from 'react'

import PulsatingButton from '@/components/ui/pulsating-button'

interface BuyProductProps {
  defaultPriceId: string
}

export function BuyProduct({ defaultPriceId }: BuyProductProps) {
  const [isCreatingCheckout, setIsCreatingCheckout] = useState(false)

  async function handleBuyProduct() {
    try {
      setIsCreatingCheckout(true)

      const response = await axios.post('/api/checkout', {
        priceId: defaultPriceId,
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
      disabled={isCreatingCheckout}
      className="w-full"
      onClick={handleBuyProduct}
    >
      Finalizar compra
    </PulsatingButton>
  )
}
