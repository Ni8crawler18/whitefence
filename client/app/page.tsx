import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import KPICards from "@/components/whitefence/kpi-cards"
import TrendChart from "@/components/whitefence/trend-chart"
import HotspotsTable from "@/components/whitefence/hotspots-table"
import RepeatNumbersTable from "@/components/whitefence/repeat-numbers-table"
import Watchlist from "@/components/whitefence/watchlist"
import AlertsFeed from "@/components/whitefence/alerts-feed"

export default function Page() {
  return (
    <main className="px-4 py-8 md:px-8 lg:px-12">
      <header className="mb-8 md:mb-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">Whitefence Intelligence</h1>
            <p className="text-pretty text-sm text-muted-foreground md:text-base">
              Telecom-layer fraud insights: SIM-swap, device-swap, and location-mismatch detection. Built for banks and
              security teams.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="#watchlist"
              className="inline-flex rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground"
            >
              Manage watchlist
            </a>
            <a href="#alerts" className="inline-flex rounded-md bg-secondary px-3 py-2 text-sm font-medium">
              View alerts
            </a>
          </div>
        </div>
      </header>

      <section className="mb-8">
        <KPICards />
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Fraud attempts (last 14 days)</CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <TrendChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top hotspots</CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <HotspotsTable />
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Repeat MSISDNs</CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <RepeatNumbersTable />
          </CardContent>
        </Card>

        <Card id="watchlist">
          <CardHeader>
            <CardTitle>Watchlist</CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <Watchlist />
          </CardContent>
        </Card>

        <Card id="alerts" className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Recent alerts</CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <AlertsFeed />
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
