"use client"

import useSWR from "swr"
import { Badge } from "@/components/ui/badge"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export default function AlertsFeed() {
  const { data } = useSWR("/api/whitefence/alerts", fetcher, { revalidateOnFocus: false })
  const rows = data?.alerts ?? []

  return (
    <ul className="flex flex-col gap-3">
      {rows.map((a: any) => (
        <li key={a.id} className="rounded-md border bg-card/60 p-3">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">{a.when}</div>
            <Badge className={a.severity === "high" ? "bg-accent text-accent-foreground" : ""}>{a.severity}</Badge>
          </div>
          <div className="mt-1 text-sm">
            <span className="font-medium">{a.title}</span>
            <span className="text-muted-foreground"> — {a.description}</span>
          </div>
        </li>
      ))}
    </ul>
  )
}
