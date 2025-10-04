"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CallTranscriptViewer } from "@/components/dashboard/call-transcript-viewer"
import { VoiceAssistantWidget } from "@/components/dashboard/voice-assistant-widget"
import { Phone, PhoneIncoming, Clock } from "lucide-react"

interface Call {
  id: string
  caller: string
  phone: string
  timestamp: string
  duration: string
  status: "active" | "completed" | "missed"
  transcript: {
    speaker: "caller" | "ai"
    message: string
    timestamp: string
  }[]
}

const mockCalls: Call[] = [
  {
    id: "1",
    caller: "John Smith",
    phone: "+1 (555) 123-4567",
    timestamp: "2 min ago",
    duration: "2m 15s",
    status: "active",
    transcript: [
      {
        speaker: "caller",
        message: "Hi, I need help with my recent order.",
        timestamp: "2:15 PM",
      },
      {
        speaker: "ai",
        message: "Hello! I'd be happy to help you with your order. Could you please provide your order number?",
        timestamp: "2:15 PM",
      },
      {
        speaker: "caller",
        message: "Sure, it's ORD-12345.",
        timestamp: "2:16 PM",
      },
      {
        speaker: "ai",
        message:
          "Thank you! I've found your order. It was placed on January 15th and is currently in transit. Would you like tracking information?",
        timestamp: "2:16 PM",
      },
    ],
  },
  {
    id: "2",
    caller: "Sarah Johnson",
    phone: "+1 (555) 234-5678",
    timestamp: "5 min ago",
    duration: "5m 23s",
    status: "completed",
    transcript: [
      {
        speaker: "caller",
        message: "I want to change my subscription plan.",
        timestamp: "2:10 PM",
      },
      {
        speaker: "ai",
        message: "I can help you with that. What plan would you like to switch to?",
        timestamp: "2:10 PM",
      },
    ],
  },
  {
    id: "3",
    caller: "Mike Wilson",
    phone: "+1 (555) 345-6789",
    timestamp: "12 min ago",
    duration: "8m 45s",
    status: "completed",
    transcript: [
      {
        speaker: "caller",
        message: "I have a question about billing.",
        timestamp: "2:03 PM",
      },
      {
        speaker: "ai",
        message: "I'm here to help with billing questions. What would you like to know?",
        timestamp: "2:03 PM",
      },
    ],
  },
]

export default function CallCenterPage() {
  const [selectedCall, setSelectedCall] = useState<Call | null>(mockCalls[0])
  const [isReceivingCalls, setIsReceivingCalls] = useState(false)

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="border-b border-border p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Call Center</h1>
            <p className="text-muted-foreground">Manage incoming calls with AI assistance</p>
          </div>
          <Button
            size="lg"
            onClick={() => setIsReceivingCalls(!isReceivingCalls)}
            className={isReceivingCalls ? "bg-destructive hover:bg-destructive/90" : ""}
          >
            <Phone className="h-4 w-4 mr-2" />
            {isReceivingCalls ? "Stop Receiving" : "Start Receiving Calls"}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 grid lg:grid-cols-[400px_1fr] overflow-hidden">
        {/* Call List */}
        <div className="border-r border-border overflow-y-auto">
          <div className="p-4 border-b border-border">
            <h2 className="font-semibold">Incoming Calls</h2>
            <p className="text-sm text-muted-foreground">{mockCalls.length} calls in queue</p>
          </div>
          <div className="divide-y divide-border">
            {mockCalls.map((call) => (
              <button
                key={call.id}
                onClick={() => setSelectedCall(call)}
                className={`w-full p-4 text-left hover:bg-muted/50 transition-colors ${
                  selectedCall?.id === call.id ? "bg-muted" : ""
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                      <PhoneIncoming className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">{call.caller}</p>
                      <p className="text-xs text-muted-foreground">{call.phone}</p>
                    </div>
                  </div>
                  <Badge variant={call.status === "active" ? "default" : "secondary"} className="text-xs">
                    {call.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground ml-12">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {call.timestamp}
                  </span>
                  <span>{call.duration}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Call Transcript */}
        <div className="p-6">
          <CallTranscriptViewer call={selectedCall} />
        </div>
      </div>

      {/* Voice Assistant Widget */}
      {isReceivingCalls && <VoiceAssistantWidget />}
    </div>
  )
}
