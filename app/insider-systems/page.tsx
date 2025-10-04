"use client"

import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { X, Cpu, Activity, Zap, Radio, Database, Network, Brain, Server } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTurboMode } from "@/components/turbo-mode-provider"

interface Node {
  id: string
  x: number
  y: number
  z: number
  name: string
  type: string
  metrics: {
    load: number
    latency: number
    confidence: number
    memory: string
    connections: number
  }
  connections: string[]
}

interface LogEntry {
  id: string
  timestamp: string
  category: "System" | "Users" | "AI Core" | "Network"
  message: string
  level: "info" | "warning" | "success"
}

export default function InsiderSystemsPage() {
  const router = useRouter()
  const { isTurboMode } = useTurboMode()
  const [isEntering, setIsEntering] = useState(true)
  const [isExiting, setIsExiting] = useState(false)
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })
  const [selectedNode, setSelectedNode] = useState<Node | null>(null)
  const [logFilter, setLogFilter] = useState<"All" | "System" | "Users" | "AI Core" | "Network">("All")
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [pulseIntensity, setPulseIntensity] = useState(0.5)
  const [showEasterEgg, setShowEasterEgg] = useState(false)
  const [aiSpeech, setAiSpeech] = useState("")
  const [showAiSpeech, setShowAiSpeech] = useState(false)
  const [avatarTaps, setAvatarTaps] = useState(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const audioContextRef = useRef<AudioContext | null>(null)

  const [metrics, setMetrics] = useState({
    activeUsers: 23457,
    activeCalls: 312,
    throughput: 182.4,
    responseTime: 142,
    systemLoad: 68,
    activeNodes: 51,
  })

  const [healthMetrics, setHealthMetrics] = useState({
    cpu: 68,
    memory: { used: 3.7, total: 8 },
    latency: 142,
    stability: 99.87,
  })

  const [nodes] = useState<Node[]>([
    {
      id: "1",
      x: 200,
      y: 150,
      z: 0,
      name: "Speech Recognition",
      type: "ai",
      metrics: { load: 78, latency: 45, confidence: 94, memory: "1.2 GB", connections: 3 },
      connections: ["2", "3"],
    },
    {
      id: "2",
      x: 400,
      y: 200,
      z: 50,
      name: "Routing Engine",
      type: "core",
      metrics: { load: 65, latency: 23, confidence: 98, memory: "0.8 GB", connections: 5 },
      connections: ["4", "5"],
    },
    {
      id: "3",
      x: 300,
      y: 350,
      z: -30,
      name: "Sentiment Analysis",
      type: "ai",
      metrics: { load: 82, latency: 67, confidence: 89, memory: "1.5 GB", connections: 2 },
      connections: ["4"],
    },
    {
      id: "4",
      x: 600,
      y: 250,
      z: 20,
      name: "Response Generator",
      type: "ai",
      metrics: { load: 91, latency: 34, confidence: 96, memory: "2.1 GB", connections: 4 },
      connections: ["6"],
    },
    {
      id: "5",
      x: 500,
      y: 450,
      z: -10,
      name: "Customer Database",
      type: "data",
      metrics: { load: 54, latency: 12, confidence: 100, memory: "4.3 GB", connections: 6 },
      connections: ["6"],
    },
    {
      id: "6",
      x: 800,
      y: 300,
      z: 40,
      name: "Voice Synthesis",
      type: "output",
      metrics: { load: 73, latency: 28, confidence: 97, memory: "0.9 GB", connections: 2 },
      connections: [],
    },
  ])

  const cognitiveMessages = [
    "[SpeechUnit] Tone calibration adjusted +2.1%",
    "[Router] Rebalancing active call routes",
    "[MemoryCore] Sync complete (4.32s)",
    "[Cognition] User emotion classified: 'Confident'",
    "[Analytics] Predictive engagement model updated",
    "[SentimentEngine] Detecting positive sentiment shift",
    "[VoiceUnit] Prosody optimization in progress",
    "[Router] Load balancing across 12 nodes",
  ]

  const aiAvatarMessages = [
    "Neural sync at 92%.",
    "Stability optimal. Monitoring 23,457 users.",
    "Incoming call node detected in Lagos cluster.",
    "Cognitive load within normal parameters.",
    "System throughput exceeding baseline by 7%.",
  ]

  // Entry animation
  useEffect(() => {
    const timer = setTimeout(() => setIsEntering(false), 2500)
    return () => clearTimeout(timer)
  }, [])

  // Ambient sound
  useEffect(() => {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext
    audioContextRef.current = new AudioContext()

    const oscillator = audioContextRef.current.createOscillator()
    const gainNode = audioContextRef.current.createGain()

    oscillator.type = "sine"
    oscillator.frequency.setValueAtTime(35, audioContextRef.current.currentTime)
    gainNode.gain.setValueAtTime(0.03, audioContextRef.current.currentTime)

    oscillator.connect(gainNode)
    gainNode.connect(audioContextRef.current.destination)
    oscillator.start()

    return () => {
      oscillator.stop()
      audioContextRef.current?.close()
    }
  }, [])

  // Cursor tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Easter egg: type 'vox_core' in console
  useEffect(() => {
    let sequence = ""
    const handleKeyPress = (e: KeyboardEvent) => {
      sequence += e.key
      if (sequence.includes("vox_core")) {
        setShowEasterEgg(true)
        setTimeout(() => setShowEasterEgg(false), 5000)
        sequence = ""
      }
      if (sequence.length > 20) sequence = sequence.slice(-20)
    }
    window.addEventListener("keypress", handleKeyPress)
    return () => window.removeEventListener("keypress", handleKeyPress)
  }, [])

  // Generate logs
  useEffect(() => {
    const interval = setInterval(() => {
      const categories: Array<"System" | "Users" | "AI Core" | "Network"> = ["System", "Users", "AI Core", "Network"]
      const messages = {
        System: ["Server health check passed", "Cache cleared successfully", "Backup completed"],
        Users: [`UserCount: ${metrics.activeUsers}`, "New user session started", "User authentication verified"],
        "AI Core": cognitiveMessages,
        Network: ["[Router] Channel established", "[PushService] Ping → Delivered", "Connection pool optimized"],
      }
      const category = categories[Math.floor(Math.random() * categories.length)]
      const messageList = messages[category]
      const message = messageList[Math.floor(Math.random() * messageList.length)]
      const levels: Array<"info" | "warning" | "success"> = ["info", "info", "info", "success", "warning"]
      const level = levels[Math.floor(Math.random() * levels.length)]

      setLogs((prev) => [
        {
          id: Date.now().toString(),
          timestamp: new Date().toLocaleTimeString(),
          category,
          message,
          level,
        },
        ...prev.slice(0, 49),
      ])
    }, 2000)
    return () => clearInterval(interval)
  }, [metrics.activeUsers])

  // Update metrics
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) => ({
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 10 - 5),
        activeCalls: Math.max(0, prev.activeCalls + Math.floor(Math.random() * 6 - 3)),
        throughput: +(prev.throughput + (Math.random() * 2 - 1)).toFixed(1),
        responseTime: Math.max(100, prev.responseTime + Math.floor(Math.random() * 10 - 5)),
        systemLoad: Math.max(50, Math.min(90, prev.systemLoad + Math.floor(Math.random() * 4 - 2))),
        activeNodes: 51,
      }))

      setHealthMetrics((prev) => ({
        cpu: Math.max(50, Math.min(90, prev.cpu + Math.floor(Math.random() * 4 - 2))),
        memory: prev.memory,
        latency: Math.max(100, prev.latency + Math.floor(Math.random() * 10 - 5)),
        stability: +(99.5 + Math.random() * 0.5).toFixed(2),
      }))

      setPulseIntensity(Math.random() * 0.3 + 0.5)
    }, 1500)
    return () => clearInterval(interval)
  }, [])

  // AI avatar speech
  useEffect(() => {
    const interval = setInterval(() => {
      const message = aiAvatarMessages[Math.floor(Math.random() * aiAvatarMessages.length)]
      setAiSpeech(message)
      setShowAiSpeech(true)
      setTimeout(() => setShowAiSpeech(false), 4000)
    }, 12000)
    return () => clearInterval(interval)
  }, [])

  // Draw neural network
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = 1000
    canvas.height = 600

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw connections
      nodes.forEach((node) => {
        node.connections.forEach((connId) => {
          const targetNode = nodes.find((n) => n.id === connId)
          if (targetNode) {
            const gradient = ctx.createLinearGradient(node.x, node.y, targetNode.x, targetNode.y)
            gradient.addColorStop(0, "rgba(0, 231, 181, 0.4)")
            gradient.addColorStop(1, "rgba(0, 164, 255, 0.4)")

            ctx.strokeStyle = gradient
            ctx.lineWidth = 2
            ctx.shadowBlur = isTurboMode ? 15 : 8
            ctx.shadowColor = "#00E7B5"
            ctx.beginPath()
            ctx.moveTo(node.x, node.y)
            ctx.lineTo(targetNode.x, targetNode.y)
            ctx.stroke()

            // Animated energy pulse
            const pulsePos = (Date.now() % (isTurboMode ? 1000 : 2000)) / (isTurboMode ? 1000 : 2000)
            const pulseX = node.x + (targetNode.x - node.x) * pulsePos
            const pulseY = node.y + (targetNode.y - node.y) * pulsePos

            ctx.fillStyle = "#00E7B5"
            ctx.shadowBlur = isTurboMode ? 25 : 15
            ctx.beginPath()
            ctx.arc(pulseX, pulseY, isTurboMode ? 5 : 3, 0, Math.PI * 2)
            ctx.fill()
          }
        })
      })

      requestAnimationFrame(animate)
    }

    animate()
  }, [nodes, isTurboMode])

  const handleExit = () => {
    setIsExiting(true)
    setTimeout(() => router.push("/dashboard"), 1200)
  }

  const handleAvatarClick = () => {
    setAvatarTaps((prev) => prev + 1)
    if (avatarTaps + 1 === 2) {
      setAiSpeech("You're not supposed to see this… neural cycle 08 engaged.")
      setShowAiSpeech(true)
      setTimeout(() => setShowAiSpeech(false), 5000)
      setAvatarTaps(0)
    }
  }

  const filteredLogs = logFilter === "All" ? logs : logs.filter((log) => log.category === logFilter)

  return (
    <div className="relative min-h-screen overflow-hidden" style={{ background: "#02060C" }}>
      {/* Entry animation */}
      {isEntering && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "#02060C" }}>
          <div className="text-center space-y-6">
            <div className="text-5xl font-bold animate-pulse" style={{ color: "#00E7B5" }}>
              VOX NEURAL OPERATIONS CORE
            </div>
            <div className="h-32 overflow-hidden">
              {Array.from({ length: 15 }).map((_, i) => (
                <div
                  key={i}
                  className="text-sm font-mono opacity-40 animate-slide-up"
                  style={{ color: "#00A4FF", animationDelay: `${i * 0.08}s` }}
                >
                  {`[INIT] Loading module ${i + 1}/15...`}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Exit animation */}
      {isExiting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "#02060C" }}>
          <div
            className="w-6 h-6 rounded-full animate-pulse"
            style={{
              background: "#00E7B5",
              boxShadow: "0 0 80px 40px rgba(0, 231, 181, 0.6)",
              animation: "shrinkDot 1.2s ease-in forwards",
            }}
          />
        </div>
      )}

      {/* Custom cursor */}
      <div
        className="pointer-events-none fixed w-6 h-6 rounded-full border z-50 mix-blend-screen transition-all duration-75"
        style={{
          left: `${cursorPos.x - 12}px`,
          top: `${cursorPos.y - 12}px`,
          borderColor: "#00E7B5",
          boxShadow: "0 0 15px rgba(0, 231, 181, 0.6)",
        }}
      />

      {/* Header */}
      <div
        className="relative z-10 p-6 flex items-center justify-between border-b"
        style={{ borderColor: "#00E7B5" + "20" }}
      >
        <div>
          <h1 className="text-3xl font-bold tracking-wider" style={{ color: "#00E7B5" }}>
            VOX NEURAL OPERATIONS CORE
          </h1>
          <p className="text-sm mt-1 font-mono" style={{ color: "#FF006E" }}>
            CLASSIFIED ACCESS • LEVEL 5 CLEARANCE
          </p>
        </div>
        <Button
          onClick={handleExit}
          variant="ghost"
          size="icon"
          className="border"
          style={{ borderColor: "#00E7B5" + "30", color: "#00E7B5" }}
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      <div className="relative z-10 p-6 space-y-8 max-w-[1600px] mx-auto">
        {/* System Overview Dashboard */}
        <div>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-3" style={{ color: "#00E7B5" }}>
            <Activity className="h-6 w-6" />
            System Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: "Active Users", value: metrics.activeUsers.toLocaleString(), trend: "+4.3%", icon: "👥" },
              { title: "Active AI Calls", value: metrics.activeCalls, trend: "-1.2%", icon: "📞" },
              { title: "Data Throughput", value: `${metrics.throughput} GB`, trend: "+7.1%", icon: "📊" },
              { title: "API Response Time", value: `${metrics.responseTime} ms`, trend: "-0.8%", icon: "⚡" },
              { title: "System Load", value: `${metrics.systemLoad}%`, trend: "+2.5%", icon: "💻" },
              { title: "Active Endpoints", value: `${metrics.activeNodes} Nodes`, trend: "Stable", icon: "🔗" },
            ].map((metric, i) => (
              <div
                key={i}
                className="p-4 rounded-lg border backdrop-blur-sm transition-all hover:scale-105"
                style={{
                  background: "rgba(0, 231, 181, 0.05)",
                  borderColor: "#00E7B5" + "30",
                  boxShadow: isTurboMode ? "0 0 20px rgba(0, 231, 181, 0.2)" : "none",
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm opacity-70" style={{ color: "#00A4FF" }}>
                    {metric.title}
                  </span>
                  <span className="text-xl">{metric.icon}</span>
                </div>
                <div className="text-2xl font-bold" style={{ color: "#00E7B5" }}>
                  {metric.value}
                </div>
                <div className="text-xs mt-1" style={{ color: metric.trend.startsWith("+") ? "#00E7B5" : "#FF006E" }}>
                  {metric.trend}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Real-Time Neural Map */}
        <div>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-3" style={{ color: "#00E7B5" }}>
            <Network className="h-6 w-6" />
            Real-Time Neural Map
          </h2>
          <div
            className="relative rounded-lg border p-6"
            style={{ background: "rgba(0, 0, 0, 0.5)", borderColor: "#00E7B5" + "20" }}
          >
            <canvas ref={canvasRef} className="w-full" style={{ height: "600px" }} />
            <div className="absolute inset-0 pointer-events-none">
              {nodes.map((node) => (
                <div
                  key={node.id}
                  className="absolute cursor-pointer pointer-events-auto group"
                  style={{
                    left: `${(node.x / 1000) * 100}%`,
                    top: `${(node.y / 600) * 100}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                  onMouseEnter={() => setSelectedNode(node)}
                  onMouseLeave={() => setSelectedNode(null)}
                >
                  <div
                    className="w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all group-hover:scale-125"
                    style={{
                      background: "rgba(0, 0, 0, 0.8)",
                      borderColor: "#00E7B5",
                      boxShadow: `0 0 ${15 + node.metrics.load / 5}px rgba(0, 231, 181, 0.5)`,
                    }}
                  >
                    {node.type === "ai" && <Brain className="h-6 w-6" style={{ color: "#00E7B5" }} />}
                    {node.type === "core" && <Zap className="h-6 w-6" style={{ color: "#FF006E" }} />}
                    {node.type === "data" && <Database className="h-6 w-6" style={{ color: "#00A4FF" }} />}
                    {node.type === "output" && <Radio className="h-6 w-6" style={{ color: "#FF006E" }} />}
                  </div>

                  {selectedNode?.id === node.id && (
                    <div
                      className="absolute top-16 left-1/2 -translate-x-1/2 rounded-lg p-4 w-64 animate-in fade-in slide-in-from-top-2 z-20"
                      style={{ background: "rgba(0, 0, 0, 0.95)", border: "1px solid #00E7B5" }}
                    >
                      <h3 className="font-bold mb-2" style={{ color: "#00E7B5" }}>
                        {node.name}
                      </h3>
                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between">
                          <span className="opacity-70">Load:</span>
                          <span style={{ color: "#FF006E" }}>{node.metrics.load}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="opacity-70">Latency:</span>
                          <span style={{ color: "#FF006E" }}>{node.metrics.latency}ms</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="opacity-70">Confidence:</span>
                          <span style={{ color: "#FF006E" }}>{node.metrics.confidence}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="opacity-70">Memory:</span>
                          <span style={{ color: "#FF006E" }}>{node.metrics.memory}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="opacity-70">Connections:</span>
                          <span style={{ color: "#FF006E" }}>{node.metrics.connections}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Matrix Stream */}
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3" style={{ color: "#00E7B5" }}>
              <Server className="h-6 w-6" />
              Matrix Stream
            </h2>
            <div
              className="rounded-lg border p-4"
              style={{ background: "rgba(0, 0, 0, 0.5)", borderColor: "#00E7B5" + "20" }}
            >
              <div className="flex gap-2 mb-4 flex-wrap">
                {["All", "System", "Users", "AI Core", "Network"].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setLogFilter(filter as any)}
                    className="px-3 py-1 rounded text-xs transition-all"
                    style={{
                      background: logFilter === filter ? "#00E7B5" : "transparent",
                      color: logFilter === filter ? "#02060C" : "#00E7B5",
                      border: `1px solid ${logFilter === filter ? "#00E7B5" : "#00E7B5" + "30"}`,
                    }}
                  >
                    {filter}
                  </button>
                ))}
              </div>
              <div className="h-96 overflow-y-auto space-y-1 font-mono text-xs">
                {filteredLogs.map((log) => (
                  <div
                    key={log.id}
                    className="flex gap-2 items-start animate-in fade-in slide-in-from-top-1"
                    style={{
                      color: log.level === "success" ? "#00E7B5" : log.level === "warning" ? "#FF006E" : "#00A4FF",
                    }}
                  >
                    <span className="opacity-50">[{log.timestamp}]</span>
                    <span className="opacity-70">[{log.category}]</span>
                    <span>{log.message}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Infrastructure Health Board */}
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3" style={{ color: "#00E7B5" }}>
              <Cpu className="h-6 w-6" />
              Infrastructure Health
            </h2>
            <div className="space-y-4">
              {[
                { title: "CPU Load", value: healthMetrics.cpu, max: 100, unit: "%" },
                {
                  title: "Memory Usage",
                  value: (healthMetrics.memory.used / healthMetrics.memory.total) * 100,
                  max: 100,
                  unit: `${healthMetrics.memory.used} / ${healthMetrics.memory.total} GB`,
                },
                {
                  title: "Server Latency",
                  value: (healthMetrics.latency / 200) * 100,
                  max: 100,
                  unit: `${healthMetrics.latency} ms`,
                },
                {
                  title: "Connection Stability",
                  value: healthMetrics.stability,
                  max: 100,
                  unit: `${healthMetrics.stability}%`,
                },
              ].map((panel, i) => (
                <div
                  key={i}
                  className="p-4 rounded-lg border backdrop-blur-sm"
                  style={{
                    background: "rgba(0, 231, 181, 0.05)",
                    borderColor: "#00E7B5" + "30",
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm" style={{ color: "#00A4FF" }}>
                      {panel.title}
                    </span>
                    <span className="text-sm font-bold" style={{ color: "#00E7B5" }}>
                      {panel.unit}
                    </span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(0, 0, 0, 0.5)" }}>
                    <div
                      className="h-full transition-all duration-500 rounded-full"
                      style={{
                        width: `${panel.value}%`,
                        background: `linear-gradient(to right, #00E7B5, #00A4FF)`,
                        boxShadow: isTurboMode ? "0 0 10px rgba(0, 231, 181, 0.5)" : "none",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Cognitive Activity Stream */}
        <div>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-3" style={{ color: "#00E7B5" }}>
            <Brain className="h-6 w-6" />
            Cognitive Activity Stream
          </h2>
          <div
            className="rounded-lg border p-4 h-48 overflow-y-auto font-mono text-sm space-y-2"
            style={{ background: "rgba(0, 0, 0, 0.5)", borderColor: "#00E7B5" + "20" }}
          >
            {cognitiveMessages.map((msg, i) => (
              <div
                key={i}
                className="animate-pulse"
                style={{
                  color: "#00E7B5",
                  animationDelay: `${i * 0.3}s`,
                  opacity: 0.7,
                }}
              >
                {msg}
              </div>
            ))}
          </div>
        </div>

        {/* Neural Pulse Visualization */}
        <div className="flex justify-center">
          <div className="relative w-48 h-48">
            <div
              className="absolute inset-0 rounded-full border-2 animate-pulse"
              style={{
                borderColor: "#00E7B5",
                boxShadow: `0 0 ${40 * pulseIntensity}px rgba(0, 231, 181, ${pulseIntensity})`,
                animation: isTurboMode ? "pulse 0.5s ease-in-out infinite" : "pulse 1.5s ease-in-out infinite",
              }}
            />
            <div
              className="absolute inset-4 rounded-full border animate-pulse"
              style={{
                borderColor: "#00A4FF",
                animationDelay: "0.3s",
              }}
            />
            <div
              className="absolute inset-8 rounded-full animate-pulse"
              style={{
                background: `radial-gradient(circle, rgba(0, 231, 181, ${pulseIntensity}), transparent)`,
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Zap className="h-12 w-12 animate-pulse" style={{ color: "#00E7B5" }} />
            </div>
          </div>
        </div>
      </div>

      {/* AI Avatar */}
      <div
        className="fixed bottom-8 right-8 z-20 w-32 h-32 opacity-40 transition-all duration-300 hover:opacity-70 cursor-pointer"
        style={{
          transform: `translate(${(cursorPos.x - (typeof window !== "undefined" ? window.innerWidth : 1920) / 2) / 40}px, ${(cursorPos.y - (typeof window !== "undefined" ? window.innerHeight : 1080) / 2) / 40}px)`,
        }}
        onClick={handleAvatarClick}
      >
        <div className="relative w-full h-full">
          <div className="absolute inset-0 rounded-full border-2 animate-pulse" style={{ borderColor: "#00E7B5" }} />
          <div
            className="absolute inset-2 rounded-full border animate-pulse"
            style={{ borderColor: "#FF006E", animationDelay: "0.2s" }}
          />
          <div
            className="absolute top-1/3 left-1/4 w-4 h-4 rounded-full animate-pulse"
            style={{ background: "#00E7B5" }}
          />
          <div
            className="absolute top-1/3 right-1/4 w-4 h-4 rounded-full animate-pulse"
            style={{ background: "#00E7B5" }}
          />
          <div
            className="absolute bottom-1/3 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full"
            style={{ background: "#FF006E" }}
          />
        </div>
      </div>

      {/* AI Speech */}
      {showAiSpeech && (
        <div
          className="fixed bottom-48 right-8 z-20 rounded-lg p-4 max-w-xs animate-in fade-in slide-in-from-bottom-4"
          style={{ background: "rgba(0, 0, 0, 0.95)", border: "1px solid #FF006E" }}
        >
          <p className="text-sm font-mono" style={{ color: "#FF006E" }}>
            {aiSpeech}
          </p>
        </div>
      )}

      {/* Easter Egg */}
      {showEasterEgg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div
            className="rounded-lg p-8 animate-in zoom-in-95 fade-in"
            style={{ background: "rgba(0, 0, 0, 0.95)", border: "2px solid #00E7B5" }}
          >
            <p className="text-2xl font-bold mb-2" style={{ color: "#00E7B5" }}>
              CORE STREAM EXPOSED
            </p>
            <p className="text-sm font-mono" style={{ color: "#FF006E" }}>
              Encryption bypass temporary. Neural cycle active.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
