import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface ComplianceProgressProps {
  completion: number
}

export function ComplianceProgress({ completion }: ComplianceProgressProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">Compliance Completion</h3>
            <span className="text-2xl font-bold text-primary">{completion}%</span>
          </div>
          <Progress value={completion} className="h-3" />
          <p className="text-sm text-muted-foreground">
            {completion < 70 ? "Action required to improve compliance score" : "Good compliance standing"}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
