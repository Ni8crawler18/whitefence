import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CheckCircle, AlertTriangle, X, Upload } from "lucide-react"

const tasks = [
  {
    taskName: "Monthly Client Funding Report",
    regulator: "SEBI",
    dueDate: "Due Today",
    status: "Overdue",
    statusIcon: X,
    statusColor: "destructive" as const,
    action: "Upload",
  },
  {
    taskName: "Capital Adequacy Certificate",
    regulator: "SEBI",
    dueDate: "Due in 7 days",
    status: "Pending",
    statusIcon: AlertTriangle,
    statusColor: "secondary" as const,
    action: "Upload",
  },
  {
    taskName: "Preservation of Books & Records (5 years)",
    regulator: "SEBI",
    dueDate: "Ongoing",
    status: "Ongoing",
    statusIcon: AlertTriangle,
    statusColor: "secondary" as const,
    action: "Mark Done",
  },
]

export function PendingTasksTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <CheckCircle className="h-5 w-5 text-primary" />
          <span>Pending Tasks</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Task Name</TableHead>
              <TableHead>Regulator</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.map((task, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{task.taskName}</TableCell>
                <TableCell>{task.regulator}</TableCell>
                <TableCell>{task.dueDate}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <task.statusIcon className="h-4 w-4" />
                    <Badge variant={task.statusColor} className="text-xs">
                      {task.status}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell>
                  <Button size="sm" variant="outline" className="text-xs bg-transparent">
                    {task.action === "Upload" && <Upload className="h-3 w-3 mr-1" />}
                    {task.action}
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
