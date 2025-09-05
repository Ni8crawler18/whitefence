"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { FileText, Download, FileSpreadsheet } from "lucide-react"

const regulators = [
  { value: "sebi", label: "SEBI" },
  { value: "nse", label: "NSE" },
  { value: "bse", label: "BSE" },
  { value: "assigned-exchange", label: "Assigned Stock Exchange" },
]

export function ReportGenerator() {
  const [selectedRegulator, setSelectedRegulator] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerateReport = (format: "pdf" | "excel") => {
    if (!selectedRegulator) return

    setIsGenerating(true)
    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false)
      // In a real app, this would trigger a download
      alert(
        `${format.toUpperCase()} report generated for ${regulators.find((r) => r.value === selectedRegulator)?.label}`,
      )
    }, 2000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <FileText className="h-5 w-5 text-primary" />
          <span>Generate New Report</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Regulator Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Select Regulator</label>
            <Select value={selectedRegulator} onValueChange={setSelectedRegulator}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose regulator for report generation" />
              </SelectTrigger>
              <SelectContent>
                {regulators.map((regulator) => (
                  <SelectItem key={regulator.value} value={regulator.value}>
                    {regulator.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Export Options */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Export Format</label>
            <div className="flex items-center space-x-3">
              <Button
                onClick={() => handleGenerateReport("pdf")}
                disabled={!selectedRegulator || isGenerating}
                className="flex items-center space-x-2"
                variant="default"
              >
                <Download className="h-4 w-4" />
                <span>{isGenerating ? "Generating..." : "Export PDF"}</span>
              </Button>
              <Button
                onClick={() => handleGenerateReport("excel")}
                disabled={!selectedRegulator || isGenerating}
                className="flex items-center space-x-2"
                variant="outline"
              >
                <FileSpreadsheet className="h-4 w-4" />
                <span>{isGenerating ? "Generating..." : "Export Excel"}</span>
              </Button>
            </div>
          </div>

          {/* Report Info */}
          {selectedRegulator && (
            <div className="p-4 bg-muted/50 rounded-lg border border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Report for: {regulators.find((r) => r.value === selectedRegulator)?.label}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Includes compliance status, pending items, and submission history
                  </p>
                </div>
                <Badge variant="secondary" className="text-xs">
                  Current Period
                </Badge>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
