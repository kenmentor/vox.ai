"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Zap, Activity, Radio, Cpu } from "lucide-react"

export default function SystemCorePage() {
  const [isOpen, setIsOpen] = useState(false)
  const [showSimulation, setShowSimulation] = useState(false)
  const [callStep, setCallStep] = useState(0)

  useEffect(() => {
    // Door opening animation
    setTimeout(() => setIsOpen(true), 100)
  }, [])

  const startSimulation = () => {
    setShowSimulation(true)
    setCallStep(0)

    // Simulate call flow
    const steps = [1, 2, 3, 4, 5]
    steps.forEach((step, index) => {
      setTimeout(() => setCallStep(step), (index + 1) * 2000)
    })

    setTimeout(() => {
      setShowSimulation(false)
      setCallStep(0)
    }, 12000)
  }

  return (
    <div className="relative h-full overflow-hidden">
      {/* Door opening animation */}
      <div className="absolute inset-0 flex">
        <div
          className={`w-1/2 h-full bg-background border-r-2 border-primary transition-all duration-1000 ${
            isOpen ? "-translate-x-full" : ""
          }`}
        />
        <div
          className={`w-1/2 h-full bg-background border-l-2 border-primary transition-all duration-1000 ${
            isOpen ? "translate-x-full" : ""
          }`}
        />
      </div>

      {/* Main content */}
      <div
        className={`relative z-10 h-full p-6 transition-opacity duration-1000 ${isOpen ? "opacity-100" : "opacity-0"}`}
      >
        <div className="space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Zap className="h-8 w-8 text-primary animate-pulse" />
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Core AI Operations
              </h1>
            </div>
            <p className="text-muted-foreground">Visual simulation of the AI call center's inner workings</p>
          </div>

          {/* AI Network Visualization */}
          <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
            <CardContent className="p-8">
              <div className="relative h-[400px]">
                {/* Connection nodes */}
                <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2">
                  <div className="relative">
                    <div className="h-16 w-16 rounded-full bg-primary/20 border-2 border-primary animate-pulse flex items-center justify-center">
                      <Radio className="h-8 w-8 text-primary" />
                    </div>
                    <div className="absolute inset-0 h-16 w-16 rounded-full bg-primary/10 animate-ping" />
                  </div>
                  <p className="text-xs text-center mt-2 text-muted-foreground">Input</p>
                </div>

                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="relative">
                    <div className="h-20 w-20 rounded-full bg-accent/20 border-2 border-accent animate-pulse flex items-center justify-center">
                      <Cpu className="h-10 w-10 text-accent" />
                    </div>
                    <div className="absolute inset-0 h-20 w-20 rounded-full bg-accent/10 animate-ping" />
                  </div>
                  <p className="text-xs text-center mt-2 text-muted-foreground">AI Core</p>
                </div>

                <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 translate-y-1/2">
                  <div className="relative">
                    <div className="h-16 w-16 rounded-full bg-primary/20 border-2 border-primary animate-pulse flex items-center justify-center">
                      <Activity className="h-8 w-8 text-primary" />
                    </div>
                    <div className="absolute inset-0 h-16 w-16 rounded-full bg-primary/10 animate-ping" />
                  </div>
                  <p className="text-xs text-center mt-2 text-muted-foreground">Processing</p>
                </div>

                <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2">
                  <div className="relative">
                    <div className="h-16 w-16 rounded-full bg-accent/20 border-2 border-accent animate-pulse flex items-center justify-center">
                      <Radio className="h-8 w-8 text-accent" />
                    </div>
                    <div className="absolute inset-0 h-16 w-16 rounded-full bg-accent/10 animate-ping" />
                  </div>
                  <p className="text-xs text-center mt-2 text-muted-foreground">Output</p>
                </div>

                {/* Animated connection lines */}
                <svg className="absolute inset-0 w-full h-full">
                  <line
                    x1="25%"
                    y1="50%"
                    x2="50%"
                    y2="25%"
                    stroke="url(#gradient1)"
                    strokeWidth="2"
                    className="animate-pulse"
                  />
                  <line
                    x1="50%"
                    y1="25%"
                    x2="50%"
                    y2="75%"
                    stroke="url(#gradient2)"
                    strokeWidth="2"
                    className="animate-pulse"
                  />
                  <line
                    x1="50%"
                    y1="75%"
                    x2="75%"
                    y2="50%"
                    stroke="url(#gradient1)"
                    strokeWidth="2"
                    className="animate-pulse"
                  />
                  <defs>
                    <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
                      <stop offset="50%" stopColor="#3b82f6" stopOpacity="1" />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.2" />
                    </linearGradient>
                    <linearGradient id="gradient2" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.2" />
                      <stop offset="50%" stopColor="#22d3ee" stopOpacity="1" />
                      <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.2" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Sync wave effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent animate-wave" />
              </div>
            </CardContent>
          </Card>

          {/* AI Call Simulation */}
          <Card className="border-primary/20">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">AI Call Center Interface Preview</h2>
                <Button onClick={startSimulation} disabled={showSimulation}>
                  {showSimulation ? "Simulating..." : "Start Simulation"}
                </Button>
              </div>

              {showSimulation && (
                <div className="space-y-4 animate-in fade-in duration-500">
                  {/* Ringing */}
                  {callStep >= 1 && (
                    <div className="flex items-center gap-3 animate-in slide-in-from-left duration-500">
                      <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center animate-pulse">
                        <Radio className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1 p-3 rounded-lg bg-muted">
                        <p className="text-sm font-medium">Incoming call...</p>
                        <div className="flex gap-1 mt-2">
                          <div className="h-2 w-2 rounded-full bg-primary animate-bounce" />
                          <div className="h-2 w-2 rounded-full bg-primary animate-bounce delay-100" />
                          <div className="h-2 w-2 rounded-full bg-primary animate-bounce delay-200" />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Customer answers */}
                  {callStep >= 2 && (
                    <div className="flex items-start gap-3 animate-in slide-in-from-right duration-500">
                      <div className="flex-1 p-3 rounded-lg bg-accent/10 border border-accent/20">
                        <p className="text-sm font-medium text-accent">Customer</p>
                        <p className="text-sm mt-1">Hello, I need help with my order.</p>
                        <div className="h-8 w-32 mt-2 bg-gradient-to-r from-accent/50 to-transparent rounded animate-pulse" />
                      </div>
                    </div>
                  )}

                  {/* AI responds */}
                  {callStep >= 3 && (
                    <div className="flex items-start gap-3 animate-in slide-in-from-left duration-500">
                      <div className="flex-1 p-3 rounded-lg bg-primary/10 border border-primary/20">
                        <p className="text-sm font-medium text-primary">AI Assistant</p>
                        <p className="text-sm mt-1">
                          Hello! I'd be happy to help. Could you provide your order number?
                        </p>
                        <div className="h-8 w-48 mt-2 bg-gradient-to-r from-primary/50 to-transparent rounded animate-pulse" />
                      </div>
                    </div>
                  )}

                  {/* Customer replies */}
                  {callStep >= 4 && (
                    <div className="flex items-start gap-3 animate-in slide-in-from-right duration-500">
                      <div className="flex-1 p-3 rounded-lg bg-accent/10 border border-accent/20">
                        <p className="text-sm font-medium text-accent">Customer</p>
                        <p className="text-sm mt-1">Sure, it's ORD-12345.</p>
                        <div className="h-8 w-24 mt-2 bg-gradient-to-r from-accent/50 to-transparent rounded animate-pulse" />
                      </div>
                    </div>
                  )}

                  {/* AI resolves */}
                  {callStep >= 5 && (
                    <div className="flex items-start gap-3 animate-in slide-in-from-left duration-500">
                      <div className="flex-1 p-3 rounded-lg bg-primary/10 border border-primary/20">
                        <p className="text-sm font-medium text-primary">AI Assistant</p>
                        <p className="text-sm mt-1">
                          Found it! Your order is in transit and will arrive tomorrow. Tracking: TRK-789.
                        </p>
                        <div className="h-8 w-56 mt-2 bg-gradient-to-r from-primary/50 to-transparent rounded animate-pulse" />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {!showSimulation && (
                <div className="text-center py-12 text-muted-foreground">
                  <p>Click "Start Simulation" to see the AI in action</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
