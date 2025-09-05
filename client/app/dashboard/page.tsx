import { Navbar } from "@/components/layout/navbar"
import { ComplianceHealthScore } from "@/components/dashboard/compliance-health-score"
import { UpcomingDeadlines } from "@/components/dashboard/upcoming-deadlines"
import { PendingTasksTable } from "@/components/dashboard/pending-tasks-table"
import { AlertsSection } from "@/components/dashboard/alerts-section"
import { QuickActions } from "@/components/dashboard/quick-actions"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="p-6 space-y-6">
        {/* Header with Compliance Health Score */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Hello Compliance Officer</h1>
            <p className="text-muted-foreground">Welcome to your compliance dashboard</p>
          </div>
          <ComplianceHealthScore score={72} />
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Upcoming Deadlines */}
          <div className="lg:col-span-2 space-y-6">
            <UpcomingDeadlines />
            <PendingTasksTable />
          </div>

          {/* Right Column - Alerts and Quick Actions */}
          <div className="space-y-6">
            <AlertsSection />
            <QuickActions />
          </div>
        </div>
      </main>
    </div>
  )
}
