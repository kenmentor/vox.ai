"use client"

import { createContext, useContext, useState, useEffect, useRef, type ReactNode } from "react"

interface TurboModeContextType {
  isTurboMode: boolean
  activateTurboMode: () => void
  deactivateTurboMode: () => void
}

const TurboModeContext = createContext<TurboModeContextType | undefined>(undefined)

export function TurboModeProvider({ children }: { children: ReactNode }) {
  const [isTurboMode, setIsTurboMode] = useState(false)
  const [isActivating, setIsActivating] = useState(false)
  const [rippleOrigin, setRippleOrigin] = useState({ x: 50, y: 50 })
  const [clickRipples, setClickRipples] = useState<Array<{ id: number; x: number; y: number }>>([])
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })
  const [touchSparkles, setTouchSparkles] = useState<Array<{ id: number; x: number; y: number }>>([])
  const [showStats, setShowStats] = useState(false)
  const [stats, setStats] = useState({ cpu: 0, responseTime: 0, uptime: 0 })
  const audioContextRef = useRef<AudioContext | null>(null)
  const oscillatorRef = useRef<OscillatorNode | null>(null)
  const gainNodeRef = useRef<GainNode | null>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === "F") {
        e.preventDefault()
        if (isTurboMode) {
          deactivateTurboMode()
        } else {
          activateTurboMode()
        }
      }
      // Ctrl+Alt+I for Insider Systems View
      if (e.ctrlKey && e.altKey && e.key === "i") {
        e.preventDefault()
        window.location.href = "/insider-systems"
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isTurboMode])

  useEffect(() => {
    if (!isTurboMode) return

    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [isTurboMode])

  useEffect(() => {
    if (!isTurboMode) return

    const handleClick = (e: MouseEvent) => {
      const ripple = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
      }
      setClickRipples((prev) => [...prev, ripple])
      setTimeout(() => {
        setClickRipples((prev) => prev.filter((r) => r.id !== ripple.id))
      }, 1000)
    }

    window.addEventListener("click", handleClick)
    return () => window.removeEventListener("click", handleClick)
  }, [isTurboMode])

  useEffect(() => {
    if (!isTurboMode) return

    const handleTouch = (e: TouchEvent) => {
      Array.from(e.touches).forEach((touch) => {
        const sparkle = {
          id: Date.now() + Math.random(),
          x: touch.clientX,
          y: touch.clientY,
        }
        setTouchSparkles((prev) => [...prev, sparkle])
        setTimeout(() => {
          setTouchSparkles((prev) => prev.filter((s) => s.id !== sparkle.id))
        }, 800)
      })
    }

    window.addEventListener("touchstart", handleTouch)
    return () => window.removeEventListener("touchstart", handleTouch)
  }, [isTurboMode])

  useEffect(() => {
    if (!isTurboMode) return

    const interval = setInterval(() => {
      setStats({
        cpu: Math.floor(Math.random() * 30) + 40,
        responseTime: Math.floor(Math.random() * 50) + 80,
        uptime: Math.floor(Date.now() / 1000),
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isTurboMode])

  const activateTurboMode = () => {
    setIsActivating(true)
    setRippleOrigin({ x: 50, y: 50 })

    playActivationSound()

    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance("Power Surge engaged. Optimizing system responsiveness.")
      utterance.rate = 1.1
      utterance.pitch = 1.2
      utterance.volume = 0.3
      window.speechSynthesis.speak(utterance)
    }

    setTimeout(() => {
      setIsActivating(false)
      setIsTurboMode(true)
      setShowStats(true)
      startAmbientSound()
    }, 1000)
  }

  const deactivateTurboMode = () => {
    playExitSound()
    stopAmbientSound()
    setShowStats(false)
    setIsTurboMode(false)
    setClickRipples([])
    setTouchSparkles([])
  }

  const startAmbientSound = () => {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext
    audioContextRef.current = new AudioContext()
    oscillatorRef.current = audioContextRef.current.createOscillator()
    gainNodeRef.current = audioContextRef.current.createGain()

    oscillatorRef.current.type = "sine"
    oscillatorRef.current.frequency.setValueAtTime(80, audioContextRef.current.currentTime)
    gainNodeRef.current.gain.setValueAtTime(0.02, audioContextRef.current.currentTime)

    oscillatorRef.current.connect(gainNodeRef.current)
    gainNodeRef.current.connect(audioContextRef.current.destination)
    oscillatorRef.current.start()
  }

  const stopAmbientSound = () => {
    if (oscillatorRef.current) {
      oscillatorRef.current.stop()
    }
    if (audioContextRef.current) {
      audioContextRef.current.close()
    }
  }

  const playActivationSound = () => {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext
    const ctx = new AudioContext()
    const oscillator = ctx.createOscillator()
    const gainNode = ctx.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(ctx.destination)

    oscillator.frequency.setValueAtTime(300, ctx.currentTime)
    oscillator.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.3)
    gainNode.gain.setValueAtTime(0.2, ctx.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5)

    oscillator.start(ctx.currentTime)
    oscillator.stop(ctx.currentTime + 0.5)
  }

  const playExitSound = () => {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext
    const ctx = new AudioContext()
    const oscillator = ctx.createOscillator()
    const gainNode = ctx.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(ctx.destination)

    oscillator.frequency.setValueAtTime(600, ctx.currentTime)
    oscillator.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.2)
    gainNode.gain.setValueAtTime(0.15, ctx.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3)

    oscillator.start(ctx.currentTime)
    oscillator.stop(ctx.currentTime + 0.3)
  }

  return (
    <TurboModeContext.Provider value={{ isTurboMode, activateTurboMode, deactivateTurboMode }}>
      {children}

      {isActivating && (
        <div className="fixed inset-0 z-[100] pointer-events-none">
          <div
            className="absolute rounded-full border-4 border-blue-500"
            style={{
              left: `${rippleOrigin.x}%`,
              top: `${rippleOrigin.y}%`,
              transform: "translate(-50%, -50%)",
              animation: "powerRipple 1s ease-out forwards",
            }}
          />
        </div>
      )}

      {isTurboMode && (
        <>
          {/* Dynamic fluid gradient background */}
          <div className="fixed inset-0 z-[40] pointer-events-none opacity-20">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 30% 50%, rgba(59, 130, 246, 0.4), transparent 50%), radial-gradient(circle at 70% 50%, rgba(34, 211, 238, 0.3), transparent 50%)",
                animation: "fluidGradient 8s ease-in-out infinite",
              }}
            />
          </div>

          {/* Subtle energy lines pulsing across background */}
          <svg className="fixed inset-0 z-[41] pointer-events-none opacity-10 w-full h-full">
            <defs>
              <linearGradient id="energyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
                <stop offset="50%" stopColor="#22d3ee" stopOpacity="1" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
              </linearGradient>
            </defs>
            <line
              x1="0%"
              y1="20%"
              x2="100%"
              y2="20%"
              stroke="url(#energyGradient)"
              strokeWidth="2"
              className="animate-pulse"
            />
            <line
              x1="0%"
              y1="50%"
              x2="100%"
              y2="50%"
              stroke="url(#energyGradient)"
              strokeWidth="2"
              className="animate-pulse"
              style={{ animationDelay: "0.5s" }}
            />
            <line
              x1="0%"
              y1="80%"
              x2="100%"
              y2="80%"
              stroke="url(#energyGradient)"
              strokeWidth="2"
              className="animate-pulse"
              style={{ animationDelay: "1s" }}
            />
          </svg>

          {/* Cursor trail particles on desktop */}
          <div
            className="hidden md:block fixed w-4 h-4 rounded-full bg-blue-400/30 blur-sm z-[45] pointer-events-none transition-all duration-100"
            style={{
              left: `${cursorPos.x - 8}px`,
              top: `${cursorPos.y - 8}px`,
            }}
          />

          {/* Click ripple waves */}
          {clickRipples.map((ripple) => (
            <div
              key={ripple.id}
              className="fixed rounded-full border-2 border-blue-400 z-[42] pointer-events-none"
              style={{
                left: `${ripple.x}px`,
                top: `${ripple.y}px`,
                transform: "translate(-50%, -50%)",
                animation: "clickRipple 1s ease-out forwards",
              }}
            />
          ))}

          {/* Touch sparkles for mobile */}
          {touchSparkles.map((sparkle) => (
            <div
              key={sparkle.id}
              className="fixed w-2 h-2 rounded-full bg-cyan-400 z-[42] pointer-events-none"
              style={{
                left: `${sparkle.x}px`,
                top: `${sparkle.y}px`,
                animation: "sparkle 0.8s ease-out forwards",
              }}
            />
          ))}

          {/* Performance stats overlay */}
          {showStats && (
            <div className="fixed bottom-6 right-6 z-[50] bg-black/80 backdrop-blur-md border border-blue-500/30 rounded-lg p-4 shadow-lg animate-in slide-in-from-bottom-4 duration-500">
              <div className="text-xs text-blue-400 font-mono space-y-2">
                <div className="flex items-center justify-between gap-4">
                  <span>CPU</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-300"
                        style={{ width: `${stats.cpu}%` }}
                      />
                    </div>
                    <span className="w-10 text-right">{stats.cpu}%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span>Response</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-500 to-blue-400 transition-all duration-300"
                        style={{ width: `${(stats.responseTime / 150) * 100}%` }}
                      />
                    </div>
                    <span className="w-10 text-right">{stats.responseTime}ms</span>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span>Uptime</span>
                  <span className="text-cyan-400">{Math.floor(stats.uptime / 60)}m</span>
                </div>
              </div>
            </div>
          )}

          {/* Exit button */}
          <button
            onClick={deactivateTurboMode}
            className="fixed top-6 right-6 z-[50] bg-black/80 backdrop-blur-md border border-blue-500/30 rounded-full px-4 py-2 text-sm text-blue-400 hover:bg-blue-500/20 transition-all duration-300 animate-in fade-in slide-in-from-top-4"
          >
            Exit Power Surge
          </button>
        </>
      )}
    </TurboModeContext.Provider>
  )
}

export function useTurboMode() {
  const context = useContext(TurboModeContext)
  if (context === undefined) {
    throw new Error("useTurboMode must be used within a TurboModeProvider")
  }
  return context
}
