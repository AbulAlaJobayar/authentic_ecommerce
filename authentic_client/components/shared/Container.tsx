import { cn } from "@/lib/utils";
import React from "react";
interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}
const Container: React.FC<ContainerProps> = ({ children, className }) => {
  return (
    <div className={cn("container mx-auto px-10", className)}>{children}</div>
  );
};

export default Container;
