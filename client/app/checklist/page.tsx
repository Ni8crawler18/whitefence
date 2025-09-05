import { Navbar } from "@/components/layout/navbar"
import { ComplianceProgress } from "@/components/checklist/compliance-progress"
import { ChecklistFilters } from "@/components/checklist/checklist-filters"
import { ChecklistTable } from "@/components/checklist/checklist-table"

export default function ChecklistPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Compliance Checklist</h1>
          <p className="text-muted-foreground">Track and manage all regulatory compliance requirements</p>
        </div>

        {/* Progress Bar */}
        <ComplianceProgress completion={60} />

        {/* Filters */}
        <ChecklistFilters />

        {/* Checklist Table */}
        <ChecklistTable />
      </main>
    </div>
  )
}
