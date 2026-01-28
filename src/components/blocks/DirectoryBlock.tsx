import {
  Folder,
  Home,
  LayoutDashboard,
  MoreHorizontal,
  Settings,
  Star,
  Trash2,
  Users,
} from "lucide-react"

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
    { name: "Home", icon: Home, isActive: true },
    { name: "Dashboard", icon: LayoutDashboard },
    { name: "Team", icon: Users },
    { name: "Settings", icon: Settings },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Folder,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: Folder,
    },
    {
      name: "Travel",
      url: "#",
      icon: Folder,
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
                        <item.icon />
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
                          <item.icon />
                          <span>{item.name}</span>
                        </a>
                      </SidebarMenuButton>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <SidebarMenuAction showOnHover>
                            <MoreHorizontal />
                            <span className="sr-only">More</span>
                          </SidebarMenuAction>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          className="w-48 rounded-lg"
                          side="bottom"
                          align="end"
                        >
                          <DropdownMenuItem>
                            <Folder className="text-muted-foreground" />
                            <span>View Project</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Star className="text-muted-foreground" />
                            <span>Add to Favorites</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Trash2 className="text-muted-foreground" />
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
