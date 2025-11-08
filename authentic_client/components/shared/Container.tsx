import React from "react";

const Container = ({ children }: { children: React.ReactNode }) => {
  return <div className="px-10 container mx-auto">{children}</div>;
};

export default Container;
