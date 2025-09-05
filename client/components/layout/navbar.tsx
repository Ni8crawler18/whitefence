"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { User, Settings, LogOut } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export function Navbar() {
  const router = useRouter()

  const handleLogout = () => {
    router.push("/login")
  }

  return (
    <nav className="border-b border-border bg-background">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Logo */}
        <div className="flex items-center space-x-8">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <h1 className="text-xl font-bold text-foreground">Whitefence</h1>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/dashboard"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/checklist"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Checklist
            </Link>
            <Link
              href="/surveillance"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Surveillance
            </Link>
            <Link href="/reports" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Reports
            </Link>
            <Link href="/settings" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Settings
            </Link>
          </div>
        </div>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span className="text-sm font-medium">Compliance Officer</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem asChild>
              <Link href="/settings" className="flex items-center">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout} className="flex items-center">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  )
}
