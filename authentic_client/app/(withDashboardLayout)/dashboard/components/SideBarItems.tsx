import { SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem } from "@/components/ui/sidebar";
import { DrawerItem } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SideBarItems = ({ item }: { item: DrawerItem }) => {
  const linkPath = `${item.path}`;
  const pathName = usePathname();
  const isActive = pathName === linkPath; // Ensures matching for nested routes

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        <Link
          href={item.path}
          className={`flex items-center gap-2 font-medium transition-all duration-300 ${isActive ? "border-r-4 border-[#4C60DA] rounded bg-[#6777EF]  text-white" : "text-gray-700 hover:text-white"
            }`}
        >
          {item.icon && <item.icon className="w-5 h-5" />} {/* Render icon */}
          {item.title}
        </Link>
      </SidebarMenuButton>

      {item.child?.length ? (
        <SidebarMenuSub>
          {item.child.map((subItem) => (
            <SidebarMenuSubItem key={subItem.path}>
              <SidebarMenuSubButton asChild>
                <Link
                  href={subItem.path}
                  className={`flex items-center gap-2 transition-all duration-300 ${pathName.startsWith(subItem.path) ? "text-blue-500 font-semibold" : "text-gray-600"
                    }`}
                >
                  {subItem.icon && <subItem.icon className="w-4 h-4" />}
                  {subItem.title}
                </Link>
              </SidebarMenuSubButton>
            </SidebarMenuSubItem>
          ))}
        </SidebarMenuSub>
      ) : null}
    </SidebarMenuItem>
  );
};

export default SideBarItems;