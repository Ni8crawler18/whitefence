"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const filterOptions = [
  { label: "All", value: "all" },
  { label: "Monthly", value: "monthly" },
  { label: "Quarterly", value: "quarterly" },
  { label: "Annual", value: "annual" },
  { label: "Ongoing", value: "ongoing" },
]

export function ChecklistFilters() {
  const [activeFilter, setActiveFilter] = useState("all")

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-foreground">Filter by frequency:</span>
            <div className="flex items-center space-x-2">
              {filterOptions.map((option) => (
                <Button
                  key={option.value}
                  variant={activeFilter === option.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveFilter(option.value)}
                  className="text-xs"
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <Badge variant="destructive" className="w-3 h-3 p-0"></Badge>
              <span className="text-muted-foreground">Overdue</span>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="w-3 h-3 p-0"></Badge>
              <span className="text-muted-foreground">Pending</span>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="default" className="w-3 h-3 p-0 bg-primary"></Badge>
              <span className="text-muted-foreground">In Progress</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
