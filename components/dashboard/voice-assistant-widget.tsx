"use client"

import { useState, useEffect } from "react"
import { Mic } from "lucide-react"

export function VoiceAssistantWidget() {
  const [isActive, setIsActive] = useState(false)
  const [status, setStatus] = useState<"listening" | "responding" | "idle">("idle")

  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        setStatus((prev) => {
          if (prev === "listening") return "responding"
          if (prev === "responding") return "listening"
          return "listening"
        })
      }, 3000)
      return () => clearInterval(interval)
    } else {
      setStatus("idle")
    }
  }, [isActive])

  if (!isActive) return null

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="relative">
        <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center shadow-lg">
          <Mic className="h-8 w-8 text-primary-foreground" />
        </div>
        {status !== "idle" && (
          <>
            <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-75" />
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap bg-card border border-border rounded-lg px-3 py-1.5 shadow-lg">
              <p className="text-xs font-medium capitalize">{status}...</p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
