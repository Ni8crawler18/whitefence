import { Navbar } from "@/components/layout/navbar"
import { UserProfile } from "@/components/settings/user-profile"
import { NotificationSettings } from "@/components/settings/notification-settings"
import { TeamMembers } from "@/components/settings/team-members"

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">Manage your profile, notifications, and team settings</p>
        </div>

        {/* Settings Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            <UserProfile />
            <NotificationSettings />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <TeamMembers />
          </div>
        </div>
      </main>
    </div>
  )
}
