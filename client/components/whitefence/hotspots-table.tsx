"use client"

import useSWR from "swr"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export default function HotspotsTable() {
  const { data } = useSWR("/api/whitefence/hotspots", fetcher, { revalidateOnFocus: false })
  const rows = data?.hotspots ?? []

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Region</TableHead>
            <TableHead className="text-right">Incidents</TableHead>
            <TableHead className="text-right">Δ 7d</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((r: any) => (
            <TableRow key={r.region}>
              <TableCell className="font-medium">{r.region}</TableCell>
              <TableCell className="text-right">{r.count}</TableCell>
              <TableCell className="text-right">
                <Badge
                  variant={r.delta >= 0 ? "default" : "secondary"}
                  className={r.delta >= 0 ? "bg-accent text-accent-foreground" : ""}
                >
                  {r.delta >= 0 ? "+" : ""}
                  {r.delta}%
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
