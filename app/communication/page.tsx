"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { PlusCircle, Paperclip, Send, MessageSquare } from "lucide-react"
import { format } from "date-fns"

export default function Communication() {
  const [isLoading, setIsLoading] = useState(true)
  const [threads, setThreads] = useState([
    {
      id: 1,
      title: "Budget allocation for garden renovation",
      author: "Bella Li",
      authorRole: "Chairperson",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      date: new Date("2025-04-01T09:30:00"),
      messages: [
        {
          id: 1,
          author: "Bella Li",
          authorRole: "Chairperson",
          authorAvatar: "/placeholder.svg?height=40&width=40",
          content:
            "Hello committee members, I'd like to discuss the budget allocation for the upcoming garden renovation project. The quotes we've received range from $15,000 to $22,000. What are your thoughts on which proposal offers the best value?",
          date: new Date("2025-04-01T09:30:00"),
          attachments: [{ name: "Garden_Renovation_Quotes.pdf", size: "1.2 MB" }],
        },
        {
          id: 2,
          author: "Madeleine Caspers",
          authorRole: "Treasurer",
          authorAvatar: "/placeholder.svg?height=40&width=40",
          content:
            "I've reviewed all the quotes and believe the $18,500 proposal from GreenScape Designs offers the best balance of quality and cost-effectiveness. They have excellent references from similar properties and their timeline is reasonable. I've attached my analysis of all the quotes for your review.",
          date: new Date("2025-04-01T11:45:00"),
          attachments: [{ name: "Quote_Analysis.xlsx", size: "0.8 MB" }],
        },
      ],
    },
  ])
  const [activeThread, setActiveThread] = useState(null)
  const [newMessage, setNewMessage] = useState("")
  const [newThreadTitle, setNewThreadTitle] = useState("")
  const [newThreadContent, setNewThreadContent] = useState("")
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    if (!isLoggedIn) {
      router.push("/login")
      return
    }
    setIsLoading(false)

    // Set the first thread as active by default
    if (threads.length > 0 && !activeThread) {
      setActiveThread(threads[0])
    }
  }, [router, threads, activeThread])

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const updatedThreads = threads.map((thread) => {
      if (thread.id === activeThread.id) {
        const newMsg = {
          id: thread.messages.length + 1,
          author: localStorage.getItem("userName") || "Committee Member",
          authorRole: localStorage.getItem("userRole") || "Member",
          authorAvatar: "/placeholder.svg?height=40&width=40",
          content: newMessage,
          date: new Date(),
          attachments: [],
        }

        return {
          ...thread,
          messages: [...thread.messages, newMsg],
        }
      }
      return thread
    })

    setThreads(updatedThreads)
    setActiveThread(updatedThreads.fin((t) => t.id === activeThread.id))
    setNewMessage("")
  }

  const handleCreateThread = () => {
    if (!newThreadTitle.trim() || !newThreadContent.trim()) return

    const newThread = {
      id: threads.length + 1,
      title: newThreadTitle,
      author: localStorage.getItem("userName") || "Committee Member",
      authorRole: localStorage.getItem("userRole") || "Member",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      date: new Date(),
      messages: [
        {
          id: 1,
          author: localStorage.getItem("userName") || "Committee Member",
          authorRole: localStorage.getItem("userRole") || "Member",
          authorAvatar: "/placeholder.svg?height=40&width=40",
          content: newThreadContent,
          date: new Date(),
          attachments: [],
        },
      ],
    }

    setThreads([newThread, ...threads])
    setActiveThread(newThread)
    setNewThreadTitle("")
    setNewThreadContent("")
  }

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-[60vh]">Loading...</div>
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Communication</h1>
          <p className="text-muted-foreground">Discuss important matters with other committee members</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <PlusCircle className="h-4 w-4" />
              New Thread
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Thread</DialogTitle>
              <DialogDescription>Start a new discussion with committee members</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium">
                  Title
                </label>
                <Input
                  id="title"
                  placeholder="Enter thread title"
                  value={newThreadTitle}
                  onChange={(e) => setNewThreadTitle(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <Textarea
                  id="message"
                  placeholder="Enter your message"
                  rows={5}
                  value={newThreadContent}
                  onChange={(e) => setNewThreadContent(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="attachment" className="text-sm font-medium">
                  Attachment (optional)
                </label>
                <Input id="attachment" type="file" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleCreateThread}>
                Create Thread
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid md:grid-cols-[300px_1fr] gap-6">
        {/* Thread List */}
        <Card className="md:max-h-[calc(100vh-200px)] overflow-auto">
          <CardHeader>
            <CardTitle>Threads</CardTitle>
            <CardDescription>{threads.length} discussion threads</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 p-0">
            {threads.map((thread) => (
              <div
                key={thread.id}
                className={`p-4 cursor-pointer hover:bg-muted/50 ${activeThread?.id === thread.id ? "bg-muted" : ""}`}
                onClick={() => setActiveThread(thread)}
              >
                <div className="font-medium">{thread.title}</div>
                <div className="flex items-center justify-between mt-1">
                  <div className="text-sm text-muted-foreground">By {thread.author}</div>
                  <div className="text-xs text-muted-foreground">{format(thread.date, "MMM d, yyyy")}</div>
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {thread.messages.length} message{thread.messages.length !== 1 ? "s" : ""}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Thread Messages */}
        {activeThread ? (
          <Card className="flex flex-col md:max-h-[calc(100vh-200px)]">
            <CardHeader className="border-b">
              <CardTitle>{activeThread.title}</CardTitle>
              <CardDescription>
                Started by {activeThread.author} on {format(activeThread.date, "MMMM d, yyyy")}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 overflow-auto p-0">
              <div className="space-y-6 p-6">
                {activeThread.messages.map((message) => (
                  <div key={message.id} className="flex gap-4">
                    <Avatar>
                      <AvatarImage src={message.authorAvatar} alt={message.author} />
                      <AvatarFallback>
                        {message.author
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-medium">{message.author}</span>
                          <span className="text-xs text-muted-foreground ml-2">{message.authorRole}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {format(message.date, "MMM d, yyyy 'at' h:mm a")}
                        </span>
                      </div>
                      <div className="text-sm">{message.content}</div>
                      {message.attachments && message.attachments.length > 0 && (
                        <div className="mt-2">
                          <p className="text-xs text-muted-foreground mb-1">Attachments:</p>
                          {message.attachments.map((attachment, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm text-primary hover:underline">
                              <Paperclip className="h-3 w-3" />
                              <span>{attachment.name}</span>
                              <span className="text-xs text-muted-foreground">({attachment.size})</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="border-t p-4">
              <div className="flex w-full items-center gap-2">
                <Button variant="outline" size="icon" className="shrink-0">
                  <Paperclip className="h-4 w-4" />
                  <span className="sr-only">Attach file</span>
                </Button>
                <Input
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      handleSendMessage()
                    }
                  }}
                />
                <Button className="shrink-0" onClick={handleSendMessage}>
                  <Send className="h-4 w-4 mr-2" />
                  Send
                </Button>
              </div>
            </CardFooter>
          </Card>
        ) : (
          <Card className="flex flex-col items-center justify-center p-6 text-center">
            <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">No Thread Selected</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Select a thread from the list or create a new one to start a discussion.
            </p>
          </Card>
        )}
      </div>
    </div>
  )
}
