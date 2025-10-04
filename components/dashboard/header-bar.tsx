"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useTurboMode } from "@/components/turbo-mode-provider"
import { cn } from "@/lib/utils"
import { NotificationsDropdown } from "@/components/dashboard/notifications-dropdown"

export function HeaderBar() {
  const { isTurboMode } = useTurboMode()

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6">
      <div className="flex-1">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search calls, customers, or settings..."
            className={cn(
              "pl-10 bg-muted/50 transition-all duration-200 focus:bg-muted focus:shadow-lg focus:shadow-primary/10",
              isTurboMode && "focus:shadow-primary/30",
            )}
          />
        </div>
      </div>
      <NotificationsDropdown />
    </header>
  )
}
