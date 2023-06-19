import React from "react";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <>
      <main>
        <Outlet></Outlet>
      </main>
    </>
  );
};

export default RootLayout;
