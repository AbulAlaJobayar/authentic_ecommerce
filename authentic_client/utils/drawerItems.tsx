import { UserRole } from "@/constant/role";
import { DrawerItem, userRole } from "@/types";
import { CircleGauge, Grid2x2Plus, PackagePlus, UserCog, Users, Warehouse } from "lucide-react";

export const drawerItems = (role: userRole): DrawerItem[] => {
  const roleMenu: DrawerItem[] = [];
  const commonRoutes: DrawerItem[] = [
    {
      title: "Dashboard",
      path: `/dashboard`,
      icon: CircleGauge,
    },
    // {
    //   title: "create Warehouse",
    //   path: "/dashboard/warehouse",
    // },
    // {
    //   title: "Transaction",
    //   path: "/dashboard/transaction",
    // },
    // {
    //   title: "Profile",
    //   path: "",
    // },
  ];

  switch (role) {
    case UserRole.SUPER_ADMIN:
      roleMenu.push(
      
        {
          title: "Warehouse",
          path: "/dashboard/warehouse",
          icon: Warehouse,
        },
        {
          title: "Categories",
          path: "/dashboard/categories",
          icon: Grid2x2Plus
        },
        {
          title: "Suppliers",
          path: "/dashboard/suppliers",
          icon: UserCog
        },
          {
          title: "Products",
          path: `/dashboard/add-product`,
          icon: PackagePlus
        },
          {
          title: "Employees",
          path: `/dashboard/employees`,
          icon: Users
        },
      );
      break;
    case UserRole.MANAGER:
      roleMenu.push({
        title: "Add Product",
        path: `/dashboard/${role}/add-product`,
      });
      break;
    case UserRole.STAFF:
      roleMenu.push({
        title: "Add Product",
        path: `/dashboard/${role}/add-product`,
      });
      break;
  }
  return [...commonRoutes, ...roleMenu];
};
