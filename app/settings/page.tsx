import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
      <p className="text-muted-foreground">Manage your account settings and preferences</p>

      <Tabs defaultValue="notifications">
        <TabsList className="mb-4">
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Configure how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="email-notifications" className="flex flex-col space-y-1">
                  <span>Email Notifications</span>
                  <span className="text-sm font-normal text-muted-foreground">Receive notifications via email</span>
                </Label>
                <Switch id="email-notifications" defaultChecked />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="maintenance-updates" className="flex flex-col space-y-1">
                  <span>Maintenance Updates</span>
                  <span className="text-sm font-normal text-muted-foreground">
                    Receive updates about maintenance requests
                  </span>
                </Label>
                <Switch id="maintenance-updates" defaultChecked />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="meeting-reminders" className="flex flex-col space-y-1">
                  <span>Meeting Reminders</span>
                  <span className="text-sm font-normal text-muted-foreground">
                    Receive reminders about upcoming meetings
                  </span>
                </Label>
                <Switch id="meeting-reminders" defaultChecked />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="document-updates" className="flex flex-col space-y-1">
                  <span>Document Updates</span>
                  <span className="text-sm font-normal text-muted-foreground">
                    Receive notifications when new documents are added
                  </span>
                </Label>
                <Switch id="document-updates" defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>Customize how the portal looks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="dark-mode" className="flex flex-col space-y-1">
                  <span>Dark Mode</span>
                  <span className="text-sm font-normal text-muted-foreground">Use dark theme for the portal</span>
                </Label>
                <Switch id="dark-mode" />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="compact-view" className="flex flex-col space-y-1">
                  <span>Compact View</span>
                  <span className="text-sm font-normal text-muted-foreground">
                    Display more content with less spacing
                  </span>
                </Label>
                <Switch id="compact-view" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security</CardTitle>
              <CardDescription>Manage your account security</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="two-factor" className="flex flex-col space-y-1">
                  <span>Two-Factor Authentication</span>
                  <span className="text-sm font-normal text-muted-foreground">
                    Add an extra layer of security to your account
                  </span>
                </Label>
                <Switch id="two-factor" />
              </div>
              <div className="pt-4">
                <Button variant="outline">Change Password</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
