import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import SidebarPage from "./Sidebar";

const DashboardDrawer = ({ children }: { children: React.ReactNode }) => {
    return (

        <SidebarProvider>
            <SidebarPage />
            <SidebarInset>
                <header className="flex h-[65px] shrink-0 items-center gap-2 border-b px-4 bg-[#6777EF]">
                    <SidebarTrigger  className="-ml-1 text-white" />
                    {/* <Separator
                        orientation="vertical"
                        className="mr-2 data-[orientation=vertical]:h-4"
                    /> */}
                    {/* <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem className="hidden md:block">
                                <BreadcrumbLink href="#">Build Your Application</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator className="hidden md:block" />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb> */}
                </header>

                {children}

            </SidebarInset>
        </SidebarProvider>
    );
};

export default DashboardDrawer;
