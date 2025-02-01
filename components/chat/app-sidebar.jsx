"use client";

import React from "react";
import { AllChats } from "@/components/chat/all-chats";
import { NavUser } from "@/components/chat/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import CreateChat from "./create-chat";
import { Home } from "lucide-react";
import { NavButtons } from "./nav-buttons";

export function AppSidebar({ ...props }) {
  const data = [
    {
      title: "Home",
      url: "/chat",
      icon: Home,
      isActive: true,
    },
  ];
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <CreateChat />
        <NavButtons data={data} />
      </SidebarHeader>
      <SidebarContent>
        <AllChats />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
