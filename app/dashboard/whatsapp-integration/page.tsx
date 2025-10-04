"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { WhatsAppChat } from "@/components/dashboard/whatsapp-chat"
import { MessageSquare, Zap, Clock, CheckCircle2, Plus } from "lucide-react"
import { Switch } from "@/components/ui/switch"

const messageTemplates = [
  {
    id: "1",
    name: "Order Confirmation",
    content: "Hi {{name}}, your order {{order_id}} has been confirmed and will be delivered by {{date}}.",
    category: "Orders",
  },
  {
    id: "2",
    name: "Support Response",
    content: "Hello! Thank you for contacting us. How can we help you today?",
    category: "Support",
  },
  {
    id: "3",
    name: "Appointment Reminder",
    content: "Hi {{name}}, this is a reminder about your appointment on {{date}} at {{time}}.",
    category: "Appointments",
  },
]

const automationRules = [
  {
    id: "1",
    name: "Auto-reply to greetings",
    trigger: "Customer says hello",
    action: "Send welcome message",
    enabled: true,
  },
  {
    id: "2",
    name: "Order status inquiries",
    trigger: "Customer asks about order",
    action: "Fetch and send status",
    enabled: true,
  },
  {
    id: "3",
    name: "Business hours response",
    trigger: "Message outside hours",
    action: "Send availability info",
    enabled: false,
  },
]

export default function WhatsAppIntegrationPage() {
  const [activeTab, setActiveTab] = useState<"chat" | "templates" | "automation">("chat")
  const [isConnected, setIsConnected] = useState(true)

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">WhatsApp Integration</h1>
          <p className="text-muted-foreground">Manage customer conversations and automation</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant={isConnected ? "default" : "secondary"} className="text-sm">
            {isConnected ? "Connected" : "Disconnected"}
          </Badge>
          <Button variant="outline">
            <MessageSquare className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Chats</p>
                <p className="text-2xl font-bold">24</p>
              </div>
              <MessageSquare className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Response Time</p>
                <p className="text-2xl font-bold">45s</p>
              </div>
              <Clock className="h-8 w-8 text-accent" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Resolved Today</p>
                <p className="text-2xl font-bold">89</p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Automation Rate</p>
                <p className="text-2xl font-bold">76%</p>
              </div>
              <Zap className="h-8 w-8 text-accent" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-border">
        <button
          onClick={() => setActiveTab("chat")}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === "chat"
              ? "text-primary border-b-2 border-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Chat
        </button>
        <button
          onClick={() => setActiveTab("templates")}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === "templates"
              ? "text-primary border-b-2 border-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Templates
        </button>
        <button
          onClick={() => setActiveTab("automation")}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === "automation"
              ? "text-primary border-b-2 border-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Automation
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "chat" && (
        <div className="h-[600px]">
          <WhatsAppChat />
        </div>
      )}

      {activeTab === "templates" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">{messageTemplates.length} message templates</p>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Template
            </Button>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {messageTemplates.map((template) => (
              <Card key={template.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <Badge variant="secondary" className="mt-2">
                        {template.category}
                      </Badge>
                    </div>
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{template.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {activeTab === "automation" && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Automation Rules</CardTitle>
              <CardDescription>Configure AI responses and automated workflows</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {automationRules.map((rule) => (
                <div key={rule.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="space-y-1">
                    <p className="font-medium">{rule.name}</p>
                    <p className="text-sm text-muted-foreground">
                      When: {rule.trigger} → Then: {rule.action}
                    </p>
                  </div>
                  <Switch checked={rule.enabled} />
                </div>
              ))}
              <Button variant="outline" className="w-full bg-transparent">
                <Plus className="h-4 w-4 mr-2" />
                Add New Rule
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
