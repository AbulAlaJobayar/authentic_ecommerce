"use client";
import SearchProduct from "./SearchProduct";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ChevronRight,
  Search,
  ShoppingBag,
  TextAlignJustify,
  X,
} from "lucide-react";
import Container from "@/components/shared/Container";
import { Badge } from "@/components/ui/badge";
import SubNavbar from "./SubNavbar";
import * as motion from "motion/react-client";

import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import Link from "next/link";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { FaUser, FaCartArrowDown } from "react-icons/fa";
import { FaLocationArrow, FaBarsStaggered } from "react-icons/fa6";
import { GiSelfLove } from "react-icons/gi";
import { IoHomeOutline } from "react-icons/io5";
const items = [
  {
    name: "Track Order",
    link: "/trackOrder",
    icon: <FaLocationArrow />
  },
  {
    name: "Wishlist",
    link: "/wishlist",
    icon: <GiSelfLove />
  },
  {
    name: "Cart",
    link: "/cart",
    icon: <FaCartArrowDown />
  },
];

const Navbar = () => {
  const [openItem, setOpenItem] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleToggle = (name: string) => {
    setOpenItem((prev) => (prev === name ? null : name));
  };
  const user = false;
  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="sticky top-0 left-0 w-full z-50 bg-white  hidden md:block"
      >
        <div className="border-b py-1">
          <Container>
            <div className=" flex items-center py-3  justify-between">
              {/* website logo */}
              <Link href={"/"} className=" ">Authentic Surgical</Link>
              {/* product search */}
              <div className="w-1/3">
                <SearchProduct />
              </div>
              {/* user actions: cart, profile, etc. */}
              {/* <div className="flex items-center gap-6"> */}
              <div className="flex justify-end gap-4 ">
                {
                  items?.map((item) => (
                    <Link key={item.name} id={item.name} href={item.link} className="flex flex-col items-center gap-1 font-medium">
                      {item.icon}
                      <p className="text-sm whitespace-nowrap">{item.name}</p>
                    </Link>
                  ))
                }

                {user ? (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Avatar className="text-center">
                        <FaUser />
                        {/* <AvatarFallback>CN</AvatarFallback> */}
                      </Avatar>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Add to library</p>
                    </TooltipContent>
                  </Tooltip>
                ) : (
                  <>

                    <Link href={"/signin"} className="flex flex-col items-center gap-1 font-medium">
                      <FaUser />
                      <p className="text-sm whitespace-nowrap">Sign In</p>
                    </Link>

                  </>
                )}
              </div>

              {/* <div className="relative">
                <Badge
                  className="absolute bottom-4 left-4 h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
                  variant="destructive"
                >
                  99
                </Badge>
                <ShoppingBag />
              </div> */}
              {/* </div> */}
            </div>
          </Container>
        </div>
      </motion.nav>


      {/* small Screen */}
      <nav className=" md:hidden bg-white shadow-md  w-full z-50">
        <div className="border-b py-1">
          <Container>
            <div className="flex items-center justify-between py-4">
              <div>
                <Drawer direction="left" open={drawerOpen} onOpenChange={setDrawerOpen}>
                  <DrawerTrigger asChild>
                    <FaBarsStaggered />
                  </DrawerTrigger>
                  {/* Drawer Content Goes Here */}
                  <DrawerContent >
                    <DrawerHeader>
                      <div className="flex items-center justify-between">
                        <DrawerTitle className="text-black">
                          Authentic Surgical
                        </DrawerTitle>
                        <DrawerClose>
                          <X className="cursor-pointer" />
                        </DrawerClose>
                      </div>
                    </DrawerHeader>
                    <Separator />
                    <DrawerDescription>
                      {/* Drawer navigation items */}

                    </DrawerDescription>
                  </DrawerContent>
                </Drawer>
              </div>
              {/* Searching */}
              {/* <Search onClick={() => setIsSearchOpen(!isSearchOpen)} /> */}
              <p className=" font-semibold  text-md">Authentic Surgical</p>
              {/* <div className="flex items-center gap-3">
                {user ? (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Add to library</p>
                    </TooltipContent>
                  </Tooltip>
                ) : (
                  <>
                    <Avatar className="hidden md:block">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div>
                      <p>Sign In</p>
                    </div>
                  </>
                )}
              </div> */}
              <div className="relative">
                {/* <Badge
                  className="absolute bottom-4 left-4 h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
                  variant="destructive"
                >
                  99
                </Badge> */}
                <FaCartArrowDown />
              </div>
            </div>
          </Container>
          {isSearchOpen && <SearchProduct />}
        </div>


        {/* bottom nav */}

        <div className="fixed bottom-0 left-0 w-full  bg-[#F48721] z-50 flex items-center justify-center text-white">
          <div className="flex flex-col items-center">
            <IoHomeOutline />
            <p className="font-bold text-[10px]">HOME</p>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
