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
import { useScrollDetection } from "@/app/hooks/useScrollDetection";
import * as motion from "motion/react-client";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import Link from "next/link";

const items = [
  {
    name: "Home",
    link: "#",
    subItems: [
      { name: "SubHome1", link: "#" },
      { name: "SubHome2", link: "#" },
    ],
  },
  {
    name: "About",
    link: "#",
  },
  {
    name: "Services",
    link: "#",
    subItems: [
      { name: "Web Development", link: "#" },
      { name: "App Development", link: "#" },
    ],
  },
];

const Navbar = () => {
  const isScrolled = useScrollDetection(0.1);
  const [openItem, setOpenItem] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleToggle = (name: string) => {
    setOpenItem((prev) => (prev === name ? null : name));
  };
  const user = true;
  return (
    <>

      {isScrolled ? (
        <>
          <motion.nav
            initial={{ y: -80 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="sticky top-0 left-0 w-full z-50 bg-white shadow-md hidden md:block"
          >
            <div className="border-b py-1">
              <Container>
                <div className=" flex items-center py-3  justify-between">
                  {/* website logo */}
                  <div className=" ">Authentic Surgical</div>
                  {/* product search */}
                  <div className=" max-w-3/5 w-full">
                    <SubNavbar />
                  </div>
                  {/* user actions: cart, profile, etc. */}
                  {/* <div className="flex items-center gap-6"> */}
                  <div className="flex items-center gap-3">
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
                          <p className="hidden md:block">Your Account</p>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="relative">
                    <Badge
                      className="absolute bottom-4 left-4 h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
                      variant="destructive"
                    >
                      99
                    </Badge>
                    <ShoppingBag />
                  </div>
                  {/* </div> */}
                </div>
              </Container>
            </div>
          </motion.nav>
        </>
      ) : (<>
        <motion.nav
          initial={{ y: 0 }}
          animate={{ y: isScrolled ? -80 : 0, opacity: isScrolled ? 0 : 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="sticky top-0 left-0 w-full z-50 bg-white shadow-md hidden md:block"
        >
          <div className="border-b py-1">
            <Container>
              <div className=" flex items-center py-3  justify-between">
                {/* website logo */}
                <div className=" ">Authentic Surgical</div>
                {/* product search */}
                <div className=" max-w-3/5 w-full">
                  <SearchProduct />
                </div>
                {/* user actions: cart, profile, etc. */}

                <div className="flex items-center gap-3">
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
                        <p className="hidden md:block">Your Account</p>
                      </div>
                    </>
                  )}
                </div>

                <div className="relative">
                  <Badge
                    className="absolute bottom-4 left-4 h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
                    variant="destructive"
                  >
                    99
                  </Badge>
                  <ShoppingBag />
                </div>
                {/* </div> */}
              </div>
            </Container>
          </div>
          <div className="py-1">
            <Container>
              <SubNavbar />
            </Container>
          </div>
        </motion.nav>

      </>)}
      {/* small Screen */}
      <nav className="sticky md:hidden bg-white shadow-md  top-0 left-0 w-full z-50">
        <div className="border-b py-1">
          <Container>
            <div className="flex items-center justify-between py-4">
              <div>
                <Drawer direction="left">
                  <DrawerTrigger asChild>
                    <TextAlignJustify className="cursor-pointer" />
                  </DrawerTrigger>
                  {/* Drawer Content Goes Here */}
                  <DrawerContent>
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
                      <div className="p-4">
                        <ul>
                          {items.map((item) => (
                            <li key={item.name} className="text-black py-2">
                              <div className="flex justify-between items-center mx-2">
                                <Link href={item.link} className="font-medium">
                                  {item.name}
                                </Link>

                                {item.subItems && (
                                  <motion.button
                                    onClick={() => handleToggle(item.name)}
                                    className="border border-gray-400 p-1 rounded"
                                  >
                                    <motion.div
                                      animate={{
                                        rotate: openItem === item.name ? 90 : 0,
                                      }}
                                      transition={{
                                        duration: 0.3,
                                        ease: "easeInOut",
                                      }}
                                    >
                                      <ChevronRight size={20} />
                                    </motion.div>
                                  </motion.button>
                                )}
                              </div>

                              {/* Submenu */}
                              {item.subItems && openItem === item.name && (
                                <motion.ul
                                  initial={{ opacity: 0, y: -20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ duration: 0.5 }}
                                  className="ml-6 mt-2 space-y-1 bg-accent "
                                >
                                  {item.subItems.map((subItem) => (
                                    <li key={subItem.name}>
                                      <Link
                                        href={subItem.link}
                                        className="text-sm text-black 

                                        hover:bg-blue-100 block px-2 py-1 rounded "
                                      >
                                        {subItem.name}
                                      </Link>
                                      <Separator />
                                    </li>
                                  ))}
                                </motion.ul>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </DrawerDescription>
                  </DrawerContent>
                </Drawer>
              </div>
              {/* Searching */}
              <Search onClick={() => setIsSearchOpen(!isSearchOpen)} />
              <p className=" font-semibold  text-md">Authentic Surgical</p>
              <div className="flex items-center gap-3">
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
              </div>
              <div className="relative">
                <Badge
                  className="absolute bottom-4 left-4 h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
                  variant="destructive"
                >
                  99
                </Badge>
                <ShoppingBag />
              </div>
            </div>
          </Container>
          {isSearchOpen && <SearchProduct />}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
