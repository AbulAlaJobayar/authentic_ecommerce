import React from "react";
import DashboardDrawer from "./dashboard/components/DashboardDrawer";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (

    <DashboardDrawer>
      {children}
    </DashboardDrawer>
  )
};

export default DashboardLayout;
