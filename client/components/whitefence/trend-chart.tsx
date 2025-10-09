"use client"

import useSWR from "swr"
import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export default function TrendChart() {
  const { data } = useSWR("/api/whitefence/metrics", fetcher, { revalidateOnFocus: false })
  const series = data?.timeseries ?? []

  return (
    <div className="h-[280px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={series} margin={{ left: 8, right: 8, top: 8, bottom: 8 }}>
          <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <Legend />
          <Area
            type="monotone"
            dataKey="attempts"
            stroke="oklch(var(--color-chart-4))"
            fill="oklch(var(--color-chart-4))"
            fillOpacity={0.25}
            name="Attempts"
          />
          <Area
            type="monotone"
            dataKey="blocked"
            stroke="oklch(var(--color-chart-1))"
            fill="oklch(var(--color-chart-1))"
            fillOpacity={0.35}
            name="Blocked"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
