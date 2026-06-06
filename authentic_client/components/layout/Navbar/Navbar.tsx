/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import SearchProduct from "./SearchProduct";
import { Avatar } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import Container from "@/components/shared/Container";
import * as motion from "motion/react-client";
import { useState } from "react";
import Link from "next/link";
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { FaUser, FaCartArrowDown } from "react-icons/fa";
import { FaLocationArrow, FaBarsStaggered } from "react-icons/fa6";
import { GiSelfLove } from "react-icons/gi";
import { IoClose, IoHomeOutline, IoSearchOutline, IoCartOutline, IoPersonOutline } from "react-icons/io5";
import { CiGrid41 } from "react-icons/ci";
import { X } from "lucide-react";
import { AnimatePresence } from "motion/react";
import { IoIosArrowForward } from "react-icons/io";
import Cart from "@/components/shared/Cart/Cart";

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


const navItems = [
  { id: 1, label: "Home", icon: IoHomeOutline, href: "/" },
  { id: 2, label: "Menu", icon: CiGrid41, action: "menu" },
  { id: 3, label: "Search", icon: IoSearchOutline, search: "search" },
  { id: 4, label: "Cart", icon: IoCartOutline, cart: "cart" },
  { id: 5, label: "Account", icon: IoPersonOutline, href: "/account" },
];

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const handleLogout = () => {

  }
  const cartItems: any[] = [];
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
              <div className="flex justify-end gap-4 ">
                {
                  items?.map((item) => {
                    if (item.name === "Cart") {
                      return (
                        <button onClick={() => setCartOpen(true)} key={item.name} id={item.name} className="flex flex-col items-center gap-1 font-medium">
                          {item.icon}
                          <p className="text-sm whitespace-nowrap">{item.name}</p>
                        </button>
                      )
                    }

                    return (
                      (
                        <Link key={item.name} id={item.name} href={item.link} className="flex flex-col items-center gap-1 font-medium">
                          {item.icon}
                          <p className="text-sm whitespace-nowrap">{item.name}</p>
                        </Link>
                      )
                    )
                  })
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

              {/* menue Drawer */}
              <div>
                <Drawer direction="left" open={drawerOpen} onOpenChange={setDrawerOpen}>
                  <DrawerTrigger asChild>
                    <FaBarsStaggered className="cursor-pointer text-lg" />
                  </DrawerTrigger>

                  <DrawerContent className="h-screen w-70 rounded-none ml-0 left-0">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b">
                      <h2 className="font-semibold text-lg">Menu</h2>

                      <DrawerClose asChild>
                        <button>
                          <X className="w-5 h-5" />
                        </button>
                      </DrawerClose>
                    </div>

                    {/* User Card */}
                    <div className="p-4">
                      <div className="bg-[#F48721] rounded-xl p-4 text-white">
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-4 w-full"
                        >
                          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#F48721]">
                            <FaUser size={20} />
                          </div>

                          <div className="text-left">
                            <p className="font-semibold">
                              Abul Ala Jobayar
                            </p>
                            <p className="text-sm opacity-90">
                              Logout
                            </p>
                          </div>
                        </button>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="px-4 pb-4 overflow-y-auto flex-1">
                      <div className="bg-gray-100 rounded-xl overflow-hidden">

                        <Link
                          href="/combos"
                          className="block px-4 py-3 border-b hover:bg-white"
                        >
                          Combos
                        </Link>

                        <Link
                          href="/offer-zone"
                          className="block px-4 py-3 border-b hover:bg-white"
                        >
                          Offer Zone
                        </Link>

                        <Link
                          href="/mango"
                          className="block px-4 py-3 border-b hover:bg-white"
                        >
                          Mango
                        </Link>

                        <details className="group">
                          <summary className="flex items-center justify-between px-4 py-3 cursor-pointer border-b list-none">
                            Honey
                            <span className="group-open:rotate-90 transition">
                              <IoIosArrowForward />
                            </span>
                          </summary>

                          <div className="bg-white">
                            <Link
                              href="/honey/raw"
                              className="block px-8 py-2 hover:bg-gray-50"
                            >
                              Raw Honey
                            </Link>

                            <Link
                              href="/honey/sundarban"
                              className="block px-8 py-2 hover:bg-gray-50"
                            >
                              Sundarban Honey
                            </Link>
                          </div>
                        </details>

                        <details className="group">
                          <summary className="flex items-center justify-between px-4 py-3 cursor-pointer list-none">
                            Dates
                            <span className="group-open:rotate-90 transition">
                              <IoIosArrowForward />
                            </span>
                          </summary>

                          <div className="bg-white">
                            <Link href="#" className="block px-8 py-2">
                              Safawi/Kalmi
                            </Link>

                            <Link href="#" className="block px-8 py-2">
                              Medjool
                            </Link>

                            <Link href="#" className="block px-8 py-2">
                              Sukkari
                            </Link>

                            <Link href="#" className="block px-8 py-2">
                              Ajwa
                            </Link>
                          </div>
                        </details>

                      </div>
                    </div>
                  </DrawerContent>
                </Drawer>
              </div>


              <p className=" font-semibold  text-md">Authentic Surgical</p>
              <div className="relative">
                {/* <Badge
                  className="absolute bottom-4 left-4 h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
                  variant="destructive"
                >
                  99
                </Badge> */}
                <button onClick={() => setCartOpen(true)}>
                  <FaCartArrowDown />
                </button>
              </div>
            </div>
          </Container>
        </div>
        <AnimatePresence>
          {isSearchOpen && (
            <>
              {/* Light Blur Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsSearchOpen(false)}
                className="fixed inset-0 bg-black/20 backdrop-blur-[1px] z-40 opacity-100"
              />

              {/* Search Panel */}
              <motion.div
                initial={{ y: -25, opacity: 0, scale: 0.98 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: -25, opacity: 0, scale: 0.98 }}
                transition={{ type: "spring", stiffness: 260, damping: 25 }}
                className="fixed top-0 left-0 w-full z-50 flex justify-center pt-4"
              >
                <div className="w-[95%] max-w-2xl bg-white rounded-2xl shadow-xl overflow-visible ">

                  {/* Header */}
                  <div className=" flex items-center justify-between px-4 py-3 border-b">
                    <h2 className="text-sm font-semibold text-gray-700">
                      Search Product
                    </h2>

                    <button
                      onClick={() => setIsSearchOpen(false)}
                      className="p-2 rounded-full hover:bg-gray-100 transition"
                    >
                      <IoClose size={20} />
                    </button>
                  </div>

                  {/* Search Content */}
                  <div className="p-3">
                    <SearchProduct />
                  </div>

                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* bottom nav */}

        <div className="fixed bottom-0 left-0 w-full z-50 bg-[#F48721] shadow-lg">
          <div className="flex justify-around items-center py-2">

            {navItems.map((item) => {
              const Icon = item.icon;

              const content = (
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  className="flex flex-col items-center text-white"
                >
                  <Icon size={22} />
                  <p className="text-[10px] font-semibold mt-1">
                    {item.label}
                  </p>
                </motion.div>
              );


              if (item.action) {
                return (
                  <button
                    key={item.id}
                    onClick={() => setDrawerOpen(true)}
                    className="flex flex-col items-center"
                  >
                    {content}
                  </button>
                );
              }
              if (item.search) {
                return (
                  <button
                    key={item.id}
                    onClick={() => setIsSearchOpen(!isSearchOpen)}
                    className="flex flex-col items-center"
                  >
                    {content}
                  </button>
                );
              }
              if (item.cart) {
                return (
                  <button
                    onClick={() => setCartOpen(true)}
                    className="cursor-pointer flex flex-col items-center"
                    key={item.id}

                  >

                    {content}
                  </button>
                );
              }


              return (
                <Link key={item.id} href={item.href!}>
                  {content}
                </Link>
              );
            })}
          </div>
        </div>




      </nav>
      {/* Cart Drawer */}

      <Cart cartItems={cartItems} cartOpen={cartOpen} setCartOpen={setCartOpen} />
    </>
  );
};

export default Navbar;
