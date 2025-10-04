"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { VoxLogo } from "@/components/vox-logo"
import { Phone, MessageSquare, BarChart3, Zap, Shield, Globe } from "lucide-react"
import Link from "next/link"
import { useTurboMode } from "@/components/turbo-mode-provider"
import { cn } from "@/lib/utils"

export default function LandingPage() {
  const { isTurboMode } = useTurboMode()

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <VoxLogo />
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="#features"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              How It Works
            </Link>
            <Link
              href="#pricing"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              Pricing
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild className="transition-all duration-200 hover:scale-105">
              <Link href="/auth/login">Log In</Link>
            </Button>
            <Button asChild className={cn("transition-all duration-200", isTurboMode && "animate-pulse-glow")}>
              <Link href="/auth/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-24 md:py-32 page-transition">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/20">
            AI-Powered Call Center Platform
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-balance">
            Transform Your Customer Service with{" "}
            <span
              className={cn(
                "bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent",
                isTurboMode && "animate-shimmer bg-[length:200%_100%]",
              )}
            >
              AI Agents
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
            Manage customer calls, integrate WhatsApp, and track analytics in real-time with our multi-tenant AI-powered
            platform.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button
              size="lg"
              asChild
              className={cn(
                "text-base transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-primary/30",
                isTurboMode && "animate-pulse-glow",
              )}
            >
              <Link href="/auth/signup">Start Free Trial</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="text-base bg-transparent transition-all duration-200 hover:scale-105 hover:bg-muted"
            >
              <Link href="#demo">Watch Demo</Link>
            </Button>
          </div>
        </div>

        {/* Hero Image Placeholder */}
        <div className="mt-16 max-w-5xl mx-auto">
          <div className="relative rounded-xl border border-border bg-card overflow-hidden card-enhanced">
            <div className="aspect-video bg-gradient-to-br from-primary/20 via-accent/10 to-background flex items-center justify-center">
              <div className="text-center space-y-4">
                <div
                  className={cn(
                    "h-24 w-24 mx-auto rounded-full bg-primary/20 flex items-center justify-center transition-all duration-300",
                    isTurboMode && "animate-float shadow-2xl shadow-primary/50",
                  )}
                >
                  <Phone className="h-12 w-12 text-primary" />
                </div>
                <p className="text-muted-foreground">AI Call Center Interface Preview</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-24 border-t border-border">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Everything You Need</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Powerful features to streamline your customer service operations
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <FeatureCard
            icon={<Phone className="h-6 w-6" />}
            title="AI Call Management"
            description="Intelligent call routing and handling with real-time AI responses and transcription"
          />
          <FeatureCard
            icon={<MessageSquare className="h-6 w-6" />}
            title="WhatsApp Integration"
            description="Seamlessly connect your WhatsApp Business API for unified communication"
          />
          <FeatureCard
            icon={<BarChart3 className="h-6 w-6" />}
            title="Real-Time Analytics"
            description="Track call volume, response times, and AI performance with detailed insights"
          />
          <FeatureCard
            icon={<Zap className="h-6 w-6" />}
            title="Instant Responses"
            description="AI-powered responses that understand context and provide accurate information"
          />
          <FeatureCard
            icon={<Shield className="h-6 w-6" />}
            title="Enterprise Security"
            description="Bank-level encryption and compliance with industry security standards"
          />
          <FeatureCard
            icon={<Globe className="h-6 w-6" />}
            title="Multi-Tenant Support"
            description="Manage multiple organizations and teams from a single platform"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-24 border-t border-border">
        <div className="max-w-4xl mx-auto text-center space-y-8 rounded-2xl border border-border bg-card p-12 card-enhanced">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Ready to Transform Your Call Center?</h2>
          <p className="text-xl text-muted-foreground">
            Join hundreds of businesses using Vox to deliver exceptional customer service
          </p>
          <Button
            size="lg"
            asChild
            className={cn(
              "text-base transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-primary/30",
              isTurboMode && "animate-pulse-glow",
            )}
          >
            <Link href="/auth/signup">Get Started Free</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-24">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <VoxLogo />
            <p className="text-sm text-muted-foreground">© 2025 Vox Call Care Agent. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  const { isTurboMode } = useTurboMode()

  return (
    <div
      className={cn(
        "group relative rounded-lg border border-border bg-card p-6 hover:border-primary/50 transition-all duration-300 card-enhanced",
        isTurboMode && "hover:scale-105",
      )}
    >
      <div
        className={cn(
          "mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110",
          isTurboMode && "group-hover:shadow-lg group-hover:shadow-primary/50",
        )}
      >
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </div>
  )
}
