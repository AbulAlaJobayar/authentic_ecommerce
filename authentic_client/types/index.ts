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
export type TATSDataProps = {
  id: string;
  image?: string;
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  role?: string;
  accountStatus?: string;
  status?: string;
  description?: string;
  sealing?: string;
  category?: string;
  isDelete?: boolean;
  review?: string;
  price?: number;
  action?: string;
};

export type TATSHeadProps<T> = {
  key: keyof T;
  label: string;
};
