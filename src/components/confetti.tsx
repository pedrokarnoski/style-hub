'use client'

import confetti from 'canvas-confetti'
import { useEffect } from 'react'

export function Confetti() {
  useEffect(() => {
    const end = Date.now() + 3 * 1000
    const colors = ['#F3C614', '#A8A29E', '#ec8484', '#f1f1f1']

    const frame = () => {
      if (Date.now() > end) return

      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        startVelocity: 60,
        origin: { x: 0, y: 0.5 },
        colors,
      })
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        startVelocity: 60,
        origin: { x: 1, y: 0.5 },
        colors,
      })

      requestAnimationFrame(frame)
    }

    frame()
  }, [])

  return null
}
