'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

interface Product {
  id: string
  name: string
  price: string
  defaultPriceId: string
  image: string
  size: string
  quantity: number
}

interface CartContextType {
  cartItems: Product[]
  addToCart: (product: Product) => void
  removeFromCart: (productId: string) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<Product[]>(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cartItems')
      return savedCart ? JSON.parse(savedCart) : []
    }
    return []
  })

  const addToCart = (product: Product) => {
    setCartItems((prevItems) => {
      // Verifica se já existe um item com o mesmo id e tamanho
      const existingItem = prevItems.find(
        (item) => item.id === product.id && item.size === product.size,
      )

      if (existingItem) {
        const updatedCart = prevItems.map((item) =>
          item.id === product.id && item.size === product.size
            ? { ...item, quantity: item.quantity + product.quantity }
            : item,
        )
        localStorage.setItem('cartItems', JSON.stringify(updatedCart))
        return updatedCart
      } else {
        const updatedCart = [...prevItems, product]
        localStorage.setItem('cartItems', JSON.stringify(updatedCart))
        return updatedCart
      }
    })
  }

  const removeFromCart = (productId: string) => {
    setCartItems((prevItems) => {
      const updatedCart = prevItems.filter((item) => item.id !== productId)
      localStorage.setItem('cartItems', JSON.stringify(updatedCart))
      return updatedCart
    })
  }

  const clearCart = () => {
    setCartItems([])
    localStorage.removeItem('cartItems')
  }

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
  }, [cartItems])

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
