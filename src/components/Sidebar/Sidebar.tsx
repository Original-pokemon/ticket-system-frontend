"use client"

import * as React from "react"
import { NavLink } from 'react-router-dom'
import {
  Home,
  Folder,
  Users,
  Fuel,
  Command,
} from "lucide-react"

import { NavMain } from "@/components/Sidebar/NavMain"
import {
  Sidebar as SidebarUI,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { AppRoute } from "@/const"
import Logo from "../logo/Logo"
import { NavUser } from "./NavUser"

const data = {
  user: {
    name: "User",
    email: "user@example.com",
    avatar: "/avatars/user.jpg",
  },
  navMain: [
    {
      title: "Задачи",
      url: AppRoute.Tickets,
      icon: Home,
      items: [],
    },
    {
      title: "Категории",
      url: AppRoute.TaskPerformers,
      icon: Folder,
      items: [],
    },
    {
      title: "Менеджеры",
      url: AppRoute.Managers,
      icon: Users,
      items: [],
    },
    {
      title: "Станции АЗС",
      url: AppRoute.PetrolStations,
      icon: Fuel,
      items: [],
    },
  ],
}

export default function Sidebar({ ...props }: React.ComponentProps<typeof SidebarUI>) {
  return (
    <SidebarUI collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton 
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
              >
              <Logo/>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </SidebarUI>
  )
}
