import '../globals.css'

import { GeistSans } from 'geist/font/sans'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Home | StyleHub',
  description: 'Loja de camisetas',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt">
      <body className="mx-auto min-h-screen bg-background font-sans antialiased">
        <div className={GeistSans.className}>{children}</div>
      </body>
    </html>
  )
}
