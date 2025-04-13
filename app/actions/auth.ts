"use server"

import { cookies } from "next/headers"

type LoginResult = {
  success: boolean
  message: string
  userData?: {
    name: string
    role: string
    email: string
  }
}

export async function authenticate(email: string, password: string): Promise<LoginResult> {
  // Get environment variables
  const validEmail = process.env.USER_EMAIL || "manager@bellagardens.com.au"
  const validPassword = process.env.USER_PASSWORD || "admin"

  // Check if credentials match
  if (email === validEmail && password === validPassword) {
    // Set a session cookie that expires in 7 days (instead of 24 hours)
    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    cookies().set("auth-session", "authenticated", {
      expires,
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax", // Changed from "strict" to "lax" for better cross-page persistence
    })

    // Return user data
    return {
      success: true,
      message: "Login successful",
      userData: {
        name: "Bella Li",
        role: "Chairperson",
        email: validEmail,
      },
    }
  }

  // Return error for invalid credentials
  return {
    success: false,
    message: "Invalid email or password",
  }
}

export async function isAuthenticated(): Promise<boolean> {
  const session = cookies().get("auth-session")
  return session?.value === "authenticated"
}

export async function logout(): Promise<void> {
  cookies().delete("auth-session")
}
