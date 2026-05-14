"use client";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import SidebarPage from "./Sidebar";
import { Separator } from "@/components/ui/separator";
const DashboardDrawer = ({ children }: { children: React.ReactNode }) => {
    return (
        <SidebarProvider>
            <SidebarPage />
            <SidebarInset>
                <header className="flex h-16.25 shrink-0 items-center gap-2 border-b px-4 bg-[#6777EF]">
                    <SidebarTrigger className="-ml-1 text-white" />
                    <Separator
                        orientation="vertical"
                        className="mr-2 data-[orientation=vertical]:h-4"
                    />
                </header>

                {children}

            </SidebarInset>
        </SidebarProvider>
    );
};

export default DashboardDrawer;
