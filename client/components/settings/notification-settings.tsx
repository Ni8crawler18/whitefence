"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bell, Mail, MessageSquare } from "lucide-react"

export function NotificationSettings() {
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    emailDays: "7",
    smsReminders: false,
    smsDays: "2",
    pushNotifications: true,
    weeklyDigest: true,
  })

  const updateNotification = (key: string, value: boolean | string) => {
    setNotifications((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Bell className="h-5 w-5 text-primary" />
          <span>Notification Settings</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Email Alerts */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <div>
                  <Label className="text-sm font-medium">Email Alerts</Label>
                  <p className="text-xs text-muted-foreground">Receive email notifications for upcoming deadlines</p>
                </div>
              </div>
              <Switch
                checked={notifications.emailAlerts}
                onCheckedChange={(checked) => updateNotification("emailAlerts", checked)}
              />
            </div>
            {notifications.emailAlerts && (
              <div className="ml-7 flex items-center space-x-2">
                <Label className="text-xs text-muted-foreground">Send alerts</Label>
                <Select
                  value={notifications.emailDays}
                  onValueChange={(value) => updateNotification("emailDays", value)}
                >
                  <SelectTrigger className="w-20 h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="7">7</SelectItem>
                    <SelectItem value="14">14</SelectItem>
                  </SelectContent>
                </Select>
                <Label className="text-xs text-muted-foreground">days before due date</Label>
              </div>
            )}
          </div>

          {/* SMS Reminders */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
                <div>
                  <Label className="text-sm font-medium">SMS Reminders</Label>
                  <p className="text-xs text-muted-foreground">Receive SMS notifications for critical deadlines</p>
                </div>
              </div>
              <Switch
                checked={notifications.smsReminders}
                onCheckedChange={(checked) => updateNotification("smsReminders", checked)}
              />
            </div>
            {notifications.smsReminders && (
              <div className="ml-7 flex items-center space-x-2">
                <Label className="text-xs text-muted-foreground">Send reminders</Label>
                <Select value={notifications.smsDays} onValueChange={(value) => updateNotification("smsDays", value)}>
                  <SelectTrigger className="w-20 h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="7">7</SelectItem>
                  </SelectContent>
                </Select>
                <Label className="text-xs text-muted-foreground">days before due date</Label>
              </div>
            )}
          </div>

          {/* Additional Settings */}
          <div className="space-y-4 pt-4 border-t border-border">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium">Push Notifications</Label>
                <p className="text-xs text-muted-foreground">Browser notifications for urgent alerts</p>
              </div>
              <Switch
                checked={notifications.pushNotifications}
                onCheckedChange={(checked) => updateNotification("pushNotifications", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium">Weekly Digest</Label>
                <p className="text-xs text-muted-foreground">Summary of compliance status every Monday</p>
              </div>
              <Switch
                checked={notifications.weeklyDigest}
                onCheckedChange={(checked) => updateNotification("weeklyDigest", checked)}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
