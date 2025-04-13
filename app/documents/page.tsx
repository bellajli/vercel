"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Download, Eye, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Documents() {
  const [searchQuery, setSearchQuery] = useState("")
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

  const documentCategories = [
    {
      id: "meeting-minutes",
      name: "Meeting Minutes",
      documents: [
        { id: 1, name: "Annual General Meeting Minutes - March 2025", date: "March 25, 2025", size: "1.4 MB" },
        { id: 2, name: "Committee Meeting - February 2025", date: "February 15, 2025", size: "0.9 MB" },
        { id: 3, name: "Committee Meeting - January 2025", date: "January 18, 2025", size: "1.1 MB" },
        { id: 4, name: "Committee Meeting - December 2024", date: "December 14, 2024", size: "0.8 MB" },
        { id: 5, name: "Special General Meeting - November 2024", date: "November 30, 2024", size: "1.2 MB" },
      ],
    },
    {
      id: "bylaws",
      name: "Bylaws & Regulations",
      documents: [
        { id: 6, name: "Strata Scheme Management Act 2015 - NSW", date: "January 1, 2025", size: "3.2 MB" },
        { id: 7, name: "Garden Maintenance & Green Waste Disposal By-laws", date: "January 1, 2025", size: "0.7 MB" },
        { id: 8, name: "View Preservation & Window Furnishing Standards", date: "January 1, 2025", size: "0.6 MB" },
        { id: 9, name: "Noise Restrictions & Shared Amenities Usage By-laws", date: "January 1, 2025", size: "0.8 MB" },
        { id: 10, name: "Smoking & Vaping Prohibition By-laws", date: "January 1, 2025", size: "0.5 MB" },
      ],
    },
    {
      id: "financial",
      name: "Financial Reports",
      documents: [
        { id: 11, name: "Q1 2025 Financial Statement", date: "April 5, 2025", size: "1.8 MB" },
        { id: 12, name: "2024 Annual Financial Report", date: "January 31, 2025", size: "3.5 MB" },
        { id: 13, name: "Budget 2025", date: "December 15, 2024", size: "1.3 MB" },
        { id: 14, name: "Q4 2024 Financial Statement", date: "January 10, 2025", size: "1.7 MB" },
        { id: 15, name: "Capital Works Fund Forecast 2025-2030", date: "March 1, 2025", size: "2.1 MB" },
      ],
    },
    {
      id: "insurance",
      name: "Insurance",
      documents: [
        { id: 16, name: "Building Insurance Policy 2025", date: "March 1, 2025", size: "4.8 MB" },
        { id: 17, name: "Insurance Certificate", date: "March 1, 2025", size: "0.9 MB" },
        { id: 18, name: "Public Liability Insurance", date: "March 1, 2025", size: "1.2 MB" },
        { id: 19, name: "Workers Compensation Insurance", date: "March 1, 2025", size: "1.0 MB" },
        { id: 20, name: "Insurance Valuation Report", date: "February 15, 2025", size: "2.3 MB" },
      ],
    },
  ]

  // Filter documents based on search query
  const filteredCategories = documentCategories.map((category) => {
    return {
      ...category,
      documents: category.documents.filter(
        (doc) =>
          doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          doc.date.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    }
  })

  // Count total filtered documents
  const totalFilteredDocs = filteredCategories.reduce((total, category) => total + category.documents.length, 0)

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-[60vh]">Loading...</div>
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold tracking-tight">Documents</h1>
      <p className="text-muted-foreground">
        Access all important documents related to Bella Gardens strata management.
      </p>

      <div className="flex items-center gap-2 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search documents..."
          className="pl-9 max-w-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <Button variant="ghost" size="sm" onClick={() => setSearchQuery("")}>
            Clear
          </Button>
        )}
      </div>

      {searchQuery && (
        <p className="text-sm text-muted-foreground">
          Found {totalFilteredDocs} document{totalFilteredDocs !== 1 ? "s" : ""} matching "{searchQuery}"
        </p>
      )}

      <Tabs defaultValue={documentCategories[0].id}>
        <TabsList className="mb-4">
          {documentCategories.map((category) => (
            <TabsTrigger key={category.id} value={category.id}>
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {filteredCategories.map((category) => (
          <TabsContent key={category.id} value={category.id}>
            <Card>
              <CardHeader>
                <CardTitle>{category.name}</CardTitle>
                <CardDescription>
                  {category.documents.length} document{category.documents.length !== 1 ? "s" : ""} available
                  {searchQuery && ` matching "${searchQuery}"`}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {category.documents.length > 0 ? (
                  <div className="rounded-md border">
                    {category.documents.map((doc, index) => (
                      <div
                        key={doc.id}
                        className={`flex items-center justify-between p-4 ${
                          index !== category.documents.length - 1 ? "border-b" : ""
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <div className="font-medium">{doc.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {doc.date} • {doc.size}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="icon">
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">View</span>
                          </Button>
                          <Button variant="outline" size="icon">
                            <Download className="h-4 w-4" />
                            <span className="sr-only">Download</span>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">No documents found matching your search.</div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
