import React from "react";

import { Button } from "../ui/Button";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider } from "../ui/Sidebar";
import { User, Settings, Lock, Bell, CreditCard, LayoutDashboard } from "lucide-react";

export function SettingsLayout() {
    const links = [
        {
            label: "General",
            href: "#",
            icon: <Settings className="h-5 w-5 flex-shrink-0" />,
        },
        {
            label: "Profile",
            href: "#",
            icon: <User className="h-5 w-5 flex-shrink-0" />,
        },
        {
            label: "Notifications",
            href: "#",
            icon: <Bell className="h-5 w-5 flex-shrink-0" />,
        },
        {
            label: "Security",
            href: "#",
            icon: <Lock className="h-5 w-5 flex-shrink-0" />,
        },
        {
            label: "Billing",
            href: "#",
            icon: <CreditCard className="h-5 w-5 flex-shrink-0" />,
        },
    ];

    const [activeLink, setActiveLink] = React.useState("General");

    return (
        <SidebarProvider className="h-full w-full">
            <div className="h-screen w-full bg-background flex overflow-hidden">
                <Sidebar collapsible="none" className="bg-muted/40">
                    <SidebarHeader>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton size="lg" asChild>
                                    <a href="#">
                                        <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                                            <LayoutDashboard className="size-4" />
                                        </div>
                                        <div className="grid flex-1 text-left text-sm leading-tight">
                                            <span className="truncate font-semibold">Nexus AI</span>
                                            <span className="truncate text-xs">Enterprise</span>
                                        </div>
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarHeader>
                    <SidebarContent>
                        <SidebarGroup>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    {links.map((link) => (
                                        <SidebarMenuItem key={link.label}>
                                            <SidebarMenuButton
                                                isActive={activeLink === link.label}
                                                onClick={() => setActiveLink(link.label)}
                                            >
                                                {link.icon}
                                                <span>{link.label}</span>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ))}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    </SidebarContent>
                </Sidebar>

                <main className="flex-1 p-8 overflow-y-auto">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-3xl font-bold mb-2 text-text-primary">{activeLink}</h1>
                        <p className="text-text-secondary mb-8">Manage your account settings and preferences.</p>

                        <div className="grid gap-6">
                            {/* Example Content Section */}
                            <div className="glass-card p-6 rounded-xl">
                                <h2 className="text-xl font-semibold mb-4 text-text-primary">Profile Information</h2>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-text-secondary">First Name</label>
                                            <input type="text" className="w-full bg-surface/50 border border-border rounded-md px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent/50" placeholder="Jane" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-text-secondary">Last Name</label>
                                            <input type="text" className="w-full bg-surface/50 border border-border rounded-md px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent/50" placeholder="Doe" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-text-secondary">Email</label>
                                        <input type="email" className="w-full bg-surface/50 border border-border rounded-md px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent/50" placeholder="jane@example.com" />
                                    </div>
                                    <div className="pt-4 flex justify-end">
                                        <Button>Save Changes</Button>
                                    </div>
                                </div>
                            </div>

                            <div className="glass-card p-6 rounded-xl">
                                <h2 className="text-xl font-semibold mb-4 text-text-primary">Preferences</h2>
                                <div className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                                    <div>
                                        <p className="font-medium text-text-primary">Email Notifications</p>
                                        <p className="text-sm text-text-secondary">Receive emails about your account activity.</p>
                                    </div>
                                    {/* Toggle would go here - using simple Checkbox for now as placeholder or need to import Switch */}
                                    <div className="h-6 w-10 rounded-full bg-surface border border-border relative cursor-pointer">
                                        <div className="absolute right-1 top-1 h-4 w-4 rounded-full bg-accent shadow-sm" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </SidebarProvider>
    );
}
