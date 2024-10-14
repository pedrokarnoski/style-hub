import { Shirt } from 'lucide-react'
import Link from 'next/link'

export function Header() {
  return (
    <div className="absolute w-full border-b">
      <div className="flex h-16 items-center justify-center gap-6 px-6">
        <Link href="/">
          <div className="flex items-center gap-3 font-semibold text-foreground">
            <Shirt className="h-5 w-5 text-muted-foreground" />
            <span className="flex flex-row text-xl tracking-wide text-primary">
              Style<p className="text-muted-foreground">Hub</p>
            </span>
          </div>
        </Link>
      </div>
    </div>
  )
}
