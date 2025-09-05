"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { User, Edit, Save, X } from "lucide-react"

export function UserProfile() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: "Compliance Officer",
    email: "compliance@whitefence.com",
    role: "Compliance Officer",
    organization: "Demo Brokerage Firm",
    phone: "+91 98765 43210",
  })

  const [editedProfile, setEditedProfile] = useState(profile)

  const handleSave = () => {
    setProfile(editedProfile)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedProfile(profile)
    setIsEditing(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <User className="h-5 w-5 text-primary" />
            <span>User Profile</span>
          </div>
          {!isEditing ? (
            <Button size="sm" variant="outline" onClick={() => setIsEditing(true)}>
              <Edit className="h-4 w-4 mr-1" />
              Edit
            </Button>
          ) : (
            <div className="flex items-center space-x-2">
              <Button size="sm" variant="outline" onClick={handleCancel}>
                <X className="h-4 w-4 mr-1" />
                Cancel
              </Button>
              <Button size="sm" onClick={handleSave}>
                <Save className="h-4 w-4 mr-1" />
                Save
              </Button>
            </div>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Profile Picture Placeholder */}
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <User className="h-8 w-8 text-primary" />
            </div>
            <div>
              <p className="font-medium text-foreground">{profile.name}</p>
              <Badge variant="secondary" className="text-xs mt-1">
                {profile.role}
              </Badge>
            </div>
          </div>

          {/* Profile Fields */}
          <div className="space-y-3">
            <div className="space-y-1">
              <Label htmlFor="name" className="text-sm font-medium">
                Full Name
              </Label>
              {isEditing ? (
                <Input
                  id="name"
                  value={editedProfile.name}
                  onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
                />
              ) : (
                <p className="text-sm text-muted-foreground">{profile.name}</p>
              )}
            </div>

            <div className="space-y-1">
              <Label htmlFor="email" className="text-sm font-medium">
                Email Address
              </Label>
              {isEditing ? (
                <Input
                  id="email"
                  type="email"
                  value={editedProfile.email}
                  onChange={(e) => setEditedProfile({ ...editedProfile, email: e.target.value })}
                />
              ) : (
                <p className="text-sm text-muted-foreground">{profile.email}</p>
              )}
            </div>

            <div className="space-y-1">
              <Label htmlFor="organization" className="text-sm font-medium">
                Organization
              </Label>
              {isEditing ? (
                <Input
                  id="organization"
                  value={editedProfile.organization}
                  onChange={(e) => setEditedProfile({ ...editedProfile, organization: e.target.value })}
                />
              ) : (
                <p className="text-sm text-muted-foreground">{profile.organization}</p>
              )}
            </div>

            <div className="space-y-1">
              <Label htmlFor="phone" className="text-sm font-medium">
                Phone Number
              </Label>
              {isEditing ? (
                <Input
                  id="phone"
                  value={editedProfile.phone}
                  onChange={(e) => setEditedProfile({ ...editedProfile, phone: e.target.value })}
                />
              ) : (
                <p className="text-sm text-muted-foreground">{profile.phone}</p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
