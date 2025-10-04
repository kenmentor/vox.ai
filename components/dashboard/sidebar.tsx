"use client"

import { VoxLogo } from "@/components/vox-logo"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Phone,
  MessageSquare,
  Users,
  Settings,
  BarChart3,
  CreditCard,
  LogOut,
  Zap,
  HelpCircle,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useTurboMode } from "@/components/turbo-mode-provider"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Call Center", href: "/dashboard/call-center", icon: Phone },
  { name: "WhatsApp", href: "/dashboard/whatsapp-integration", icon: MessageSquare },
  { name: "Customers", href: "/dashboard/customers", icon: Users },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { name: "Billing", href: "/dashboard/billing", icon: CreditCard },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
  { name: "Support", href: "/dashboard/support", icon: HelpCircle },
]

export function Sidebar() {
  const pathname = usePathname()
  const { isTurboMode } = useTurboMode()

  return (
    <div className="flex h-screen w-64 flex-col border-r border-border bg-sidebar">
      {/* Logo */}
      <div className="flex h-16 items-center border-b border-sidebar-border px-6">
        <VoxLogo />
        {/* Secret System Core page link - hidden clickable icon */}
        <Link
          href="/dashboard/system-core"
          className="ml-auto opacity-0 hover:opacity-100 transition-opacity duration-300"
          title="System Core"
        >
          <Zap className="h-4 w-4 text-primary" />
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-lg shadow-primary/10"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground hover:translate-x-1",
                isTurboMode && "hover:scale-105 hover:shadow-lg hover:shadow-primary/20",
              )}
            >
              <item.icon className={cn("h-5 w-5 transition-transform", isTurboMode && isActive && "animate-float")} />
              {item.name}
            </Link>
          )
        })}
      </nav>

      {/* User Section */}
      <div className="border-t border-sidebar-border p-4">
        <div className="flex items-center gap-3 mb-3">
          <div
            className={cn(
              "h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center transition-all duration-300",
              isTurboMode && "shadow-lg shadow-primary/50 animate-pulse-glow",
            )}
          >
            <span className="text-sm font-semibold text-primary">AC</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">Acme Corp</p>
            <p className="text-xs text-muted-foreground truncate">admin@acme.com</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "w-full justify-start transition-all duration-200 hover:bg-sidebar-accent/50",
            isTurboMode && "hover:scale-105",
          )}
          asChild
        >
          <Link href="/auth/login">
            <LogOut className="h-4 w-4 mr-2" />
            Log Out
          </Link>
        </Button>
      </div>
    </div>
  )
}
