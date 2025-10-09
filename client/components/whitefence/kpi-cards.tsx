"use client"

import useSWR from "swr"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export default function KPICards() {
  const { data } = useSWR("/api/whitefence/metrics", fetcher, { revalidateOnFocus: false })

  const items = [
    { key: "simSwapsBlocked", label: "SIM-swaps blocked" },
    { key: "deviceSwapsFlagged", label: "Device-swaps flagged" },
    { key: "locationMismatch", label: "Location mismatches" },
    { key: "repeatMsisdns", label: "Repeat MSISDNs" },
    { key: "ttdSecsAvg", label: "Avg time-to-detect (s)" },
  ] as const

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {items.map((it) => (
        <Card key={it.key} className={cn("bg-secondary/60")}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{it.label}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{data?.kpis?.[it.key] ?? "—"}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
