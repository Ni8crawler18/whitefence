import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { History, Download, FileText, FileSpreadsheet, Eye } from "lucide-react"

const reportHistory = [
  {
    regulator: "SEBI",
    reportName: "Client Funding Report",
    format: "PDF",
    formatIcon: FileText,
    generatedDate: "May 25, 2025",
    period: "April-May 2025",
    status: "Submitted",
    statusColor: "default" as const,
  },
  {
    regulator: "SEBI",
    reportName: "Samuhik Prativedan Report",
    format: "Excel",
    formatIcon: FileSpreadsheet,
    generatedDate: "June 30, 2025",
    period: "Q2 2025",
    status: "Submitted",
    statusColor: "default" as const,
  },
  {
    regulator: "NSE",
    reportName: "Trading Member Compliance Report",
    format: "PDF",
    formatIcon: FileText,
    generatedDate: "June 15, 2025",
    period: "May 2025",
    status: "Submitted",
    statusColor: "default" as const,
  },
  {
    regulator: "BSE",
    reportName: "Monthly Activity Report",
    format: "Excel",
    formatIcon: FileSpreadsheet,
    generatedDate: "July 5, 2025",
    period: "June 2025",
    status: "Draft",
    statusColor: "secondary" as const,
  },
]

export function ReportHistory() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <History className="h-5 w-5 text-primary" />
            <span>Report History</span>
          </div>
          <Badge variant="outline" className="text-xs">
            {reportHistory.length} Reports Generated
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Report Name</TableHead>
              <TableHead>Regulator</TableHead>
              <TableHead>Period</TableHead>
              <TableHead>Format</TableHead>
              <TableHead>Generated Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reportHistory.map((report, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{report.reportName}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="text-xs">
                    {report.regulator}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">{report.period}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <report.formatIcon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{report.format}</span>
                  </div>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">{report.generatedDate}</TableCell>
                <TableCell>
                  <Badge variant={report.statusColor} className="text-xs">
                    {report.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-1">
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <Eye className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <Download className="h-3 w-3" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
