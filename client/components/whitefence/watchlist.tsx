"use client"

import { useEffect, useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

type Item = { id: string; label: string }

const STORAGE_KEY = "whitefence.watchlist"

export default function Watchlist() {
  const [value, setValue] = useState("")
  const [items, setItems] = useState<Item[]>([])

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) setItems(JSON.parse(raw))
  }, [])
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const add = () => {
    const label = value.trim()
    if (!label) return
    setItems((prev) => [{ id: `${Date.now()}`, label }, ...prev])
    setValue("")
  }
  const remove = (id: string) => setItems((prev) => prev.filter((i) => i.id !== id))

  const count = useMemo(() => items.length, [items])

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Add MSISDN, device ID, or IP"
          className="flex-1"
        />
        <Button onClick={add} className="bg-primary text-primary-foreground">
          Add
        </Button>
      </div>

      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>Monitoring:</span>
        <Badge variant="secondary">{count} entities</Badge>
      </div>

      <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {items.map((i) => (
          <li key={i.id} className="flex items-center justify-between rounded-md bg-secondary/60 px-3 py-2">
            <span className="font-mono text-sm">{i.label}</span>
            <Button variant="ghost" size="sm" onClick={() => remove(i.id)}>
              Remove
            </Button>
          </li>
        ))}
      </ul>
    </div>
  )
}
