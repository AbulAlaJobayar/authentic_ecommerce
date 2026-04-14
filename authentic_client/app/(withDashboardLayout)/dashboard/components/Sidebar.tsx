"use client";

import { Sidebar, SidebarContent, SidebarGroup, SidebarHeader, SidebarMenu, SidebarMenuItem} from "@/components/ui/sidebar";
import { userRole } from "@/types";
import { drawerItems } from "@/utils/drawerItems";
import Link from "next/link";
import { useState } from "react";
import SideBarItems from "./SideBarItems";

const SidebarPage = () => {
  // TODO: add user role and render sidebar item based on user role
  const [userRole, setUserRole] = useState<userRole | null>("SUPER_ADMIN");
  // const 
  // useEffect(() => {
  //   const { role } = getUserInfo() as { role: userRole };
  //   setUserRole(role);
  // }, []);

  return (
    <Sidebar >
      <SidebarHeader className="bg-[#4C60DA]" >
        {/* logo*/}
        <SidebarMenu>
          <SidebarMenuItem >
            <Link
              href="/"
              className="flex flex-col gap-0.5 py-3 my-0.5  items-center justify-center  font-semibold  "
            >
              <span className=" text-white text-lg hover:scale-110 transition-transform duration-200">
                Authentic Surgical
              </span>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      {/* sidebar Item */}
      <SidebarContent >
        <SidebarGroup>
          <SidebarMenu>
            {
              drawerItems(userRole as userRole).map((item,index)=>(
                <SideBarItems key={index} item={item} />
              ))
            }
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      {/* <SidebarRail /> */}
    </Sidebar>
  );
};

export default SidebarPage;