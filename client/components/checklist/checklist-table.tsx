"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CheckCircle, AlertTriangle, X, Clock, FileText, Upload, CheckSquare } from "lucide-react"

const checklistItems = [
  {
    task: "Submit Compliance Status Report (SEBI / Assigned Exchange)",
    frequency: "Quarterly",
    dueDate: "Due in 5 days",
    status: "Pending",
    statusColor: "secondary" as const,
    statusIcon: AlertTriangle,
    regulator: "SEBI / Exchange",
    action: "Submit Report",
  },
  {
    task: "Samuhik Prativedan Manch Submission",
    frequency: "Quarterly",
    dueDate: "Due in 10 days",
    status: "Pending",
    statusColor: "secondary" as const,
    statusIcon: AlertTriangle,
    regulator: "SEBI",
    action: "Submit Report",
  },
  {
    task: "Monthly Client Funding Report",
    frequency: "Monthly",
    dueDate: "Overdue by 1 day",
    status: "Overdue",
    statusColor: "destructive" as const,
    statusIcon: X,
    regulator: "SEBI",
    action: "Upload Now",
  },
  {
    task: "Capital Adequacy Certificate",
    frequency: "Quarterly",
    dueDate: "Due in 7 days",
    status: "Pending",
    statusColor: "secondary" as const,
    statusIcon: AlertTriangle,
    regulator: "SEBI",
    action: "Upload Document",
  },
  {
    task: "Preservation of Books & Records (5 years)",
    frequency: "Ongoing",
    dueDate: "Ongoing",
    status: "In Progress",
    statusColor: "default" as const,
    statusIcon: Clock,
    regulator: "SEBI",
    action: "Update Status",
  },
  {
    task: "Website Compliance Check (SEBI registration no., disclaimers, investor education)",
    frequency: "Annual",
    dueDate: "Due in 3 days",
    status: "Pending",
    statusColor: "secondary" as const,
    statusIcon: AlertTriangle,
    regulator: "SEBI",
    action: "Review & Submit",
  },
]

export function ChecklistTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <CheckSquare className="h-5 w-5 text-primary" />
          <span>Compliance Requirements</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40%]">Compliance Requirement</TableHead>
              <TableHead>Frequency</TableHead>
              <TableHead>Regulator</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {checklistItems.map((item, index) => (
              <TableRow key={index} className={item.status === "Overdue" ? "bg-destructive/5" : ""}>
                <TableCell className="font-medium">
                  <div className="flex items-start space-x-3">
                    <item.statusIcon
                      className={`h-4 w-4 mt-0.5 flex-shrink-0 ${
                        item.status === "Overdue"
                          ? "text-destructive"
                          : item.status === "In Progress"
                            ? "text-primary"
                            : "text-muted-foreground"
                      }`}
                    />
                    <span className="text-sm leading-relaxed">{item.task}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="text-xs">
                    {item.frequency}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">{item.regulator}</TableCell>
                <TableCell
                  className={`text-sm ${item.status === "Overdue" ? "text-destructive font-medium" : "text-muted-foreground"}`}
                >
                  {item.dueDate}
                </TableCell>
                <TableCell>
                  <Badge variant={item.statusColor} className="text-xs">
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button
                    size="sm"
                    variant={item.status === "Overdue" ? "default" : "outline"}
                    className={`text-xs ${item.status === "Overdue" ? "bg-destructive hover:bg-destructive/90" : ""}`}
                  >
                    {item.action.includes("Upload") && <Upload className="h-3 w-3 mr-1" />}
                    {item.action.includes("Submit") && <FileText className="h-3 w-3 mr-1" />}
                    {item.action.includes("Update") && <CheckCircle className="h-3 w-3 mr-1" />}
                    {item.action.includes("Review") && <CheckSquare className="h-3 w-3 mr-1" />}
                    {item.action}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
