"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [userType, setUserType] = useState("resident")
  const [otherUserType, setOtherUserType] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
      unit: e.target.unit.value,
      message: e.target.message.value,
    };
  
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });
  
    if (response.ok) {
      toast({
        title: "Message sent",
        description: "Thank you for your message. We will get back to you soon."
      });
    } else {
      toast({
        title: "Error",
        description: "There was a problem submitting your message."
      });
    }
  
    setIsSubmitting(false);
  };    

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold tracking-tight">Contact Us</h1>
      <p className="text-muted-foreground">
        Get in touch with the Bella Gardens management team. We're here to help with any questions or concerns.
      </p>

      <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
        <Card>
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>Send us a message</CardTitle>
              <CardDescription>Fill out the form below and we'll get back to you as soon as possible.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input id="name" name="name" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input id="email" name="email" type="email" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input id="phone" name="phone" type="tel" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="unit">Unit Number (if applicable)</Label>
                <Input id="unit" name="unit" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="reason">Reason for Contact *</Label>
                <Select required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a reason" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="inquiry">General Inquiry</SelectItem>
                    <SelectItem value="issue">Report an Issue</SelectItem>
                    <SelectItem value="document">Request Documentation</SelectItem>
                    <SelectItem value="service">Service Provider Inquiry</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="message">Message *</Label>
                <Textarea id="message" name="message" rows={5} required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="attachment">Attachment (optional)</Label>
                <Input id="attachment" type="file" />
              </div>
              <div className="space-y-2">
                <Label>I am a: *</Label>
                <RadioGroup defaultValue="resident" onValueChange={setUserType} className="flex flex-col space-y-1">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="resident" id="resident" />
                    <Label htmlFor="resident">Resident</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="owner" id="owner" />
                    <Label htmlFor="owner">Owner</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="supplier" id="supplier" />
                    <Label htmlFor="supplier">Service Provider/Supplier</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="other" />
                    <Label htmlFor="other">Other</Label>
                  </div>
                </RadioGroup>
                {userType === "other" && (
                  <div className="mt-2 pl-6">
                    <Input
                      placeholder="Please specify"
                      value={otherUserType}
                      onChange={(e) => setOtherUserType(e.target.value)}
                      required
                    />
                  </div>
                )}
              </div>
              <div className="flex items-start space-x-2">
                <Checkbox id="terms" required />
                <Label
                  htmlFor="terms"
                  className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I agree to the privacy policy and consent to my information being stored and used as described.
                </Label>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isSubmitting} className="ml-auto">
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </CardFooter>
          </form>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
            <CardDescription>Other ways to reach us</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium">Address</h3>
              <p className="text-sm text-muted-foreground">
                Bella Gardens Apartments
                <br />
                123 Harbour View Road
                <br />
                Sydney, NSW 2000
              </p>
            </div>
            <div>
              <h3 className="font-medium">Building Manager</h3>
              <p className="text-sm text-muted-foreground">
                Phone: (02) 9876 5432
                <br />
                Email: manager@bellagardens.com.au
                <br />
                Hours: Mon-Fri, 9am-5pm
              </p>
            </div>
            <div>
              <h3 className="font-medium">Emergency Contact</h3>
              <p className="text-sm text-muted-foreground">
                For after-hours emergencies:
                <br />
                Phone: 0400 123 456
              </p>
            </div>
            <div>
              <h3 className="font-medium">Strata Manager</h3>
              <p className="text-sm text-muted-foreground">
                Sydney Strata Management
                <br />
                Phone: (02) 8765 4321
                <br />
                Email: strata@sydneystrata.com.au
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      <Toaster />
    </div>
  )
}
