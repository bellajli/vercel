"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { Loader2 } from "lucide-react"

export default function ProfilePage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Profile state
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    unit: "",
    phone: "",
    role: "",
  })

  // Profile image state
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    if (!isLoggedIn) {
      router.push("/?login=true")
      return
    }

    // Load profile data from localStorage
    const userName = localStorage.getItem("userName") || "Bella Li"
    const userEmail = localStorage.getItem("userEmail") || "bella.li@bellagardens.com.au"
    const userRole = localStorage.getItem("userRole") || "Chairperson"
    const userUnit = localStorage.getItem("userUnit") || "12A"
    const userPhone = localStorage.getItem("userPhone") || "0412 345 678"
    const userImage = localStorage.getItem("userImage") || null

    setProfile({
      name: userName,
      email: userEmail,
      unit: userUnit,
      phone: userPhone,
      role: userRole,
    })

    if (userImage) {
      setProfileImage(userImage)
    }

    setIsLoading(false)
  }, [router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setProfile((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  const handleEditToggle = () => {
    setIsEditing(!isEditing)
  }

  const handleSave = async () => {
    setIsSaving(true)

    try {
      // Simulate API call with a delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Save profile data to localStorage
      localStorage.setItem("userName", profile.name)
      localStorage.setItem("userEmail", profile.email)
      localStorage.setItem("userUnit", profile.unit)
      localStorage.setItem("userPhone", profile.phone)
      localStorage.setItem("userRole", profile.role)

      // If there's a new image file, process it
      if (imageFile) {
        const reader = new FileReader()
        reader.onloadend = () => {
          const base64String = reader.result as string
          localStorage.setItem("userImage", base64String)
          setProfileImage(base64String)

          // Dispatch event to update other components
          window.dispatchEvent(new Event("profileUpdated"))
        }
        reader.readAsDataURL(imageFile)
      }

      toast({
        title: "Profile updated",
        description: "Your profile information has been saved successfully.",
      })

      setIsEditing(false)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleImageClick = () => {
    fileInputRef.current?.click()
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Preview the image
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileImage(reader.result as string)
      }
      reader.readAsDataURL(file)

      // Store the file for later upload
      setImageFile(file)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
      <p className="text-muted-foreground">View and manage your profile information</p>

      <div className="grid gap-6 md:grid-cols-[1fr_2fr]">
        <Card>
          <CardHeader>
            <CardTitle>Profile Picture</CardTitle>
            <CardDescription>Update your profile picture</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <div className="relative cursor-pointer group" onClick={handleImageClick}>
              <Avatar className="h-32 w-32">
                {profileImage ? (
                  <AvatarImage src={profileImage} alt="Profile" />
                ) : (
                  <AvatarImage src="/placeholder.svg?height=128&width=128" alt="Profile" />
                )}
                <AvatarFallback className="text-2xl">
                  {profile.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-white text-sm">Change Photo</span>
              </div>
            </div>
            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageChange} />
            <Button variant="outline" size="sm" onClick={handleImageClick}>
              Upload New Picture
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Update your personal details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={profile.name}
                readOnly={!isEditing}
                onChange={handleInputChange}
                className={isEditing ? "" : "opacity-70"}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={profile.email}
                readOnly={!isEditing}
                onChange={handleInputChange}
                className={isEditing ? "" : "opacity-70"}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="unit">Unit Number</Label>
              <Input
                id="unit"
                value={profile.unit}
                readOnly={!isEditing}
                onChange={handleInputChange}
                className={isEditing ? "" : "opacity-70"}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={profile.phone}
                readOnly={!isEditing}
                onChange={handleInputChange}
                className={isEditing ? "" : "opacity-70"}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="role">Committee Role</Label>
              <Input
                id="role"
                value={profile.role}
                readOnly={!isEditing}
                onChange={handleInputChange}
                className={isEditing ? "" : "opacity-70"}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            {isEditing ? (
              <>
                <Button variant="outline" onClick={handleEditToggle} disabled={isSaving}>
                  Cancel
                </Button>
                <Button onClick={handleSave} disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </>
            ) : (
              <Button onClick={handleEditToggle}>Edit Profile</Button>
            )}
          </CardFooter>
        </Card>
      </div>
      <Toaster />
    </div>
  )
}
