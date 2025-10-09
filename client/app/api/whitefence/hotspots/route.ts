import { NextResponse } from "next/server"

export async function GET() {
  const hotspots = [
    { region: "Budapest", count: 28, delta: 18 },
  ]
  return NextResponse.json({ hotspots })
}
