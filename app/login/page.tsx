"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { isAuthenticated } from "../actions/auth"

export default function LoginPage() {
  const router = useRouter()

  useEffect(() => {
    // Check if already authenticated
    const checkAuth = async () => {
      const authenticated = await isAuthenticated()
      if (authenticated) {
        router.push("/dashboard")
      } else {
        // If not authenticated, redirect to home with login dialog trigger
        router.push("/?login=true")
      }
    }

    checkAuth()
  }, [router])

  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Committee Portal Login</CardTitle>
          <CardDescription>Redirecting to login...</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full" onClick={() => router.push("/")}>
            Return to Home
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
