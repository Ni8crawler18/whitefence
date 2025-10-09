import { NextResponse } from "next/server"

function seeded(seed: number) {
  let s = seed
  return () => (s = (s * 9301 + 49297) % 233280) / 233280
}

function mask(num: string) {
  return num.replace(/(\d{3})\d{4}(\d{3,})/, "$1••••$2")
}

export async function GET() {
  const rand = seeded(42)

  const days = 14
  const today = new Date()
  const timeseries = Array.from({ length: days }).map((_, i) => {
    const d = new Date(today)
    d.setDate(d.getDate() - (days - 1 - i))
    const attempts = Math.round(40 + rand() * 120)
    const blocked = Math.round(attempts * (0.55 + rand() * 0.25))
    return {
      date: d.toISOString().slice(5, 10),
      attempts,
      blocked,
    }
  })

  const kpis = {
    simSwapsBlocked: timeseries.reduce((a, b) => a + b.blocked, 0),
    deviceSwapsFlagged: 28,
    locationMismatch: 28,
    repeatMsisdns: 5,
    ttdSecsAvg: 2.8,
  }

  const sampleMsisdns = ["999999481005"].map(mask)

  return NextResponse.json({ kpis, timeseries, sampleMsisdns })
}
