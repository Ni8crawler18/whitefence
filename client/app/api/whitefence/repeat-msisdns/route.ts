import { NextResponse } from "next/server"

function mask(num: string) {
  return num.replace(/(\d{3})\d{4}(\d{3,})/, "$1••••$2")
}

export async function GET() {
  const msisdns = [
    { msisdn: mask("999999481001"), events: 4, devices: 5 },
    { msisdn: mask("999999481002"), events: 6, devices: 3 },
    { msisdn: mask("999999481003"), events: 7, devices: 3 },
    { msisdn: mask("999999481004"), events: 6, devices: 2 },
    { msisdn: mask("999999481005"), events: 5, devices: 2 },
  ]
  return NextResponse.json({ msisdns })
}
