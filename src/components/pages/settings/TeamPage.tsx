import { MoreHorizontal, Search, Trash2, Shield } from "lucide-react"
import { AnimatedIcon } from "../../ui/AnimatedIcon"
import { Badge } from "../../ui/Badge"
import { Button } from "../../ui/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/Card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../../ui/DropdownMenu"
import { Input } from "../../ui/Input"
import { Separator } from "../../ui/Separator"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../ui/Table"
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/Avatar"
import { RoleBadge } from "../../ui/RoleBadge"
import { InviteUserModal } from "../../blocks/user/InviteUserModal"

const initialMembers = [
    {
        id: "1",
        name: "Vadim",
        email: "vadim@example.com",
        role: "owner",
        status: "active",
        joined: "Oct 2023",
    },
    {
        id: "2",
        name: "Sarah Chen",
        email: "sarah@example.com",
        role: "admin",
        status: "active",
        joined: "Nov 2023",
    },
    {
        id: "3",
        name: "Alex Design",
        email: "alex@example.com",
        role: "member",
        status: "active",
        joined: "Dec 2023",
    },
    {
        id: "4",
        name: "Guest User",
        email: "guest@partner.com",
        role: "guest",
        status: "invited",
        joined: "-",
    },
] as const

export function TeamPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-medium">Team Members</h3>
                    <p className="text-sm text-text-secondary">
                        Manage your team, permissions, and billing seats.
                    </p>
                </div>
                <InviteUserModal />
            </div>
            <Separator />

            <Card >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                    <div className="space-y-1">
                        <CardTitle>4 Active Members</CardTitle>
                        <CardDescription>
                            You have 6 seats remaining on your plan.
                        </CardDescription>
                    </div>
                    <div className="relative w-64">
                        <AnimatedIcon icon={Search} className="absolute left-2 top-2.5 h-4 w-4 text-text-tertiary" />
                        <Input placeholder="Search members..." className="pl-8" />
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>User</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="hidden md:table-cell">Joined</TableHead>
                                <TableHead className="w-[50px]"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {initialMembers.map((member) => (
                                <TableRow key={member.id} className="group">
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-9 w-9 border border-white/10">
                                                <AvatarImage src={`https://api.dicebear.com/7.x/notionists/svg?seed=${member.name}`} />
                                                <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex flex-col">
                                                <span className="font-medium">{member.name}</span>
                                                <span className="text-xs text-text-secondary">{member.email}</span>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <RoleBadge role={member.role} />
                                    </TableCell>
                                    <TableCell>
                                        {member.status === "active" ? (
                                            <Badge variant="outline" className="border-emerald-500/20 text-emerald-500 bg-emerald-500/10">
                                                Active
                                            </Badge>
                                        ) : (
                                            <Badge variant="outline" className="border-amber-500/20 text-amber-500 bg-amber-500/10">
                                                Invited
                                            </Badge>
                                        )}
                                    </TableCell>
                                    <TableCell className="hidden text-text-secondary md:table-cell">
                                        {member.joined}
                                    </TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100">
                                                    <AnimatedIcon icon={MoreHorizontal} className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="glass-panel">
                                                <DropdownMenuItem>
                                                    <AnimatedIcon icon={Shield} className="mr-2 h-4 w-4" /> Change Role
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="text-destructive focus:text-destructive">
                                                    <AnimatedIcon icon={Trash2} className="mr-2 h-4 w-4" /> Remove User
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
