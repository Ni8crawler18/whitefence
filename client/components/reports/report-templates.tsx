import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Download, Calendar } from "lucide-react"

const reportTemplates = [
  {
    title: "Compliance Status Report – Assigned Exchange – July 2025",
    regulator: "Assigned Exchange",
    period: "July 2025",
    status: "Ready to Generate",
    statusColor: "default" as const,
    description: "Quarterly compliance status report for assigned stock exchange",
  },
  {
    title: "Client Funding Report – May 2025",
    regulator: "SEBI",
    period: "May 2025",
    status: "Template Available",
    statusColor: "secondary" as const,
    description: "Monthly client funding and margin report",
  },
]

export function ReportTemplates() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Calendar className="h-5 w-5 text-primary" />
          <span>Report Templates</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {reportTemplates.map((template, index) => (
            <div key={index} className="p-4 border border-border rounded-lg">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <FileText className="h-4 w-4 text-primary" />
                    <h4 className="font-medium text-foreground text-sm">{template.title}</h4>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{template.description}</p>
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <span>Regulator: {template.regulator}</span>
                    <span>Period: {template.period}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={template.statusColor} className="text-xs">
                    {template.status}
                  </Badge>
                  <Button size="sm" variant="outline" className="text-xs bg-transparent">
                    <Download className="h-3 w-3 mr-1" />
                    Generate
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
