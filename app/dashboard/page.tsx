"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, MessageSquare, Wrench, AlertTriangle, Clock, DollarSign, Users } from "lucide-react"
import Link from "next/link"
import { Progress } from "@/components/ui/progress"

export default function Dashboard() {
  const [userName, setUserName] = useState("")
  const [userRole, setUserRole] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // We don't need to check localStorage here anymore since middleware handles protection
    const storedName = localStorage.getItem("userName") || "Committee Member"
    const storedRole = localStorage.getItem("userRole") || "Member"

    setUserName(storedName)
    setUserRole(storedRole)
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-[60vh]">Loading...</div>
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold tracking-tight">Committee Dashboard</h1>
      <div className="flex items-center gap-2 text-muted-foreground">
        <span>Welcome, {userName}</span>
        <span className="text-sm px-2 py-1 bg-primary/10 rounded-full">{userRole}</span>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Maintenance</CardTitle>
            <Wrench className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <div className="flex items-center justify-between mt-2">
              <div className="text-xs text-muted-foreground">Active requests</div>
              <div className="flex gap-2 text-xs">
                <span className="flex items-center gap-1 text-amber-500">
                  <Clock className="h-3 w-3" /> 2 Pending
                </span>
                <span className="flex items-center gap-1 text-blue-500">
                  <AlertTriangle className="h-3 w-3" /> 3 In Progress
                </span>
              </div>
            </div>
            <Button variant="outline" size="sm" className="mt-4 w-full" asChild>
              <Link href="/maintenance">View Requests</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Documents</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32</div>
            <div className="flex items-center justify-between mt-2">
              <div className="text-xs text-muted-foreground">Total documents</div>
              <div className="text-xs text-green-500">3 New</div>
            </div>
            <Button variant="outline" size="sm" className="mt-4 w-full" asChild>
              <Link href="/documents">View Documents</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <div className="flex items-center justify-between mt-2">
              <div className="text-xs text-muted-foreground">Unread messages</div>
              <div className="text-xs text-amber-500">2 Urgent</div>
            </div>
            <Button variant="outline" size="sm" className="mt-4 w-full" asChild>
              <Link href="/communication">View Messages</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Task Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Committee Tasks</CardTitle>
          <CardDescription>Track progress on current committee responsibilities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">Annual Budget Review</div>
                <div className="text-sm text-muted-foreground">75%</div>
              </div>
              <Progress value={75} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">Building Inspection Follow-ups</div>
                <div className="text-sm text-muted-foreground">60%</div>
              </div>
              <Progress value={60} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">By-law Updates</div>
                <div className="text-sm text-muted-foreground">40%</div>
              </div>
              <Progress value={40} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">AGM Preparation</div>
                <div className="text-sm text-muted-foreground">90%</div>
              </div>
              <Progress value={90} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Financial Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Financial Overview</CardTitle>
          <CardDescription>Current fund balances and levy status</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="funds">
            <TabsList>
              <TabsTrigger value="funds">Fund Balances</TabsTrigger>
              <TabsTrigger value="levies">Levy Status</TabsTrigger>
            </TabsList>
            <TabsContent value="funds" className="space-y-4 pt-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Admin Fund</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$68,750</div>
                    <p className="text-xs text-muted-foreground">Updated April 1, 2025</p>
                    <div className="mt-2 flex items-center text-xs text-green-500">
                      <span>↑ 12% from last quarter</span>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Capital Works Fund</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$245,320</div>
                    <p className="text-xs text-muted-foreground">Updated April 1, 2025</p>
                    <div className="mt-2 flex items-center text-xs text-green-500">
                      <span>↑ 8% from last quarter</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="flex justify-end">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/finance">View Full Financial Report</Link>
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="levies" className="pt-4">
              <div className="rounded-lg border">
                <div className="flex items-center justify-between border-b p-4">
                  <div>
                    <div className="font-medium">Q2 2025 Levy</div>
                    <div className="text-sm text-muted-foreground">Due: April 30, 2025</div>
                  </div>
                  <div className="text-sm font-medium">$950.00</div>
                </div>
                <div className="flex items-center justify-between border-b p-4">
                  <div>
                    <div className="font-medium">Q1 2025 Levy</div>
                    <div className="text-sm text-muted-foreground">Due: January 31, 2025</div>
                  </div>
                  <div className="text-sm font-medium text-green-500">Paid</div>
                </div>
                <div className="flex items-center justify-between p-4">
                  <div>
                    <div className="font-medium">Q4 2024 Levy</div>
                    <div className="text-sm text-muted-foreground">Due: October 31, 2024</div>
                  </div>
                  <div className="text-sm font-medium text-green-500">Paid</div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest updates from the committee</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-4 border-b pb-4">
              <div className="rounded-full bg-primary/10 p-2">
                <FileText className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="font-medium">New document uploaded</p>
                <p className="text-sm text-muted-foreground">Annual General Meeting Minutes - March 2025</p>
                <p className="text-xs text-muted-foreground mt-1">Today at 10:23 AM</p>
              </div>
            </div>
            <div className="flex items-start gap-4 border-b pb-4">
              <div className="rounded-full bg-primary/10 p-2">
                <Wrench className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="font-medium">Maintenance request updated</p>
                <p className="text-sm text-muted-foreground">Elevator maintenance - Status changed to In Progress</p>
                <p className="text-xs text-muted-foreground mt-1">Yesterday at 3:45 PM</p>
              </div>
            </div>
            <div className="flex items-start gap-4 border-b pb-4">
              <div className="rounded-full bg-primary/10 p-2">
                <Users className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="font-medium">Committee meeting scheduled</p>
                <p className="text-sm text-muted-foreground">Monthly committee meeting - April 20, 2025</p>
                <p className="text-xs text-muted-foreground mt-1">April 5, 2025</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-primary/10 p-2">
                <DollarSign className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="font-medium">Invoice approved</p>
                <p className="text-sm text-muted-foreground">Garden maintenance services - $2,450</p>
                <p className="text-xs text-muted-foreground mt-1">April 3, 2025</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
