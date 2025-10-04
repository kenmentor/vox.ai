"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Phone, MessageSquare, Mail, MapPin, Calendar, TrendingUp } from "lucide-react"

interface Customer {
  id: string
  name: string
  email: string
  phone: string
  location: string
  joinDate: string
  status: "active" | "inactive" | "vip"
  totalCalls: number
  totalMessages: number
  satisfaction: number
  interactions: {
    id: string
    type: "call" | "whatsapp" | "email"
    subject: string
    date: string
    status: "resolved" | "pending" | "escalated"
  }[]
}

interface CustomerDetailPanelProps {
  customer: Customer | null
  onClose: () => void
}

export function CustomerDetailPanel({ customer, onClose }: CustomerDetailPanelProps) {
  if (!customer) return null

  return (
    <div className="space-y-6">
      {/* Customer Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">{customer.name.charAt(0)}</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold">{customer.name}</h2>
                <Badge variant={customer.status === "vip" ? "default" : "secondary"} className="mt-1">
                  {customer.status.toUpperCase()}
                </Badge>
              </div>
            </div>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>

          <div className="grid gap-3 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Mail className="h-4 w-4" />
              {customer.email}
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Phone className="h-4 w-4" />
              {customer.phone}
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              {customer.location}
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              Customer since {customer.joinDate}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Calls</p>
                <p className="text-2xl font-bold">{customer.totalCalls}</p>
              </div>
              <Phone className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Messages</p>
                <p className="text-2xl font-bold">{customer.totalMessages}</p>
              </div>
              <MessageSquare className="h-8 w-8 text-accent" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Satisfaction</p>
                <p className="text-2xl font-bold">{customer.satisfaction}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Interaction History */}
      <Card>
        <CardHeader>
          <CardTitle>Interaction History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {customer.interactions.map((interaction) => (
              <div
                key={interaction.id}
                className="flex items-center justify-between p-3 border border-border rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                    {interaction.type === "call" && <Phone className="h-4 w-4" />}
                    {interaction.type === "whatsapp" && <MessageSquare className="h-4 w-4" />}
                    {interaction.type === "email" && <Mail className="h-4 w-4" />}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{interaction.subject}</p>
                    <p className="text-xs text-muted-foreground">{interaction.date}</p>
                  </div>
                </div>
                <Badge
                  variant={
                    interaction.status === "resolved"
                      ? "default"
                      : interaction.status === "escalated"
                        ? "destructive"
                        : "secondary"
                  }
                >
                  {interaction.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-3 md:grid-cols-2">
        <Button variant="outline" className="bg-transparent">
          <Phone className="h-4 w-4 mr-2" />
          Call Customer
        </Button>
        <Button variant="outline" className="bg-transparent">
          <MessageSquare className="h-4 w-4 mr-2" />
          Send Message
        </Button>
      </div>
    </div>
  )
}
