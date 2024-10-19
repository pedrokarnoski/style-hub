'use client'

import { useState } from 'react'
import Stripe from 'stripe'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface SizePickerProps {
  priceBySize: Record<string, Stripe.Price>
  onSizeChange: (size: string) => void
}

export default function SizePicker({
  priceBySize,
  onSizeChange,
}: SizePickerProps) {
  const [selectedSize, setSelectedSize] = useState<string | undefined>()

  const handleSizeChange = (value: string) => {
    setSelectedSize(value)
    onSizeChange(value)
  }

  const availableSizes = Object.keys(priceBySize)

  return (
    <div className="flex flex-col items-start gap-2">
      <h3 className="font-medium">Tamanho</h3>
      <Select onValueChange={handleSizeChange}>
        <SelectTrigger className="w-full">
          <SelectValue
            placeholder={
              <span className="text-muted-foreground">
                {selectedSize ?? 'Selecione'}
              </span>
            }
          />
        </SelectTrigger>
        <SelectContent>
          {availableSizes.length > 0 ? (
            availableSizes.map((size) => (
              <SelectItem key={size} value={size}>
                {size.toUpperCase()}
              </SelectItem>
            ))
          ) : (
            <SelectItem disabled value="none">
              Indisponível
            </SelectItem>
          )}
        </SelectContent>
      </Select>
    </div>
  )
}
