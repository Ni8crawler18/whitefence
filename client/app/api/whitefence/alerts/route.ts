import { NextResponse } from "next/server"

export async function GET() {
  const alerts = [
    {
      id: "a1",
      when: "2m ago",
      severity: "high",
      title: "SIM-swap within 24h of OTP attempt",
      description: "MSISDN 99*********5, device mismatch across 2 sessions.",
    },
    {
      id: "a2",
      when: "18m ago",
      severity: "medium",
      title: "Location mismatch",
      description: "Transaction originated 400km away from last known cell.",
    },
    {
      id: "a3",
      when: "1h ago",
      severity: "low",
      title: "Repeat MSISDN detected",
      description: "Number reused across 3 failed auth attempts.",
    },
  ]
  return NextResponse.json({ alerts })
}
