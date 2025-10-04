"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Phone, User, Bot } from "lucide-react"

interface CallData {
  id: string
  caller: string
  phone: string
  timestamp: string
  status: "active" | "completed" | "missed"
  transcript: {
    speaker: "caller" | "ai"
    message: string
    timestamp: string
  }[]
}

interface CallTranscriptViewerProps {
  call: CallData | null
}

export function CallTranscriptViewer({ call }: CallTranscriptViewerProps) {
  if (!call) {
    return (
      <Card className="h-full">
        <CardContent className="flex items-center justify-center h-full">
          <div className="text-center space-y-2">
            <Phone className="h-12 w-12 text-muted-foreground mx-auto" />
            <p className="text-muted-foreground">Select a call to view transcript</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">{call.caller}</CardTitle>
            <p className="text-sm text-muted-foreground">{call.phone}</p>
          </div>
          <Badge variant={call.status === "active" ? "default" : "secondary"}>{call.status}</Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
        {call.transcript.map((entry, index) => (
          <div key={index} className={`flex gap-3 ${entry.speaker === "ai" ? "flex-row-reverse" : ""}`}>
            <div
              className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                entry.speaker === "ai" ? "bg-primary/20" : "bg-muted"
              }`}
            >
              {entry.speaker === "ai" ? <Bot className="h-4 w-4 text-primary" /> : <User className="h-4 w-4" />}
            </div>
            <div className={`flex-1 ${entry.speaker === "ai" ? "text-right" : ""}`}>
              <div
                className={`inline-block rounded-lg px-4 py-2 ${
                  entry.speaker === "ai" ? "bg-primary/10 text-foreground" : "bg-muted"
                }`}
              >
                <p className="text-sm">{entry.message}</p>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{entry.timestamp}</p>
            </div>
          </div>
        ))}
      </CardContent>
      <div className="border-t border-border p-4">
        <div className="flex gap-2">
          <Button variant="outline" className="flex-1 bg-transparent">
            Transfer Call
          </Button>
          <Button variant="outline" className="flex-1 bg-transparent">
            Manual Override
          </Button>
          <Button variant="destructive" className="flex-1">
            End Call
          </Button>
        </div>
      </div>
    </Card>
  )
}
