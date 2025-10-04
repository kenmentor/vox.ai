import type React from "react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { HeaderBar } from "@/components/dashboard/header-bar"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <HeaderBar />
        <main className="flex-1 overflow-y-auto bg-background">{children}</main>
      </div>
    </div>
  )
}
