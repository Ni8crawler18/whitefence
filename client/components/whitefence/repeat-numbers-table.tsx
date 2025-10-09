"use client"

import useSWR from "swr"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export default function RepeatNumbersTable() {
  const { data } = useSWR("/api/whitefence/repeat-msisdns", fetcher, { revalidateOnFocus: false })
  const rows = data?.msisdns ?? []

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>MSISDN</TableHead>
            <TableHead className="text-right">Fraud events</TableHead>
            <TableHead className="text-right">Unique devices</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((r: any) => (
            <TableRow key={r.msisdn}>
              <TableCell className="font-mono">{r.msisdn}</TableCell>
              <TableCell className="text-right">{r.events}</TableCell>
              <TableCell className="text-right">{r.devices}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
