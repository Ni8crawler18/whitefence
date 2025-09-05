import { Navbar } from "@/components/layout/navbar"
import { ReportGenerator } from "@/components/reports/report-generator"
import { ReportTemplates } from "@/components/reports/report-templates"
import { ReportHistory } from "@/components/reports/report-history"

export default function ReportsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Generate Compliance Reports</h1>
          <p className="text-muted-foreground">Create and manage regulatory compliance reports for SEBI, NSE, BSE</p>
        </div>

        {/* Report Generator */}
        <ReportGenerator />

        {/* Report Templates */}
        <ReportTemplates />

        {/* Report History */}
        <ReportHistory />
      </main>
    </div>
  )
}
