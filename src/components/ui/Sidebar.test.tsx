import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

vi.mock('@/hooks/use-mobile', () => ({
  useIsMobile: () => false,
}))

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from './Sidebar'

describe('Sidebar', () => {
  it('renders SidebarProvider without crashing', () => {
    const { container } = render(
      <SidebarProvider>
        <div>App content</div>
      </SidebarProvider>
    )
    expect(container).toBeTruthy()
  })

  it('renders Sidebar with header and content', () => {
    render(
      <SidebarProvider>
        <Sidebar>
          <SidebarHeader>
            <span>Logo</span>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton>Home</SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <span>Footer</span>
          </SidebarFooter>
        </Sidebar>
      </SidebarProvider>
    )
    expect(screen.getByText('Logo')).toBeInTheDocument()
    expect(screen.getByText('Navigation')).toBeInTheDocument()
    expect(screen.getByText('Home')).toBeInTheDocument()
  })
})
