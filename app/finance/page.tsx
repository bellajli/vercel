"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Download, FileText, DollarSign, PieChart, BarChart, TrendingUp } from "lucide-react"

export default function Finance() {
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

  const financialReports = [
    { id: 1, name: "Q1 2025 Financial Statement", date: "April 5, 2025", size: "1.8 MB" },
    { id: 2, name: "2024 Annual Financial Report", date: "January 31, 2025", size: "3.5 MB" },
    { id: 3, name: "Budget 2025", date: "December 15, 2024", size: "1.3 MB" },
    { id: 4, name: "Q4 2024 Financial Statement", date: "January 10, 2025", size: "1.7 MB" },
    { id: 5, name: "Capital Works Fund Forecast 2025-2030", date: "March 1, 2025", size: "2.1 MB" },
  ]

  const levies = [
    {
      id: 1,
      period: "Q2 2025",
      dueDate: "April 30, 2025",
      amount: 950.0,
      status: "pending",
    },
    {
      id: 2,
      period: "Q1 2025",
      dueDate: "January 31, 2025",
      amount: 950.0,
      status: "paid",
      paidDate: "January 25, 2025",
    },
    {
      id: 3,
      period: "Q4 2024",
      dueDate: "October 31, 2024",
      amount: 900.0,
      status: "paid",
      paidDate: "October 28, 2024",
    },
    {
      id: 4,
      period: "Q3 2024",
      dueDate: "July 31, 2024",
      amount: 900.0,
      status: "paid",
      paidDate: "July 29, 2024",
    },
  ]

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-[60vh]">Loading...</div>
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold tracking-tight">Financial Overview</h1>
      <p className="text-muted-foreground">View fund balances, levy information, and financial reports.</p>

      {/* Fund Balances */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-medium">Admin Fund</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$68,750</div>
            <p className="text-xs text-muted-foreground">Updated April 1, 2025</p>
            <div className="mt-2 flex items-center text-xs text-green-500">
              <TrendingUp className="mr-1 h-3 w-3" />
              <span>12% increase from last quarter</span>
            </div>
            <div className="mt-4 h-[60px] w-full bg-muted/50 rounded-md flex items-end overflow-hidden">
              <div className="bg-primary/20 h-[20%] w-[10%]"></div>
              <div className="bg-primary/30 h-[30%] w-[10%]"></div>
              <div className="bg-primary/40 h-[40%] w-[10%]"></div>
              <div className="bg-primary/50 h-[35%] w-[10%]"></div>
              <div className="bg-primary/60 h-[45%] w-[10%]"></div>
              <div className="bg-primary/70 h-[50%] w-[10%]"></div>
              <div className="bg-primary/80 h-[60%] w-[10%]"></div>
              <div className="bg-primary/90 h-[70%] w-[10%]"></div>
              <div className="bg-primary h-[80%] w-[10%]"></div>
              <div className="bg-primary h-[90%] w-[10%]"></div>
            </div>
            <div className="mt-1 flex justify-between text-xs text-muted-foreground">
              <span>Jul 2024</span>
              <span>Apr 2025</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-medium">Capital Works Fund</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$245,320</div>
            <p className="text-xs text-muted-foreground">Updated April 1, 2025</p>
            <div className="mt-2 flex items-center text-xs text-green-500">
              <TrendingUp className="mr-1 h-3 w-3" />
              <span>8% increase from last quarter</span>
            </div>
            <div className="mt-4 h-[60px] w-full bg-muted/50 rounded-md flex items-end overflow-hidden">
              <div className="bg-blue-500/20 h-[40%] w-[10%]"></div>
              <div className="bg-blue-500/30 h-[45%] w-[10%]"></div>
              <div className="bg-blue-500/40 h-[50%] w-[10%]"></div>
              <div className="bg-blue-500/50 h-[55%] w-[10%]"></div>
              <div className="bg-blue-500/60 h-[60%] w-[10%]"></div>
              <div className="bg-blue-500/70 h-[65%] w-[10%]"></div>
              <div className="bg-blue-500/80 h-[70%] w-[10%]"></div>
              <div className="bg-blue-500/90 h-[75%] w-[10%]"></div>
              <div className="bg-blue-500 h-[80%] w-[10%]"></div>
              <div className="bg-blue-500 h-[85%] w-[10%]"></div>
            </div>
            <div className="mt-1 flex justify-between text-xs text-muted-foreground">
              <span>Jul 2024</span>
              <span>Apr 2025</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Expense Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Expense Breakdown</CardTitle>
          <CardDescription>How your strata levies are being utilized</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex flex-col items-center">
              <PieChart className="h-6 w-6 mb-2 text-muted-foreground" />
              <div className="h-[200px] w-full bg-muted/50 rounded-md relative">
                {/* Pie chart visualization */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative h-36 w-36">
                    <div
                      className="absolute inset-0 rounded-full border-8 border-primary/70"
                      style={{ clipPath: "polygon(50% 50%, 100% 0, 100% 100%, 0 100%, 0 0)" }}
                    ></div>
                    <div
                      className="absolute inset-0 rounded-full border-8 border-blue-500/70"
                      style={{ clipPath: "polygon(50% 50%, 0 0, 100% 0)" }}
                    ></div>
                    <div
                      className="absolute inset-0 rounded-full border-8 border-amber-500/70"
                      style={{ clipPath: "polygon(50% 50%, 100% 100%, 100% 0)" }}
                    ></div>
                    <div
                      className="absolute inset-0 rounded-full border-8 border-green-500/70"
                      style={{ clipPath: "polygon(50% 50%, 0 100%, 100% 100%)" }}
                    ></div>
                    <div
                      className="absolute inset-0 rounded-full border-8 border-purple-500/70"
                      style={{ clipPath: "polygon(50% 50%, 0 0, 0 100%)" }}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2 w-full text-sm">
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-primary/70 mr-2"></div>
                  <span>Maintenance (35%)</span>
                </div>
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-blue-500/70 mr-2"></div>
                  <span>Utilities (20%)</span>
                </div>
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-amber-500/70 mr-2"></div>
                  <span>Insurance (18%)</span>
                </div>
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-green-500/70 mr-2"></div>
                  <span>Admin (15%)</span>
                </div>
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-purple-500/70 mr-2"></div>
                  <span>Other (12%)</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <BarChart className="h-6 w-6 mb-2 text-muted-foreground" />
              <div className="h-[200px] w-full bg-muted/50 rounded-md relative p-4">
                {/* Bar chart visualization */}
                <div className="flex h-full items-end justify-between">
                  <div className="flex flex-col items-center">
                    <div className="w-8 bg-primary rounded-t-sm" style={{ height: "60%" }}></div>
                    <span className="text-xs mt-1">Jan</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-8 bg-primary rounded-t-sm" style={{ height: "75%" }}></div>
                    <span className="text-xs mt-1">Feb</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-8 bg-primary rounded-t-sm" style={{ height: "45%" }}></div>
                    <span className="text-xs mt-1">Mar</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-8 bg-primary rounded-t-sm" style={{ height: "90%" }}></div>
                    <span className="text-xs mt-1">Apr</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-8 bg-primary/50 rounded-t-sm" style={{ height: "65%" }}></div>
                    <span className="text-xs mt-1">May</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-8 bg-primary/50 rounded-t-sm" style={{ height: "55%" }}></div>
                    <span className="text-xs mt-1">Jun</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-4">Monthly Expenses (2025)</p>
              <div className="mt-2 text-xs text-muted-foreground">
                <p>Highest spending: April ($18,450)</p>
                <p>Lowest spending: March ($9,320)</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="levies">
        <TabsList>
          <TabsTrigger value="levies">Levy Information</TabsTrigger>
          <TabsTrigger value="reports">Financial Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="levies" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Strata Levies</CardTitle>
              <CardDescription>Current and past levy information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                {levies.map((levy, index) => (
                  <div
                    key={levy.id}
                    className={`flex items-center justify-between p-4 ${index !== levies.length - 1 ? "border-b" : ""}`}
                  >
                    <div>
                      <div className="font-medium">{levy.period} Levy</div>
                      <div className="text-sm text-muted-foreground">Due: {levy.dueDate}</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="font-medium">${levy.amount.toFixed(2)}</div>
                        <div className={`text-sm ${levy.status === "paid" ? "text-green-500" : "text-amber-500"}`}>
                          {levy.status === "paid" ? `Paid on ${levy.paidDate}` : "Pending"}
                        </div>
                      </div>
                      {levy.status === "pending" && <Button size="sm">Pay Now</Button>}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Financial Reports</CardTitle>
              <CardDescription>Access detailed financial statements and reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                {financialReports.map((report, index) => (
                  <div
                    key={report.id}
                    className={`flex items-center justify-between p-4 ${
                      index !== financialReports.length - 1 ? "border-b" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <div className="font-medium">{report.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {report.date} • {report.size}
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                      <Download className="h-4 w-4" />
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
