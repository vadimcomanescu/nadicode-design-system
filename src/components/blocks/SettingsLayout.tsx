import React from "react";

import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider } from "../ui/Sidebar";
import { User, Settings, Lock, Bell, CreditCard, LayoutDashboard, Users } from "lucide-react";
import { ProfilePage } from "../pages/settings/ProfilePage";
import { TeamPage } from "../pages/settings/TeamPage";
import { Badge } from "../ui/Badge";

export function SettingsLayout() {
    const links = [
        {
            label: "General",
            icon: <Settings className="h-4 w-4" />,
        },
        {
            label: "Profile",
            icon: <User className="h-4 w-4" />,
        },
        {
            label: "Team",
            icon: <Users className="h-4 w-4" />,
            badge: "New"
        },
        {
            label: "Notifications",
            icon: <Bell className="h-4 w-4" />,
        },
        {
            label: "Security",
            icon: <Lock className="h-4 w-4" />,
        },
        {
            label: "Billing",
            icon: <CreditCard className="h-4 w-4" />,
        },
    ];

    const [activeLink, setActiveLink] = React.useState("Profile");

    return (
        <SidebarProvider className="h-[800px] w-full border border-border rounded-xl overflow-hidden shadow-2xl">
            <div className="h-full w-full bg-background flex">
                <Sidebar collapsible="none" className="w-64 border-r border-border bg-muted/20">
                    <SidebarHeader className="p-4">
                        <div className="flex items-center gap-3 px-2">
                            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-glow">
                                <LayoutDashboard className="size-4" />
                            </div>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold">Nadicode</span>
                                <span className="truncate text-xs text-text-secondary">Enterprise</span>
                            </div>
                        </div>
                    </SidebarHeader>
                    <SidebarContent className="px-2">
                        <SidebarGroup>
                            <SidebarGroupContent>
                                <SidebarMenu className="space-y-1">
                                    {links.map((link) => (
                                        <SidebarMenuItem key={link.label}>
                                            <SidebarMenuButton
                                                isActive={activeLink === link.label}
                                                onClick={() => setActiveLink(link.label)}
                                                className="justify-between"
                                            >
                                                <div className="flex items-center gap-2">
                                                    {link.icon}
                                                    <span>{link.label}</span>
                                                </div>
                                                {link.badge && (
                                                    <Badge variant="accent" className="h-5 px-1.5 text-[10px]">
                                                        {link.badge}
                                                    </Badge>
                                                )}
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ))}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    </SidebarContent>
                </Sidebar>

                <main className="flex-1 overflow-y-auto bg-background/50">
                    <div className="max-w-4xl mx-auto p-8">
                        {activeLink === "Profile" && <ProfilePage />}
                        {activeLink === "Team" && <TeamPage />}

                        {!["Profile", "Team"].includes(activeLink) && (
                            <div className="flex h-[400px] items-center justify-center rounded-lg border border-dashed border-border">
                                <div className="text-center space-y-2">
                                    <p className="text-lg font-medium text-text-primary">{activeLink} Settings</p>
                                    <p className="text-sm text-text-secondary">This section is under construction.</p>
                                </div>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </SidebarProvider>
    );
}

