import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Shared/Navbar/Navbar";

const Root = () => {
  return (
    <div>
      <Navbar />

      <div className="pt-24 min-h-[calc(100vh-68px)] max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Root;
