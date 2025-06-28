import type { Metadata } from "next"
import { DM_Sans } from "next/font/google"

import "./globals.css"
import Providers from "@/components/providers"

export const metadata: Metadata = {
title: "Real-Time Todo APP",
  description: "Created using JStack",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
}

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dmSans"
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`antialiased ${dmSans.className}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
