'use client'

import { MinusIcon, PlusIcon } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface QuantityPickerProps {
  onQuantityChange: (quantity: number) => void
}

export default function QuantityPicker({
  onQuantityChange,
}: QuantityPickerProps) {
  const [quantity, setQuantity] = useState(1)
  const min = 1
  const max = 10

  const handleIncrement = () => {
    if (quantity < max) {
      const newQuantity = quantity + 1
      setQuantity(newQuantity)
      onQuantityChange(newQuantity)
    }
  }

  const handleDecrement = () => {
    if (quantity > min) {
      const newQuantity = quantity - 1
      setQuantity(newQuantity)
      onQuantityChange(newQuantity)
    }
  }

  return (
    <div className="flex flex-col items-start gap-2">
      <h3 className="font-medium">Quantidade</h3>
      <div className="flex w-full items-center gap-4">
        <Button
          variant="outline"
          className="h-10 w-10 rounded-full p-2"
          onClick={handleDecrement}
          disabled={quantity === min}
        >
          <MinusIcon className="h-5 w-5" />
          <span className="sr-only">Decrement</span>
        </Button>
        <Input
          type="number"
          value={quantity}
          onChange={(e) => {
            const newQuantity = Number(e.target.value)
            setQuantity(newQuantity)
            onQuantityChange(newQuantity)
          }}
          min={min}
          max={max}
          className="w-full text-center text-lg font-medium sm:w-40"
        />
        <Button
          variant="outline"
          className="h-10 w-10 rounded-full p-2"
          onClick={handleIncrement}
          disabled={quantity === max}
        >
          <PlusIcon className="h-5 w-5" />
          <span className="sr-only">Increment</span>
        </Button>
      </div>
    </div>
  )
}
