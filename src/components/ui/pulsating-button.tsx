'use client'

import React from 'react'

import { cn } from '@/lib/utils'

interface PulsatingButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  pulseColor?: string
  duration?: string
}

export default function PulsatingButton({
  className,
  children,
  pulseColor = '#F3C614',
  duration = '2s',
  ...props
}: PulsatingButtonProps) {
  return (
    <button
      className={cn(
        'relative flex cursor-pointer items-center justify-center rounded-lg bg-primary px-4 py-2 text-center text-background',
        className,
      )}
      style={
        {
          '--pulse-color': pulseColor,
          '--duration': duration,
        } as React.CSSProperties
      }
      {...props}
    >
      <div className="relative z-10">{children}</div>
      <div className="absolute left-1/2 top-1/2 size-full -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-lg bg-inherit" />
    </button>
  )
}