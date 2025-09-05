import { Navbar } from "@/components/layout/navbar"
import { SurveillanceUpload } from "@/components/surveillance/surveillance-upload"

export default function SurveillancePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Trade Surveillance</h1>
          <p className="text-muted-foreground">
            Upload trading data to identify potential compliance risks and anomalies
          </p>
        </div>

        {/* Surveillance Upload Component */}
        <SurveillanceUpload />
      </main>
    </div>
  )
}
