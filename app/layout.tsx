import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Toaster } from "@/components/ui/toaster"
import { Suspense } from "react"
import { TurboModeProvider } from "@/components/turbo-mode-provider"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Vox Call Care Agent - AI-Powered Call Center Platform",
  description:
    "Multi-tenant AI-powered call center platform for managing customer calls, WhatsApp integration, and real-time analytics",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`font-sans ${inter.variable} antialiased`}>
        <TurboModeProvider>
          <Suspense fallback={null}>
            {children}
            <Toaster />
          </Suspense>
        </TurboModeProvider>
        <Analytics />
      </body>
    </html>
  )
}
