import Navbar from "@/components/layout/Navbar/Navbar";
import Container from "@/components/shared/Container";
import React from "react";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="">
        <Navbar />

        <Container>{children}</Container>
      </div>
    </>
  );
};

export default CommonLayout;
