"use client"

import { useState } from "react"
import { Bell, Phone, MessageSquare, AlertCircle, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

interface Notification {
  id: string
  type: "call" | "message" | "system" | "success"
  title: string
  description: string
  timestamp: string
  read: boolean
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "call",
    title: "Missed Call",
    description: "John Smith tried to reach you",
    timestamp: "2 min ago",
    read: false,
  },
  {
    id: "2",
    type: "message",
    title: "New Customer Message",
    description: "Sarah Johnson sent a WhatsApp message",
    timestamp: "5 min ago",
    read: false,
  },
  {
    id: "3",
    type: "system",
    title: "System Update",
    description: "AI model updated to v2.1.0",
    timestamp: "1 hour ago",
    read: true,
  },
  {
    id: "4",
    type: "success",
    title: "Call Completed",
    description: "Mike Wilson's issue resolved successfully",
    timestamp: "2 hours ago",
    read: true,
  },
]

export function NotificationsDropdown() {
  const [notifications, setNotifications] = useState(mockNotifications)
  const unreadCount = notifications.filter((n) => !n.read).length

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "call":
        return <Phone className="h-4 w-4 text-blue-500" />
      case "message":
        return <MessageSquare className="h-4 w-4 text-cyan-500" />
      case "system":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />
    }
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Notifications</span>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead} className="h-auto p-0 text-xs">
              Mark all as read
            </Button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="max-h-[400px] overflow-y-auto">
          {notifications.map((notification) => (
            <DropdownMenuItem
              key={notification.id}
              className={`flex items-start gap-3 p-3 cursor-pointer ${!notification.read ? "bg-muted/50" : ""}`}
            >
              <div className="mt-0.5">{getIcon(notification.type)}</div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">{notification.title}</p>
                <p className="text-xs text-muted-foreground">{notification.description}</p>
                <p className="text-xs text-muted-foreground">{notification.timestamp}</p>
              </div>
              {!notification.read && <div className="h-2 w-2 rounded-full bg-primary" />}
            </DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
