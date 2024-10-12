import '../globals.css'

import { GeistSans } from 'geist/font/sans'
import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'

export const metadata: Metadata = {
  title: 'StyleHub',
  description: 'StyleHub | Loja',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt">
      <body className="mx-auto min-h-screen max-w-6xl bg-background font-sans antialiased">
        <div className={GeistSans.className}>
          <ThemeProvider attribute="class" defaultTheme="light">
            {children}
          </ThemeProvider>
        </div>
      </body>
    </html>
  )
}
