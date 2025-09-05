import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Clock } from "lucide-react"

const deadlines = [
  {
    title: "Compliance Status Report (Assigned Exchange)",
    dueDate: "Due in 5 days",
    priority: "High Priority",
    priorityColor: "destructive" as const,
  },
  {
    title: "Website Compliance Checklist",
    dueDate: "Due in 3 days",
    priority: "Medium",
    priorityColor: "secondary" as const,
  },
  {
    title: "Capital Adequacy Certificate (Quarterly)",
    dueDate: "Due in 7 days",
    priority: "Medium",
    priorityColor: "secondary" as const,
  },
]

export function UpcomingDeadlines() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Clock className="h-5 w-5 text-primary" />
          <span>Upcoming Deadlines</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {deadlines.map((deadline, index) => (
            <div key={index} className="flex items-start justify-between p-4 border border-border rounded-lg">
              <div className="flex-1">
                <h4 className="font-medium text-foreground text-sm">{deadline.title}</h4>
                <p className="text-sm text-muted-foreground mt-1">{deadline.dueDate}</p>
              </div>
              <div className="flex items-center space-x-2">
                {deadline.priority === "High Priority" && <AlertTriangle className="h-4 w-4 text-destructive" />}
                <Badge variant={deadline.priorityColor} className="text-xs">
                  {deadline.priority}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
