import { useState } from 'react'
import { Music, Video, Briefcase, Users, FolderOpen, Mail, Grid3X3 } from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'

const categories = [
  { title: 'All', icon: Grid3X3, value: 'All' },
  { title: 'Music', icon: Music, value: 'Music' },
  { title: 'Video', icon: Video, value: 'Video' },
  { title: 'Portfolio', icon: Briefcase, value: 'Portfolio' },
  { title: 'Social', icon: Users, value: 'Social' },
  { title: 'Projects', icon: FolderOpen, value: 'Projects' },
  { title: 'Contact', icon: Mail, value: 'Contact' },
]

interface AppSidebarProps {
  activeCategory: string
  onCategoryChange: (category: string) => void
}

export function AppSidebar({ activeCategory, onCategoryChange }: AppSidebarProps) {
  const { state } = useSidebar()
  const isCollapsed = state === 'collapsed'

  return (
    <Sidebar className="border-chrome-border bg-sidebar backdrop-blur-glass">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground font-medium px-3">
            {!isCollapsed && 'Categories'}
          </SidebarGroupLabel>
          
          <SidebarGroupContent>
            <SidebarMenu>
              {categories.map((category) => (
                <SidebarMenuItem key={category.value}>
                  <SidebarMenuButton
                    onClick={() => onCategoryChange(category.value)}
                    className={`transition-all ${
                      activeCategory === category.value
                        ? 'bg-sidebar-accent text-apple-blue font-medium shadow-sm'
                        : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                    }`}
                  >
                    <div className="flex items-center">
                      <category.icon className={`h-4 w-4 ${isCollapsed ? 'mx-auto' : 'mr-2'}`} />
                      {!isCollapsed && <span>{category.title}</span>}
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}