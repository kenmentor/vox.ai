"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CustomerDetailPanel } from "@/components/dashboard/customer-detail-panel"
import { Search, Filter, Download, UserPlus, Phone, MessageSquare, Mail } from "lucide-react"

interface Customer {
  id: string
  name: string
  email: string
  phone: string
  location: string
  joinDate: string
  status: "active" | "inactive" | "vip"
  totalCalls: number
  totalMessages: number
  satisfaction: number
  interactions: {
    id: string
    type: "call" | "whatsapp" | "email"
    subject: string
    date: string
    status: "resolved" | "pending" | "escalated"
  }[]
}

const mockCustomers: Customer[] = [
  {
    id: "1",
    name: "Alice Cooper",
    email: "alice@example.com",
    phone: "+1 (555) 111-2222",
    location: "New York, NY",
    joinDate: "Jan 2024",
    status: "vip",
    totalCalls: 45,
    totalMessages: 128,
    satisfaction: 98,
    interactions: [
      { id: "1", type: "call", subject: "Order inquiry", date: "2 hours ago", status: "resolved" },
      { id: "2", type: "whatsapp", subject: "Product question", date: "1 day ago", status: "resolved" },
      { id: "3", type: "email", subject: "Billing issue", date: "3 days ago", status: "resolved" },
    ],
  },
  {
    id: "2",
    name: "Bob Martinez",
    email: "bob@example.com",
    phone: "+1 (555) 222-3333",
    location: "Los Angeles, CA",
    joinDate: "Feb 2024",
    status: "active",
    totalCalls: 23,
    totalMessages: 67,
    satisfaction: 92,
    interactions: [
      { id: "1", type: "whatsapp", subject: "Subscription change", date: "5 hours ago", status: "pending" },
      { id: "2", type: "call", subject: "Technical support", date: "2 days ago", status: "resolved" },
    ],
  },
  {
    id: "3",
    name: "Carol White",
    email: "carol@example.com",
    phone: "+1 (555) 333-4444",
    location: "Chicago, IL",
    joinDate: "Mar 2024",
    status: "active",
    totalCalls: 12,
    totalMessages: 34,
    satisfaction: 95,
    interactions: [
      { id: "1", type: "call", subject: "Product availability", date: "1 day ago", status: "resolved" },
      { id: "2", type: "email", subject: "Shipping inquiry", date: "4 days ago", status: "resolved" },
    ],
  },
  {
    id: "4",
    name: "David Lee",
    email: "david@example.com",
    phone: "+1 (555) 444-5555",
    location: "Houston, TX",
    joinDate: "Jan 2024",
    status: "vip",
    totalCalls: 67,
    totalMessages: 189,
    satisfaction: 97,
    interactions: [
      { id: "1", type: "whatsapp", subject: "Account upgrade", date: "3 hours ago", status: "resolved" },
      { id: "2", type: "call", subject: "Feature request", date: "1 day ago", status: "escalated" },
    ],
  },
  {
    id: "5",
    name: "Emma Davis",
    email: "emma@example.com",
    phone: "+1 (555) 555-6666",
    location: "Phoenix, AZ",
    joinDate: "Apr 2024",
    status: "active",
    totalCalls: 8,
    totalMessages: 21,
    satisfaction: 89,
    interactions: [{ id: "1", type: "email", subject: "General inquiry", date: "2 days ago", status: "resolved" }],
  },
]

export default function CustomersPage() {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredCustomers = mockCustomers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery),
  )

  return (
    <div className="p-6">
      <div className="grid lg:grid-cols-[1fr_400px] gap-6">
        {/* Main Content */}
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
              <p className="text-muted-foreground">Manage and view customer profiles</p>
            </div>
            <Button>
              <UserPlus className="h-4 w-4 mr-2" />
              Add Customer
            </Button>
          </div>

          {/* Search and Filters */}
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search customers by name, email, or phone..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>

          {/* Customer Table */}
          <div className="border border-border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50 border-b border-border">
                  <tr>
                    <th className="text-left p-4 font-medium text-sm">Customer</th>
                    <th className="text-left p-4 font-medium text-sm">Contact</th>
                    <th className="text-left p-4 font-medium text-sm">Status</th>
                    <th className="text-left p-4 font-medium text-sm">Interactions</th>
                    <th className="text-left p-4 font-medium text-sm">Satisfaction</th>
                    <th className="text-left p-4 font-medium text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredCustomers.map((customer) => (
                    <tr
                      key={customer.id}
                      className="hover:bg-muted/50 cursor-pointer transition-colors"
                      onClick={() => setSelectedCustomer(customer)}
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                            <span className="font-semibold text-primary">{customer.name.charAt(0)}</span>
                          </div>
                          <div>
                            <p className="font-medium">{customer.name}</p>
                            <p className="text-xs text-muted-foreground">{customer.location}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <p className="text-sm">{customer.email}</p>
                        <p className="text-xs text-muted-foreground">{customer.phone}</p>
                      </td>
                      <td className="p-4">
                        <Badge variant={customer.status === "vip" ? "default" : "secondary"}>
                          {customer.status.toUpperCase()}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-3 text-sm">
                          <span className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {customer.totalCalls}
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageSquare className="h-3 w-3" />
                            {customer.totalMessages}
                          </span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden max-w-[80px]">
                            <div className="h-full bg-primary" style={{ width: `${customer.satisfaction}%` }} />
                          </div>
                          <span className="text-sm font-medium">{customer.satisfaction}%</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()}>
                            <Phone className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()}>
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()}>
                            <Mail className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Detail Panel */}
        <div className="lg:sticky lg:top-6 lg:self-start">
          {selectedCustomer ? (
            <CustomerDetailPanel customer={selectedCustomer} onClose={() => setSelectedCustomer(null)} />
          ) : (
            <div className="border border-border rounded-lg p-12 text-center">
              <p className="text-muted-foreground">Select a customer to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
