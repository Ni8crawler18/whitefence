import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Users, Plus, Mail } from "lucide-react"

const teamMembers = [
  {
    name: "Compliance Officer",
    email: "compliance@whitefence.com",
    role: "Compliance Officer",
    status: "Active",
    statusColor: "default" as const,
    isCurrentUser: true,
    initials: "CO",
  },
  {
    name: "Demo User",
    email: "auditor@whitefence.com",
    role: "Auditor",
    status: "Active",
    statusColor: "default" as const,
    isCurrentUser: false,
    initials: "DU",
  },
]

export function TeamMembers() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-primary" />
            <span>Team Members</span>
          </div>
          <Button size="sm" variant="outline">
            <Plus className="h-4 w-4 mr-1" />
            Add Member
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {teamMembers.map((member, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div className="flex items-center space-x-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-primary/10 text-primary font-medium">{member.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center space-x-2">
                    <p className="font-medium text-foreground text-sm">{member.name}</p>
                    {member.isCurrentUser && (
                      <Badge variant="secondary" className="text-xs">
                        You
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{member.role}</p>
                  <div className="flex items-center space-x-3 mt-1">
                    <div className="flex items-center space-x-1">
                      <Mail className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{member.email}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant={member.statusColor} className="text-xs">
                  {member.status}
                </Badge>
                {!member.isCurrentUser && (
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                    <Mail className="h-3 w-3" />
                  </Button>
                )}
              </div>
            </div>
          ))}

          {/* Team Stats */}
          <div className="pt-4 border-t border-border">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-lg font-bold text-foreground">{teamMembers.length}</p>
                <p className="text-xs text-muted-foreground">Total Members</p>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-lg font-bold text-foreground">
                  {teamMembers.filter((m) => m.status === "Active").length}
                </p>
                <p className="text-xs text-muted-foreground">Active Users</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
