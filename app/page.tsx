import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronRight, MapPin, Building, Users, FileText, Bell } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col gap-8">
      {/* Hero Section */}
      <section className="relative w-full h-[500px] md:h-[600px] overflow-hidden rounded-xl">
        <Image
          src="/images/garden-style-apartments.webp"
          alt="Bella Gardens Apartments"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6 md:p-10">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">Bella Gardens</h1>
          <p className="text-xl text-white/90 max-w-2xl">Luxury apartment living in the heart of Sydney</p>
          <div className="flex gap-4 mt-6">
            <Button size="lg" asChild>
              <Link href="/login">Committee Portal</Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="bg-white/10 backdrop-blur-sm text-white border-white/20 hover:bg-white/20 hover:text-white"
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold tracking-tight">Welcome to Bella Gardens</h2>
          <p className="text-muted-foreground">
            Nestled in Sydney's prestigious eastern suburbs, Bella Gardens is a boutique apartment complex that combines
            elegant architecture with lush landscaping and breathtaking harbour views.
          </p>
          <p className="text-muted-foreground">
            Our distinctive cream-colored buildings with their modern lines and generous balconies are set amidst
            meticulously maintained gardens, creating a tranquil oasis just minutes from the city center.
          </p>
          <p className="text-muted-foreground">
            Residents enjoy premium amenities including a swimming pool, fitness center, and community spaces, all
            managed by a dedicated strata committee committed to maintaining the highest standards of living.
          </p>
          <div className="pt-4">
            <Button asChild>
              <Link href="/committee">
                Meet Our Committee <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="relative aspect-square rounded-lg overflow-hidden">
              <Image src="/images/sydney-view.jpeg" alt="Sydney Harbour View" fill className="object-cover" />
            </div>
            <div className="relative aspect-square rounded-lg overflow-hidden">
              <Image src="/images/rooftop-garden.jpeg" alt="Rooftop Garden" fill className="object-cover" />
            </div>
          </div>
          <div className="relative aspect-[9/16] rounded-lg overflow-hidden">
            <Image
              src="/images/garden-style-apartments.webp"
              alt="Bella Gardens Apartments"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-8">
        <h2 className="text-3xl font-bold tracking-tight mb-6">Property Features</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Building className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium text-lg mb-2">Modern Architecture</h3>
              <p className="text-sm text-muted-foreground">
                Contemporary cream-colored buildings with spacious balconies and rooftop gardens
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium text-lg mb-2">Prime Location</h3>
              <p className="text-sm text-muted-foreground">
                Stunning harbour views just minutes from Sydney's CBD and eastern beaches
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium text-lg mb-2">Community Living</h3>
              <p className="text-sm text-muted-foreground">
                Vibrant community with shared spaces and regular resident events
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium text-lg mb-2">Professional Management</h3>
              <p className="text-sm text-muted-foreground">
                Dedicated strata committee ensuring exceptional building maintenance
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Resident Portal Preview */}
      <section className="py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Committee Portal</h2>
            <p className="text-muted-foreground">
              Access important information and services for Bella Gardens committee members
            </p>
          </div>
          <Button asChild>
            <Link href="/login">Login to Portal</Link>
          </Button>
        </div>

        <Tabs defaultValue="dashboard">
          <TabsList className="mb-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          </TabsList>
          <TabsContent value="dashboard" className="border rounded-lg p-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-medium mb-2">Announcements</h3>
                  <p className="text-sm text-muted-foreground">View the latest building announcements and updates</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-medium mb-2">Documents</h3>
                  <p className="text-sm text-muted-foreground">Access important strata documents and reports</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-medium mb-2">Maintenance</h3>
                  <p className="text-sm text-muted-foreground">Submit and track maintenance requests</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-medium mb-2">Financial Overview</h3>
                  <p className="text-sm text-muted-foreground">View fund balances and levy information</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="documents" className="border rounded-lg p-6">
            <div className="space-y-4">
              <h3 className="font-medium">Important Documents</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Access meeting minutes, bylaws, and financial reports
              </p>
              <div className="grid gap-2">
                <div className="flex items-center p-2 border rounded-md">
                  <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">AGM Minutes - March 2023</span>
                </div>
                <div className="flex items-center p-2 border rounded-md">
                  <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">Strata Bylaws 2023</span>
                </div>
                <div className="flex items-center p-2 border rounded-md">
                  <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">Q1 2023 Financial Statement</span>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="maintenance" className="border rounded-lg p-6">
            <div className="space-y-4">
              <h3 className="font-medium">Maintenance Requests</h3>
              <p className="text-sm text-muted-foreground mb-4">Submit and track building maintenance issues</p>
              <Button size="sm">New Request</Button>
            </div>
          </TabsContent>
        </Tabs>
      </section>
      <section className="py-8">
        <h2 className="text-3xl font-bold tracking-tight mb-6">News & Events</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4 text-primary">
                <Bell className="h-5 w-5" />
                <h3 className="font-medium text-lg">Upcoming Community Event</h3>
              </div>
              <div className="relative aspect-video rounded-md overflow-hidden mb-4">
                <Image src="/images/rooftop-garden.jpeg" alt="Community BBQ" fill className="object-cover" />
              </div>
              <h4 className="font-semibold text-lg mb-2">Community BBQ</h4>
              <p className="text-muted-foreground mb-2">
                Join us for a community BBQ in the garden courtyard. Meet your neighbors and enjoy good food!
              </p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                <span>April 16, 2025 • 12:00 PM - 3:00 PM</span>
              </div>
              {/* No button needed here */}
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4 text-primary">
                <Bell className="h-5 w-5" />
                <h3 className="font-medium text-lg">Latest Announcements</h3>
              </div>
              <div className="space-y-4">
                <div className="border-b pb-4">
                  <h4 className="font-medium">Annual General Meeting Results</h4>
                  <p className="text-sm text-muted-foreground mb-1">
                    The results of the recent AGM are now available in the documents section.
                  </p>
                  <p className="text-xs text-muted-foreground">March 30, 2025</p>
                </div>
                <div className="border-b pb-4">
                  <h4 className="font-medium">Garden Renovation Complete</h4>
                  <p className="text-sm text-muted-foreground mb-1">
                    The renovation of the central garden area has been completed. Thank you for your patience.
                  </p>
                  <p className="text-xs text-muted-foreground">March 15, 2025</p>
                </div>
                <div>
                  <h4 className="font-medium">New Recycling Guidelines</h4>
                  <p className="text-sm text-muted-foreground mb-1">
                    Please review the updated recycling guidelines for the building.
                  </p>
                  <p className="text-xs text-muted-foreground">March 5, 2025</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
