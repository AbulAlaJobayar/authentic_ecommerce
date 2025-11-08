import React from "react";
import SearchProduct from "./SearchProduct";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ShoppingBag } from "lucide-react";
import Container from "@/components/shared/Container";
import { Badge } from "@/components/ui/badge";
import SubNavbar from "./SubNavbar";

const Navbar = () => {
  const user = true;
  return (
     <>
    <nav className="bg-blue-200 ">
      <Container>
        <div className=" flex items-center py-3  justify-between">
          {/* website logo */}
          <div className=" ">Navbar</div>
          {/* product search */}
          <div className=" max-w-3/5 w-full">
            <SearchProduct />
          </div>
          {/* user actions: cart, profile, etc. */}
          <div className="flex items-center gap-6">
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
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div>
                    <p>Sign In</p>
                    <p>Your Account</p>
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
        </div>
        
      </Container>
    </nav>
    <SubNavbar/>
   </>
  );
};

export default Navbar;
