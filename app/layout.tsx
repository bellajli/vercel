import type React from "react"
import ClientLayout from "./ClientLayout"

export const metadata = {
  title: "Bella Gardens Strata Management",
  description: "Luxury apartment living in the heart of Sydney with beautiful gardens and harbour views",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ClientLayout>{children}</ClientLayout>
}


import './globals.css'