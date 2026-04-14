"use client";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import SidebarPage from "./Sidebar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { usePathname } from "next/navigation";


const DashboardDrawer = ({ children }: { children: React.ReactNode }) => {
    const pathName = usePathname();
    const parts = pathName.split("/").filter(Boolean);

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
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem className="hidden md:block">
                                <BreadcrumbLink href="/dashboard" className="capitalize text-white hover:text-cyan-50">{parts[0] ? parts[0] : ""}</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator className="hidden md:block text-white" />
                            <BreadcrumbItem>
                                <BreadcrumbPage className="text-white capitalize">{parts[1] ? parts[1] : ""}</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </header>

                {children}

            </SidebarInset>
        </SidebarProvider>
    );
};

export default DashboardDrawer;
