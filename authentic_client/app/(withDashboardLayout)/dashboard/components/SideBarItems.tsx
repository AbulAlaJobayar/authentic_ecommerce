"use client";

import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

import { DrawerItem } from "@/types";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  ChevronRight,
} from "lucide-react";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import { useEffect, useState } from "react";

const SideBarItems = ({
  item,
}: {
  item: DrawerItem;
}) => {
  const pathname = usePathname();

  const hasChildren = !!item.child?.length;

  const isParentActive =
    pathname === item.path ||
    item.child?.some((sub) =>
      pathname.startsWith(sub.path)
    );

  const [open, setOpen] = useState(isParentActive);

  useEffect(() => {
    if (isParentActive) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setOpen(true);
    }
  }, [isParentActive]);

  return (
    <SidebarMenuItem className="w-full">

      {/* ================================================= */}
      {/* PARENT MENU */}
      {/* ================================================= */}

      <motion.div
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        transition={{
          duration: 0.2,
        }}
        className={`
          relative overflow-hidden rounded-xl
          transition-all duration-300
          
          ${
            isParentActive
              ? "bg-linear-to-r from-[#6777EF] to-[#4C60DA] text-white shadow-md"
              : "text-gray-700 hover:bg-gray-100"
          }
        `}
      >
        {/* Glow Effect */}

        {isParentActive && (
          <motion.div
            layoutId="activeSidebarGlow"
            className="absolute inset-0 bg-white/10"
            transition={{
              type: "spring",
              stiffness: 250,
              damping: 25,
            }}
          />
        )}

        <div className="relative flex items-center justify-between">

          {/* MENU LINK */}

          <SidebarMenuButton asChild>
            <Link
              href={item.path}
              className="flex w-full items-center gap-3 px-4 py-3 hover:text-white"
            >
              {item.icon && (
                <motion.div
                  animate={{
                    rotate: isParentActive
                      ? 0
                      : 0,
                    scale: isParentActive
                      ? 1.1
                      : 1,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                >
                  <item.icon className="h-5 w-5 shrink-0" />
                </motion.div>
              )}

              <span className="flex-1 text-sm font-medium">
                {item.title}
              </span>
            </Link>
          </SidebarMenuButton>

          {/* CHEVRON BUTTON */}

          {hasChildren && (
            <motion.button
              type="button"
              onClick={() => setOpen(!open)}
              whileTap={{ scale: 0.9 }}
              className={`
                mr-2 flex h-8 w-8 items-center justify-center rounded-lg
                transition-colors duration-300
                
                ${
                  isParentActive
                    ? "hover:bg-white/10"
                    : "hover:bg-gray-200"
                }
              `}
            >
              <motion.div
                animate={{
                  rotate: open ? 90 : 0,
                }}
                transition={{
                  duration: 0.25,
                }}
              >
                <ChevronRight className="h-4 w-4" />
              </motion.div>
            </motion.button>
          )}
        </div>
      </motion.div>

      {/* ================================================= */}
      {/* SUB MENU */}
      {/* ================================================= */}

      <AnimatePresence initial={false}>
        {hasChildren && open && (
          <motion.div
            initial={{
              height: 0,
              opacity: 0,
            }}
            animate={{
              height: "auto",
              opacity: 1,
            }}
            exit={{
              height: 0,
              opacity: 0,
            }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
            className="overflow-hidden"
          >
            <SidebarMenuSub className="relative mt-2 ml-4 space-y-1 border-l  pl-4">

              {item.child?.map(
                (subItem, index) => {
                  const isSubActive =
                    pathname ===
                      subItem.path ||
                    pathname.startsWith(
                      subItem.path
                    );

                  return (
                    <motion.div
                      key={subItem.path}
                      initial={{
                        opacity: 0,
                        x: -10,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      exit={{
                        opacity: 0,
                        x: -10,
                      }}
                      transition={{
                        delay: index * 0.05,
                        duration: 0.2,
                      }}
                    >
                      <SidebarMenuSubItem>

                        <SidebarMenuSubButton asChild>

                          <motion.div className=" hover:text-white"
                            whileHover={{
                              x: 4,
                            }}
                            whileTap={{
                              scale: 0.98,
                            }}
                          >
                            <Link
                              href={
                                subItem.path
                              }
                              className={`
                                group relative flex items-center gap-3 overflow-hidden rounded-lg px-3 py-2.5 text-sm transition-all duration-300
                                hover:text-white
                                
                                ${
                                  isSubActive
                                    ? "bg-[#6777EF]/10 font-semibold text-[#4C60DA] "
                                    : "text-white bg-[#6777EF] rounded-3xl hover:text-white"
                                }
                              `}
                            >
                              {/* Active Indicator */}

                              {isSubActive && (
                                <motion.div
                                  layoutId="subActiveIndicator"
                                  className="absolute left-0 top-0 h-full w-1 rounded-r-full bg-[#6777EF]"
                                  transition={{
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 30,
                                  }}
                                />
                              )}

                              {/* Icon */}

                              {subItem.icon && (
                                <motion.div
                                  whileHover={{
                                    rotate: 8,
                                  }}
                                >
                                  <subItem.icon className="h-4 w-4 shrink-0" />
                                </motion.div>
                              )}

                              {/* Title */}

                              <span className="relative z-10 hover:text-white">
                                {subItem.title}
                              </span>

                              {/* Hover Glow */}

                              <motion.div
                                className="absolute inset-0 bg-linear-to-r from-[#6777EF]/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                              />
                            </Link>
                          </motion.div>

                        </SidebarMenuSubButton>

                      </SidebarMenuSubItem>
                    </motion.div>
                  );
                }
              )}
            </SidebarMenuSub>
          </motion.div>
        )}
      </AnimatePresence>
    </SidebarMenuItem>
  );
};

export default SideBarItems;