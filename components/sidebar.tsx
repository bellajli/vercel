"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  Home,
  FileText,
  MessageSquare,
  Wrench,
  DollarSign,
  Menu,
  LogOut,
  Settings,
  UserCircle,
  Lock,
  Mail,
  Info,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"
import { logout } from "@/app/actions/auth"
import { toast } from "@/components/ui/use-toast"
import { LoginDialog } from "@/components/login-dialog"

// Define the navItems array
const navItems = [
  { name: "Home", href: "/", icon: Home, section: "Public" },
  { name: "About", href: "/about", icon: Info, section: "Public" },
  { name: "Contact", href: "/contact", icon: Mail, section: "Public" },
  { name: "Committee", href: "/committee", icon: UserCircle, section: "Public"},
  { name: "Dashboard", href: "/dashboard", icon: Home, section: "Committee Portal", protected: true },
  { name: "Documents", href: "/documents", icon: FileText, section: "Committee Portal", protected: true },
  { name: "Communication", href: "/communication", icon: MessageSquare, section: "Committee Portal", protected: true },
  { name: "Maintenance", href: "/maintenance", icon: Wrench, section: "Committee Portal", protected: true },
  { name: "Finance", href: "/finance", icon: DollarSign, section: "Committee Portal", protected: true },
  { name: "Profile", href: "/profile", icon: UserCircle, section: "Account", protected: true },
  { name: "Settings", href: "/settings", icon: Settings, section: "Account", protected: true },
]

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)

  // Group navigation items by section
  const publicPages = navItems.filter((item) => item.section === "Public")
  const committeePages = navItems.filter((item) => item.section === "Committee Portal")
  const accountPages = navItems.filter((item) => item.section === "Account")

  const [loginDialogOpen, setLoginDialogOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    // Check if user is logged in from localStorage
    const checkLoginStatus = () => {
      const loggedIn = localStorage.getItem("isLoggedIn") === "true"
      setIsLoggedIn(loggedIn)
    }

    // Check immediately
    checkLoginStatus()

    // Set up an event listener for storage changes
    window.addEventListener("storage", checkLoginStatus)

    // Also set up a custom event listener for login status changes
    const handleLoginChange = () => checkLoginStatus()
    window.addEventListener("loginStatusChanged", handleLoginChange)

    // Also listen for profile updates
    const handleProfileUpdate = () => {
      const storedName = localStorage.getItem("userName")
      if (storedName) {
        // You could update any sidebar elements that show the user name here
        // For now we'll just force a re-render
        setIsLoggedIn((prev) => prev)
      }
    }
    window.addEventListener("profileUpdated", handleProfileUpdate)

    // Clean up
    return () => {
      window.removeEventListener("storage", checkLoginStatus)
      window.removeEventListener("loginStatusChanged", handleLoginChange)
      window.removeEventListener("profileUpdated", handleProfileUpdate)
    }
  }, [])

  const handleLogout = async () => {
    try {
      await logout()
      // Clear local storage
      localStorage.removeItem("userName")
      localStorage.removeItem("userRole")
      localStorage.removeItem("userEmail")
      localStorage.removeItem("isLoggedIn")

      // Dispatch a custom event to notify other components
      window.dispatchEvent(new Event("loginStatusChanged"))

      toast({
        title: "Logged out",
        description: "You have been successfully logged out",
      })

      router.push("/")
      router.refresh() // Refresh to update authentication state
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to log out. Please try again.",
        variant: "destructive",
      })
    }
  }

  const NavLinks = () => (
    <>
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Bella Gardens</h2>
        <div className="space-y-1">
          {publicPages.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:text-primary",
                pathname === item.href ? "bg-muted font-medium text-primary" : "text-muted-foreground",
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Only show committee portal section if logged in */}
      {isLoggedIn && (
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-xs font-semibold tracking-tight text-muted-foreground">COMMITTEE PORTAL</h2>
          <div className="space-y-1">
            {committeePages.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:text-primary",
                  pathname === item.href ? "bg-muted font-medium text-primary" : "text-muted-foreground",
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Only show account section if logged in */}
      {isLoggedIn && (
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-xs font-semibold tracking-tight text-muted-foreground">ACCOUNT</h2>
          <div className="space-y-1 mb-4">
            {accountPages.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:text-primary",
                  pathname === item.href ? "bg-muted font-medium text-primary" : "text-muted-foreground",
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="mt-auto px-3 py-2">
        {isLoggedIn ? (
          <Button variant="outline" className="w-full justify-start gap-2" onClick={handleLogout}>
            <LogOut className="h-4 w-4" />
            <span>Log out</span>
          </Button>
        ) : (
          <Button variant="outline" className="w-full justify-start gap-2" onClick={() => setLoginDialogOpen(true)}>
            <Lock className="h-4 w-4" />
            <span>Committee Login</span>
          </Button>
        )}
      </div>
    </>
  )

  return (
    <>
      {/* Mobile sidebar */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild className="md:hidden">
          <Button variant="outline" size="icon" className="fixed left-4 top-4 z-40">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0 pt-10">
          <NavLinks />
        </SheetContent>
      </Sheet>

      {/* Desktop sidebar */}
      <div className="hidden border-r bg-background md:block">
        <div className="flex h-full w-60 flex-col">
          <NavLinks />
        </div>
      </div>

      {/* Add the LoginDialog */}
      <LoginDialog open={loginDialogOpen} onOpenChange={setLoginDialogOpen} />
    </>
  )
}
