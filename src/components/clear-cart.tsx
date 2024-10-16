'use client'

import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { useCart } from '@/context/cart-context'
import { toast } from '@/hooks/use-toast'

export function ClearCart() {
  const router = useRouter()

  const { clearCart } = useCart()

  const handleClearCart = () => {
    try {
      clearCart()

      router.replace('/')
    } catch (error) {
      toast({
        title: 'Erro!',
        description: 'Ocorreu um erro ao limpar a sacola.',
        variant: 'destructive',
      })
    }
  }

  return (
    <Button variant="link" onClick={handleClearCart}>
      Voltar ao catálogo
    </Button>
  )
}
