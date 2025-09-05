import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, FileText, Eye, Zap } from "lucide-react"

const actions = [
  {
    label: "Upload Document",
    icon: Upload,
    variant: "default" as const,
  },
  {
    label: "Generate & Submit Report",
    description: "(Samuhik Prativedan Manch)",
    icon: FileText,
    variant: "default" as const,
  },
  {
    label: "View Audit Log",
    icon: Eye,
    variant: "outline" as const,
  },
]

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Zap className="h-5 w-5 text-primary" />
          <span>Quick Actions</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {actions.map((action, index) => (
            <Button key={index} variant={action.variant} className="w-full justify-start text-left h-auto p-3">
              <action.icon className="h-4 w-4 mr-3 flex-shrink-0" />
              <div>
                <div className="font-medium text-sm">{action.label}</div>
                {action.description && <div className="text-xs text-muted-foreground mt-1">{action.description}</div>}
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
