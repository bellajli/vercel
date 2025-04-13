import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// List of paths that require authentication
const protectedPaths = [
  "/dashboard",
  "/documents",
  "/communication",
  "/maintenance",
  "/finance",
  "/calendar",
  "/committee",
  "/profile",
  "/settings",
]

// Update the middleware function to better handle authentication
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the path is protected
  const isProtectedPath = protectedPaths.some((path) => pathname === path || pathname.startsWith(`${path}/`))

  if (isProtectedPath) {
    // Check for authentication cookie
    const authCookie = request.cookies.get("auth-session")

    // If not authenticated, redirect to home page with a query parameter
    if (!authCookie || authCookie.value !== "authenticated") {
      const url = new URL("/", request.url)
      url.searchParams.set("login", "true") // Add a query parameter to trigger login dialog
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
}
