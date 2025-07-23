import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Shared/Navbar/Navbar";

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <div className="pt-24 min-h-[calc(100vh-68px)]">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
