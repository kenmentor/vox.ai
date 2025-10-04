"use client"

import type { LucideIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useTurboMode } from "@/components/turbo-mode-provider"
import { cn } from "@/lib/utils"

interface StatsCardProps {
  title: string
  value: string | number
  change?: string
  changeType?: "positive" | "negative" | "neutral"
  icon: LucideIcon
}

export function StatsCard({ title, value, change, changeType = "neutral", icon: Icon }: StatsCardProps) {
  const { isTurboMode } = useTurboMode()

  return (
    <Card
      className={cn(
        "hover:border-primary/50 transition-all duration-300 card-enhanced",
        isTurboMode && "hover:scale-105",
      )}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold tracking-tight">{value}</p>
            {change && (
              <p
                className={cn(
                  "text-xs font-medium transition-all duration-200",
                  changeType === "positive"
                    ? "text-green-500"
                    : changeType === "negative"
                      ? "text-red-500"
                      : "text-muted-foreground",
                )}
              >
                {change}
              </p>
            )}
          </div>
          <div
            className={cn(
              "h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110",
              isTurboMode && "animate-float shadow-lg shadow-primary/30",
            )}
          >
            <Icon className="h-6 w-6 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
