"use client"

import type React from "react"
import { Inter } from "next/font/google"
import { useSearchParams, useRouter } from "next/navigation"
import { useEffect, useState, Suspense } from "react"
import "./globals.css"
import Sidebar from "@/components/sidebar"
import Header from "@/components/header"
import { ThemeProvider } from "@/components/theme-provider"
import { LoginDialog } from "@/components/login-dialog"

const inter = Inter({ subsets: ["latin"] })

// Create a separate component for the login dialog logic
function LoginDialogHandler() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [loginDialogOpen, setLoginDialogOpen] = useState(false)

  useEffect(() => {
    // Check if the login parameter is present in the URL
    if (searchParams.get("login") === "true") {
      setLoginDialogOpen(true)
    }
  }, [searchParams])

  // Handle dialog close
  const handleOpenChange = (open: boolean) => {
    setLoginDialogOpen(open)

    // If dialog is closing and we're on a page with login=true query param, navigate to home
    if (!open && searchParams.get("login") === "true") {
      router.push("/")
    }
  }

  return <LoginDialog open={loginDialogOpen} onOpenChange={handleOpenChange} />
}

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <div className="flex flex-col flex-1 overflow-hidden">
              <Header />
              <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
            </div>
          </div>
          <Suspense fallback={null}>
            <LoginDialogHandler />
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  )
}
