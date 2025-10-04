"use client"

import { useState, useEffect } from "react"
import { useTurboMode } from "./turbo-mode-provider"

export function VoxLogo({ className = "h-8 w-auto" }: { className?: string }) {
  const { activateTurboMode } = useTurboMode()
  const [holdProgress, setHoldProgress] = useState(0)
  const [isHolding, setIsHolding] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isHolding) {
      interval = setInterval(() => {
        setHoldProgress((prev) => {
          const next = prev + 3.33 // 100% in 3 seconds
          if (next >= 100) {
            activateTurboMode()
            setIsHolding(false)
            // Haptic feedback on mobile
            if ("vibrate" in navigator) {
              navigator.vibrate(200)
            }
            return 0
          }
          return next
        })
      }, 100)
    } else {
      setHoldProgress(0)
    }
    return () => clearInterval(interval)
  }, [isHolding, activateTurboMode])

  return (
    <div
      className={`flex items-center gap-2 ${className} relative cursor-pointer select-none`}
      onMouseDown={() => setIsHolding(true)}
      onMouseUp={() => setIsHolding(false)}
      onMouseLeave={() => setIsHolding(false)}
      onTouchStart={() => setIsHolding(true)}
      onTouchEnd={() => setIsHolding(false)}
    >
      <div className="relative">
        {holdProgress > 0 && (
          <>
            <div
              className="absolute inset-0 rounded-lg border-2 border-blue-400 transition-all duration-100"
              style={{
                boxShadow: `0 0 ${holdProgress / 3}px rgba(59, 130, 246, ${holdProgress / 100})`,
              }}
            />
            <div
              className="absolute inset-0 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 transition-all duration-100"
              style={{
                opacity: holdProgress / 100,
              }}
            />
          </>
        )}
        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center transition-transform hover:scale-110">
          <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 2L2 7L12 12L22 7L12 2Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 17L12 22L22 17"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 12L12 17L22 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      <span className="text-xl font-bold tracking-tight">Vox</span>
    </div>
  )
}
