import { AppSidebar } from "@/components/chat/app-sidebar";
import { ModeToggle } from "@/components/theme/mode-toggle";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Home } from "lucide-react";
import Link from "next/link";

export default function DashboardLayout({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 fixed top-0 z-10">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Link href={"/"}>
              <Home className="size-4" />
            </Link>
          </div>
          <div className="ml-auto px-3 fixed right-0">
            <ModeToggle />
          </div>
        </header>
        <div className="flex flex-1 flex-col items-center overflow-hidden gap-4 p-4 py-24">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
