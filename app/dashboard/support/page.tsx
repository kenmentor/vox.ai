"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, HelpCircle, CheckCircle, AlertCircle } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "How do I set up the AI call assistant?",
    answer:
      "Navigate to Settings > Integrations and connect your phone provider. Then configure your AI assistant preferences in the Call Center settings.",
  },
  {
    question: "What's included in the Professional plan?",
    answer:
      "The Professional plan includes up to 2,000 calls per month, advanced AI assistant, priority support, 5 team members, WhatsApp integration, and custom analytics.",
  },
  {
    question: "Can I integrate with my existing CRM?",
    answer:
      "Yes! Vox supports integrations with popular CRMs like Salesforce, HubSpot, and Zendesk. Contact our support team for custom integration assistance.",
  },
  {
    question: "How does the AI handle complex customer queries?",
    answer:
      "Our AI is trained on millions of customer interactions and can handle most queries autonomously. For complex issues, it seamlessly transfers to a human agent with full context.",
  },
]

export default function SupportPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Support</h1>
        <p className="text-muted-foreground">Get help and find answers to common questions</p>
      </div>

      {/* System Status */}
      <Card>
        <CardHeader>
          <CardTitle>System Status</CardTitle>
          <CardDescription>Current operational status of Vox services</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm">Call Center API</span>
            </div>
            <Badge variant="secondary" className="bg-green-500/10 text-green-500">
              Operational
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm">WhatsApp Integration</span>
            </div>
            <Badge variant="secondary" className="bg-green-500/10 text-green-500">
              Operational
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-yellow-500" />
              <span className="text-sm">Analytics Dashboard</span>
            </div>
            <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-500">
              Degraded
            </Badge>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Contact Support */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Support</CardTitle>
            <CardDescription>Send us a message and we'll get back to you soon</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" placeholder="How can we help?" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" placeholder="Describe your issue or question..." rows={5} />
            </div>
            <Button className="w-full">
              <MessageSquare className="h-4 w-4 mr-2" />
              Send Message
            </Button>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common support resources</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <HelpCircle className="h-4 w-4 mr-2" />
              View Documentation
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <MessageSquare className="h-4 w-4 mr-2" />
              Start Live Chat
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <CheckCircle className="h-4 w-4 mr-2" />
              Report a Bug
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* FAQs */}
      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
          <CardDescription>Find answers to common questions</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  )
}
