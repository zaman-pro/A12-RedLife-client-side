import React from "react";
import { Link } from "react-router";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center">
      <img
        className="w-10 mr-2 hidden md:flex"
        src="https://i.ibb.co/wrY5MYL0/red-life-icon.png"
        alt="Logo"
      />
      <span className="hidden lg:flex text-3xl font-bold text-secondary">
        RedLife
      </span>
    </Link>
  );
};

export default Logo;
