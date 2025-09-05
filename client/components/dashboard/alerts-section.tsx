import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle, Bell } from "lucide-react"

const alerts = [
  {
    message: "Client Funding Report overdue by 1 day.",
    type: "error" as const,
  },
  {
    message: "Website Compliance Snapshot pending.",
    type: "warning" as const,
  },
]

export function AlertsSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Bell className="h-5 w-5 text-primary" />
          <span>Alerts</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {alerts.map((alert, index) => (
            <Alert key={index} variant={alert.type === "error" ? "destructive" : "default"}>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription className="text-sm">{alert.message}</AlertDescription>
            </Alert>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
