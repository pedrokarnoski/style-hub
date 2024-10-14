import { Shirt, ShoppingBasket } from 'lucide-react'
import Link from 'next/link'

import { Button } from './ui/button'

export function Header() {
  return (
    <div className="absolute z-20 w-full border-b bg-background lg:px-40">
      <div className="flex h-16 items-center justify-between gap-6 px-6">
        <Link href="/">
          <div className="flex items-center gap-3 font-semibold text-foreground">
            <Shirt className="h-5 w-5 text-muted-foreground" />
            <span className="flex flex-row text-xl tracking-wide text-primary">
              Style<p className="text-muted-foreground">Hub</p>
            </span>
          </div>
        </Link>

        <Button size="icon">
          <ShoppingBasket className="size-6" />
        </Button>
      </div>
    </div>
  )
}
