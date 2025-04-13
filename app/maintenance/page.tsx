"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PlusCircle, AlertTriangle, CheckCircle, Clock } from "lucide-react"

export default function Maintenance() {
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    if (!isLoggedIn) {
      router.push("/login")
      return
    }
    setIsLoading(false)
  }, [router])

  const maintenanceRequests = [
    {
      id: 1,
      title: "Elevator maintenance required",
      description:
        "The main elevator is making unusual noises and sometimes stops between floors. This requires immediate attention for safety reasons.",
      location: "Main Building Elevator",
      status: "in-progress",
      priority: "high",
      dateSubmitted: "April 5, 2025",
      assignedTo: "Sydney Elevator Services",
      affectedUnits: "All units",
      updates: [
        { date: "April 7, 2025", note: "Technician scheduled for April 8" },
        { date: "April 6, 2025", note: "Request reviewed and approved as high priority" },
      ],
    },
    {
      id: 2,
      title: "Roof leak affecting multiple units",
      description:
        "After recent heavy rain, water leaks have been reported in units 15A, 16A, and 17A. The roof above these units needs inspection and repair.",
      location: "Building A Roof",
      status: "pending",
      priority: "high",
      dateSubmitted: "April 3, 2025",
      assignedTo: "Pending assignment",
      affectedUnits: "15A, 16A, 17A",
      updates: [{ date: "April 4, 2025", note: "Request under review, quotes being obtained" }],
    },
    {
      id: 3,
      title: "Garden irrigation system malfunction",
      description:
        "The automated irrigation system in the central garden area is not functioning properly. Some zones are not receiving water while others are being overwatered.",
      location: "Central Garden",
      status: "in-progress",
      priority: "medium",
      dateSubmitted: "April 2, 2025",
      assignedTo: "GreenScape Maintenance",
      affectedUnits: "Common area",
      updates: [
        { date: "April 4, 2025", note: "Technician diagnosed faulty controller, replacement ordered" },
        { date: "April 3, 2025", note: "Maintenance scheduled for inspection" },
      ],
    },
    {
      id: 4,
      title: "Security gate malfunction",
      description:
        "The vehicle entry security gate is occasionally failing to open with resident fobs. This is causing access issues for residents.",
      location: "Main Entrance",
      status: "pending",
      priority: "medium",
      dateSubmitted: "April 1, 2025",
      assignedTo: "Pending assignment",
      affectedUnits: "All units",
      updates: [{ date: "April 2, 2025", note: "Security company contacted for assessment" }],
    },
    {
      id: 5,
      title: "Common area lighting replacement",
      description:
        "Several light fixtures in the lobby and hallways have burned out bulbs that need replacement with energy-efficient LED alternatives.",
      location: "Lobby and Hallways",
      status: "completed",
      priority: "low",
      dateSubmitted: "March 28, 2025",
      completedDate: "April 1, 2025",
      assignedTo: "Building Manager",
      affectedUnits: "Common areas",
      updates: [
        { date: "April 1, 2025", note: "All lights replaced with LED fixtures" },
        { date: "March 30, 2025", note: "Materials purchased, work scheduled" },
      ],
    },
  ]

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="flex items-center gap-1">
            <Clock className="h-3 w-3" /> Pending
          </Badge>
        )
      case "in-progress":
        return (
          <Badge variant="secondary" className="flex items-center gap-1">
            <AlertTriangle className="h-3 w-3" /> In Progress
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="default" className="bg-green-600 flex items-center gap-1">
            <CheckCircle className="h-3 w-3" /> Completed
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">High</Badge>
      case "medium":
        return <Badge variant="secondary">Medium</Badge>
      case "low":
        return <Badge variant="outline">Low</Badge>
      default:
        return <Badge variant="outline">{priority}</Badge>
    }
  }

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-[60vh]">Loading...</div>
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Maintenance Requests</h1>
          <p className="text-muted-foreground">Manage building maintenance and repairs</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <PlusCircle className="h-4 w-4" />
              New Request
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Maintenance Request</DialogTitle>
              <DialogDescription>Submit a new maintenance request for the building</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" placeholder="Brief description of the issue" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Detailed Description</Label>
                <Textarea id="description" placeholder="Provide details about the maintenance issue" rows={4} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="Where is the issue located?" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="affected-units">Affected Units</Label>
                  <Input id="affected-units" placeholder="Which units are affected?" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="attachment">Attachment (optional)</Label>
                <Input id="attachment" type="file" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Submit Request</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Requests</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4 mt-4">
          {maintenanceRequests.map((request) => (
            <Card key={request.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{request.title}</CardTitle>
                  <div className="flex gap-2">
                    {getStatusBadge(request.status)}
                    {getPriorityBadge(request.priority)}
                  </div>
                </div>
                <CardDescription>
                  Submitted on {request.dateSubmitted} • {request.location}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{request.description}</p>

                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium mb-1">Affected Units</h4>
                    <p className="text-sm text-muted-foreground">{request.affectedUnits}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-1">Assigned To</h4>
                    <p className="text-sm text-muted-foreground">{request.assignedTo}</p>
                  </div>
                </div>

                <div className="mt-4">
                  <h4 className="text-sm font-medium mb-2">Updates</h4>
                  <div className="space-y-2">
                    {request.updates.map((update, index) => (
                      <div key={index} className="text-sm">
                        <span className="font-medium">{update.date}:</span> {update.note}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="text-sm text-muted-foreground">
                  {request.status === "completed"
                    ? `Completed on ${request.completedDate}`
                    : `Last updated: ${request.updates[0]?.date || request.dateSubmitted}`}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Add Update
                  </Button>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="pending" className="space-y-4 mt-4">
          {maintenanceRequests
            .filter((request) => request.status === "pending")
            .map((request) => (
              <Card key={request.id}>{/* Same card content as above */}</Card>
            ))}
        </TabsContent>

        <TabsContent value="in-progress" className="space-y-4 mt-4">
          {maintenanceRequests
            .filter((request) => request.status === "in-progress")
            .map((request) => (
              <Card key={request.id}>{/* Same card content as above */}</Card>
            ))}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4 mt-4">
          {maintenanceRequests
            .filter((request) => request.status === "completed")
            .map((request) => (
              <Card key={request.id}>{/* Same card content as above */}</Card>
            ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
