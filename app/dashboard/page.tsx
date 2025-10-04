"use client";
import { StatsCard } from "@/components/dashboard/stats-card";
import { Phone, PhoneMissed, CheckCircle2, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6 page-transition">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Active Calls"
          value={12}
          change="+3 from last hour"
          changeType="positive"
          icon={Phone}
        />
        <StatsCard
          title="Missed Calls"
          value={4}
          change="-2 from yesterday"
          changeType="positive"
          icon={PhoneMissed}
        />
        <StatsCard
          title="Resolved Today"
          value={156}
          change="+12% from yesterday"
          changeType="positive"
          icon={CheckCircle2}
        />
        <StatsCard
          title="AI Success Rate"
          value="94.2%"
          change="+2.1% this week"
          changeType="positive"
          icon={TrendingUp}
        />
      </div>

      {/* Recent Activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="card-enhanced">
          <CardHeader>
            <CardTitle>Recent Calls</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentCalls.map((call) => (
                <div
                  key={call.id}
                  className="flex items-center justify-between py-3 border-b border-border last:border-0 transition-all duration-200 hover:bg-muted/30 hover:px-2 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center transition-all duration-200 group-hover:bg-primary/20">
                      <Phone className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{call.caller}</p>
                      <p className="text-xs text-muted-foreground">
                        {call.phone}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge
                      variant={
                        call.status === "resolved"
                          ? "default"
                          : call.status === "active"
                          ? "secondary"
                          : "outline"
                      }
                      className="transition-all duration-200"
                    >
                      {call.status}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">
                      {call.duration}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="card-enhanced">
          <CardHeader>
            <CardTitle>AI Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {aiMetrics.map((metric) => (
                <div key={metric.label} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      {metric.label}
                    </span>
                    <span className="font-medium">{metric.value}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-1000 ease-out shadow-lg shadow-primary/30"
                      style={{ width: `${metric.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="card-enhanced">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <button className="flex items-center gap-3 p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-card transition-all duration-200 text-left group hover:scale-105 hover:shadow-lg hover:shadow-primary/10">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-200 group-hover:scale-110">
                <Phone className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">Start Call Session</p>
                <p className="text-xs text-muted-foreground">
                  Begin receiving calls
                </p>
              </div>
            </button>
            <button className="flex items-center gap-3 p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-card transition-all duration-200 text-left group hover:scale-105 hover:shadow-lg hover:shadow-accent/10">
              <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-all duration-200 group-hover:scale-110">
                <CheckCircle2 className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="font-medium">View Reports</p>
                <p className="text-xs text-muted-foreground">
                  Check detailed analytics
                </p>
              </div>
            </button>
            <button className="flex items-center gap-3 p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-card transition-all duration-200 text-left group hover:scale-105 hover:shadow-lg hover:shadow-primary/10">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-200 group-hover:scale-110">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">Configure AI</p>
                <p className="text-xs text-muted-foreground">
                  Customize responses
                </p>
              </div>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

const recentCalls = [
  {
    id: 1,
    caller: "John Smith",
    phone: "+1 (555) 123-4567",
    status: "resolved",
    duration: "5m 23s",
  },
  {
    id: 2,
    caller: "Sarah Johnson",
    phone: "+1 (555) 234-5678",
    status: "active",
    duration: "2m 15s",
  },
  {
    id: 3,
    caller: "Mike Wilson",
    phone: "+1 (555) 345-6789",
    status: "resolved",
    duration: "8m 45s",
  },
  {
    id: 4,
    caller: "Emily Davis",
    phone: "+1 (555) 456-7890",
    status: "missed",
    duration: "0m 0s",
  },
];

const aiMetrics = [
  { label: "Response Accuracy", value: 96 },
  { label: "Customer Satisfaction", value: 92 },
  { label: "First Call Resolution", value: 88 },
  { label: "Average Handle Time", value: 85 },
];
