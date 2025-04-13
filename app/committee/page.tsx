"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function Committee() {
  const router = useRouter()

  const committeeMembers = [
    {
      id: 1,
      name: "Bella Li",
      role: "Chairperson",
      email: "bella.li@bellagardens.com.au",
      bio: "Bella has been a resident of Bella Gardens for 6 years and has served as Chairperson for 2 years. She has a background in corporate management and is passionate about maintaining the high standards of our community.",
      gender: "female",
    },
    {
      id: 2,
      name: "Madeleine Caspers",
      role: "Treasurer",
      email: "madeleine.caspers@bellagardens.com.au",
      bio: "Madeleine is a certified accountant with over 12 years of experience. She has been managing the strata finances for 3 years and ensures transparent financial reporting to all owners.",
      gender: "female",
    },
    {
      id: 3,
      name: "Felix Chan",
      role: "Secretary",
      email: "felix.chan@bellagardens.com.au",
      bio: "Felix has a background in administration and legal services. He ensures all meeting minutes and communications are properly documented and maintains the strata records.",
      gender: "male",
    },
    {
      id: 4,
      name: "Yshai Turgeman",
      role: "Committee Member",
      email: "yshai.turgeman@bellagardens.com.au",
      bio: "Yshai has expertise in building maintenance and oversees major maintenance projects within the building. He has a background in civil engineering.",
      gender: "male",
    },
    {
      id: 5,
      name: "Chanupa Hapangama",
      role: "Committee Member",
      email: "chanupa.hapangama@bellagardens.com.au",
      bio: "Chanupa has a background in IT and helps manage the building's security systems and technology infrastructure.",
      gender: "male",
    },
    {
      id: 6,
      name: "Aubrey Graham",
      role: "Committee Member",
      email: "aubrey.graham@bellagardens.com.au",
      bio: "Aubrey has experience in community management and focuses on building community relations and organizing resident events.",
      gender: "male",
    },
    {
      id: 7,
      name: "Oakley Caesar-Su",
      role: "Committee Member",
      email: "oakley.caesar-su@bellagardens.com.au",
      bio: "Oakley has a background in landscape architecture and oversees the garden and outdoor space maintenance and improvements.",
      gender: "male",
    },
    {
      id: 8,
      name: "Kimberly Kardashian",
      role: "Committee Member",
      email: "kimberly.kardashian@bellagardens.com.au",
      bio: "Kimberly has experience in marketing and public relations. She helps with communication strategies and building the Bella Gardens brand.",
      gender: "female",
    },
    {
      id: 9,
      name: "Skye Kim",
      role: "Committee Member",
      email: "skye.kim@bellagardens.com.au",
      bio: "Skye has a legal background and provides guidance on strata law and compliance matters. She helps ensure the building adheres to all relevant regulations.",
      gender: "female",
    },
  ]

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold tracking-tight">Committee Members</h1>
      <p className="text-muted-foreground">Meet the team responsible for managing Bella Gardens strata affairs.</p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {committeeMembers.map((member) => (
          <Card key={member.id}>
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <Avatar className="h-12 w-12">
                <AvatarFallback>
                  {member.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-lg">{member.name}</CardTitle>
                <CardDescription>{member.role}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-4">{member.bio}</p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="w-full flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Contact
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Contact {member.name}</DialogTitle>
                    <DialogDescription>Send a message to {member.role}</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input id="subject" placeholder="Enter message subject" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea id="message" placeholder="Enter your message" rows={5} />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Send Message</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
