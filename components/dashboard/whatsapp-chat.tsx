"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Send, Paperclip, Smile, User, Bot } from "lucide-react"

interface Message {
  id: string
  sender: "customer" | "ai" | "agent"
  content: string
  timestamp: string
}

interface Conversation {
  id: string
  customer: string
  phone: string
  lastMessage: string
  timestamp: string
  unread: number
  status: "active" | "resolved" | "pending"
  messages: Message[]
}

const mockConversations: Conversation[] = [
  {
    id: "1",
    customer: "Alice Cooper",
    phone: "+1 (555) 111-2222",
    lastMessage: "Thanks for the help!",
    timestamp: "2m ago",
    unread: 0,
    status: "resolved",
    messages: [
      { id: "1", sender: "customer", content: "Hi, I need help with my order", timestamp: "10:30 AM" },
      {
        id: "2",
        sender: "ai",
        content: "Hello! I'd be happy to help. What's your order number?",
        timestamp: "10:30 AM",
      },
      { id: "3", sender: "customer", content: "ORD-12345", timestamp: "10:31 AM" },
      {
        id: "4",
        sender: "ai",
        content: "I found your order. It's scheduled for delivery tomorrow.",
        timestamp: "10:31 AM",
      },
      { id: "5", sender: "customer", content: "Thanks for the help!", timestamp: "10:32 AM" },
    ],
  },
  {
    id: "2",
    customer: "Bob Martinez",
    phone: "+1 (555) 222-3333",
    lastMessage: "Can I change my subscription?",
    timestamp: "5m ago",
    unread: 2,
    status: "active",
    messages: [
      { id: "1", sender: "customer", content: "Can I change my subscription?", timestamp: "10:25 AM" },
      { id: "2", sender: "ai", content: "Of course! What plan would you like to switch to?", timestamp: "10:25 AM" },
    ],
  },
  {
    id: "3",
    customer: "Carol White",
    phone: "+1 (555) 333-4444",
    lastMessage: "Is this available in blue?",
    timestamp: "15m ago",
    unread: 1,
    status: "pending",
    messages: [{ id: "1", sender: "customer", content: "Is this available in blue?", timestamp: "10:15 AM" }],
  },
]

export function WhatsAppChat() {
  const [selectedConversation, setSelectedConversation] = useState<Conversation>(mockConversations[0])
  const [messageInput, setMessageInput] = useState("")

  const handleSendMessage = () => {
    if (!messageInput.trim()) return
    console.log("[v0] Sending message:", messageInput)
    setMessageInput("")
  }

  return (
    <div className="grid lg:grid-cols-[350px_1fr] h-full border border-border rounded-lg overflow-hidden">
      {/* Conversations List */}
      <div className="border-r border-border overflow-y-auto bg-card">
        <div className="p-4 border-b border-border">
          <h3 className="font-semibold">Conversations</h3>
          <p className="text-sm text-muted-foreground">{mockConversations.length} active chats</p>
        </div>
        <div className="divide-y divide-border">
          {mockConversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => setSelectedConversation(conv)}
              className={`w-full p-4 text-left hover:bg-muted/50 transition-colors ${
                selectedConversation.id === conv.id ? "bg-muted" : ""
              }`}
            >
              <div className="flex items-start justify-between mb-1">
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <User className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{conv.customer}</p>
                    <p className="text-xs text-muted-foreground truncate">{conv.phone}</p>
                  </div>
                </div>
                {conv.unread > 0 && (
                  <Badge
                    variant="default"
                    className="h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                  >
                    {conv.unread}
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground truncate ml-12">{conv.lastMessage}</p>
              <div className="flex items-center justify-between mt-1 ml-12">
                <span className="text-xs text-muted-foreground">{conv.timestamp}</span>
                <Badge variant={conv.status === "active" ? "default" : "secondary"} className="text-xs">
                  {conv.status}
                </Badge>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex flex-col bg-background">
        {/* Chat Header */}
        <div className="p-4 border-b border-border bg-card">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                <User className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold">{selectedConversation.customer}</p>
                <p className="text-xs text-muted-foreground">{selectedConversation.phone}</p>
              </div>
            </div>
            <Badge variant={selectedConversation.status === "active" ? "default" : "secondary"}>
              {selectedConversation.status}
            </Badge>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {selectedConversation.messages.map((message) => (
            <div key={message.id} className={`flex gap-3 ${message.sender !== "customer" ? "flex-row-reverse" : ""}`}>
              <div
                className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.sender === "customer" ? "bg-muted" : "bg-primary/20"
                }`}
              >
                {message.sender === "customer" ? (
                  <User className="h-4 w-4" />
                ) : (
                  <Bot className="h-4 w-4 text-primary" />
                )}
              </div>
              <div className={`flex-1 ${message.sender !== "customer" ? "text-right" : ""}`}>
                <div
                  className={`inline-block rounded-lg px-4 py-2 max-w-[80%] ${
                    message.sender === "customer" ? "bg-muted" : "bg-primary/10"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{message.timestamp}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="p-4 border-t border-border bg-card">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Paperclip className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Smile className="h-4 w-4" />
            </Button>
            <Input
              placeholder="Type a message..."
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              className="flex-1"
            />
            <Button onClick={handleSendMessage}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
