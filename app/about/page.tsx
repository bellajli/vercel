import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

export default function About() {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold tracking-tight">About Bella Gardens</h1>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Our Story</h2>
          <p>
            Bella Gardens was established in 2010 as a premier residential development in Sydney's eastern suburbs.
            Designed by award-winning architects, the complex was conceived as a harmonious blend of modern living and
            natural beauty.
          </p>
          <p>
            The distinctive cream-colored buildings with their clean lines and generous balconies were designed to
            maximize natural light and harbor views, while the extensive landscaping creates a sense of tranquility
            rarely found so close to the city center.
          </p>
          <p>
            Over the years, Bella Gardens has become known for its strong community spirit and exceptional property
            management, making it one of the most sought-after addresses in Sydney.
          </p>
        </div>
        <div className="relative h-[400px] rounded-xl overflow-hidden">
          <Image
            src="/images/garden-style-apartments.webp"
            alt="Bella Gardens Apartments"
            fill
            className="object-cover"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 py-8">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-2">Location</h3>
            <p className="text-muted-foreground">
              Situated in Sydney's prestigious eastern suburbs, Bella Gardens offers the perfect balance of urban
              convenience and natural beauty. With stunning harbor views and proximity to beaches, parks, and the CBD,
              residents enjoy the best of Sydney living.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-2">Architecture</h3>
            <p className="text-muted-foreground">
              Our cream-colored buildings feature contemporary design with sustainable elements including rooftop
              gardens, rainwater harvesting, and energy-efficient systems. The architecture emphasizes indoor-outdoor
              living with generous balconies and floor-to-ceiling windows.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-2">Gardens</h3>
            <p className="text-muted-foreground">
              The namesake gardens of Bella Gardens are a defining feature of the complex. Lush landscaping with native
              Australian plants, flowering perennials, and mature trees create a peaceful environment for residents to
              enjoy throughout the year.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="py-8">
        <h2 className="text-2xl font-semibold mb-6">Amenities</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex items-start gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium">Swimming Pool</h3>
              <p className="text-sm text-muted-foreground">Heated pool with sundeck and lounging area</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium">Fitness Center</h3>
              <p className="text-sm text-muted-foreground">Modern gym equipment and yoga space</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium">Community Room</h3>
              <p className="text-sm text-muted-foreground">Shared space for meetings and events</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium">Secure Parking</h3>
              <p className="text-sm text-muted-foreground">Underground parking with security access</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium">Garden Terraces</h3>
              <p className="text-sm text-muted-foreground">Landscaped outdoor spaces for relaxation</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium">24/7 Security</h3>
              <p className="text-sm text-muted-foreground">Building security and video surveillance</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
