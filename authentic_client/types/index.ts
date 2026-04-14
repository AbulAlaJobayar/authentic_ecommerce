import { UserRole } from "@/constant/role";
import { LucideIcon } from "lucide-react";

export type userRole = keyof typeof UserRole;
export interface DrawerItem {
  title: string;
  path: string;
  parentPath?: string;
  icon?: LucideIcon;
  child?: DrawerItem[];
}
