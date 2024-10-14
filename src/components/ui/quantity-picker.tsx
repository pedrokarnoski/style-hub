'use client'

import { JSX, SVGProps, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function QuantityPicker() {
  const [quantity, setQuantity] = useState(1)
  const min = 1
  const max = 10

  const handleIncrement = () => {
    if (quantity < max) {
      setQuantity(quantity + 1)
    }
  }

  const handleDecrement = () => {
    if (quantity > min) {
      setQuantity(quantity - 1)
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
          onChange={(e) => setQuantity(Number(e.target.value))}
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

function MinusIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
    </svg>
  )
}

function PlusIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}
