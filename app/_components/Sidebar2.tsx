import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import { AppSidebar } from "./app-sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <SidebarProvider className="h-screen border-r-2 border-[#E4E4E7] ">
        <AppSidebar />

        <SidebarTrigger />
        <main>{children}</main>
      </SidebarProvider>
    </div>
  );
}
