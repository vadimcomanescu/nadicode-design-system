import {
  Folder,
  Home,
  LayoutDashboard,
  MoreHorizontal,
  Star,
  Trash2,
} from "lucide-react"
import { UsersIcon } from "../ui/icons/users"
import { SettingsIcon } from "../ui/icons/settings"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/DropdownMenu"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "../ui/Sidebar"

const data = {
  nav: [
    { name: "Home", icon: <Home className="h-4 w-4" />, isActive: true },
    { name: "Dashboard", icon: <LayoutDashboard className="h-4 w-4" /> },
    { name: "Team", icon: <UsersIcon size={16} /> },
    { name: "Settings", icon: <SettingsIcon size={16} /> },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
    },
    {
      name: "Sales & Marketing",
      url: "#",
    },
    {
      name: "Travel",
      url: "#",
    },
  ],
}

export function DirectoryBlock() {
  return (
    <div className="h-[500px] border border-border rounded-lg overflow-hidden flex bg-surface text-text-primary">
      <SidebarProvider className="h-full">
        <Sidebar collapsible="none" className="h-full border-r border-border">
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Platform</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {data.nav.map((item) => (
                    <SidebarMenuItem key={item.name}>
                      <SidebarMenuButton isActive={item.isActive}>
                        {item.icon}
                        <span>{item.name}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarGroup>
              <SidebarGroupLabel>Projects</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {data.projects.map((item) => (
                    <SidebarMenuItem key={item.name}>
                      <SidebarMenuButton asChild>
                        <a href={item.url}>
                          <Folder className="h-4 w-4" />
                          <span>{item.name}</span>
                        </a>
                      </SidebarMenuButton>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <SidebarMenuAction showOnHover>
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">More</span>
                          </SidebarMenuAction>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          className="w-48 rounded-lg"
                          side="bottom"
                          align="end"
                        >
                          <DropdownMenuItem>
                            <Folder className="h-4 w-4 text-muted-foreground" />
                            <span>View Project</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Star className="h-4 w-4 text-muted-foreground" />
                            <span>Add to Favorites</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Trash2 className="h-4 w-4 text-muted-foreground" />
                            <span>Delete Project</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
      </SidebarProvider>
      <div className="flex-1 p-8 bg-background">
        <div className="h-full border-2 border-dashed border-border rounded-lg flex items-center justify-center text-text-tertiary">
          Select a project to view details
        </div>
      </div>
    </div>
  )
}
