"use client"

import { Card, CardContent } from "@/components/ui/card"

interface ComplianceHealthScoreProps {
  score: number
}

export function ComplianceHealthScore({ score }: ComplianceHealthScoreProps) {
  const circumference = 2 * Math.PI * 45
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (score / 100) * circumference

  return (
    <Card className="w-48">
      <CardContent className="p-6">
        <div className="flex flex-col items-center space-y-2">
          <div className="relative w-24 h-24">
            <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                className="text-muted"
              />
              {/* Progress circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                className="text-primary transition-all duration-300 ease-in-out"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-foreground">{score}%</span>
            </div>
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-foreground">Compliance Health Score</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
