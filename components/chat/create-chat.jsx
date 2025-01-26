"use client";

import * as React from "react";
import { Plus } from "lucide-react";
import {
  SidebarMenu,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";

export function CreateChat() {
  const { open } = useSidebar();
  return (
    <SidebarMenu>
      <SidebarMenuItem className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
        <Link href="/chat">
          <div className="flex aspect-square size-8 w-full items-center justify-center rounded-lg bg-blue-700 hover:bg-blue-600 gap-2 text-sm text-white">
            <Plus className="size-4" />
            {open ? "New Chat" : ""}
          </div>
        </Link>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
