import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import '@fortawesome/fontawesome-free/css/all.min.css'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains' })

export const metadata: Metadata = {
  title: 'Cyphora TechStack | SEO, Growth, & Tech Solutions',
  description: 'TechStacker — A startup tech company offering SEO optimization, follower growth, staffing & hiring.',
}

import Script from 'next/script'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${jetbrainsMono.variable} min-h-screen bg-[#050505] text-white antialiased`}>
        {children}
        <Script src="/js/p-script.js" strategy="lazyOnload" />
      </body>
    </html>
  )
}
