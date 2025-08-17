import React from "react";
import { Link } from "react-router";
import fav from "/fav.svg";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center">
      <img className="w-8 mr-1 hidden md:flex" src={fav} alt="Logo" />
      <span className="hidden lg:flex text-3xl font-bold text-secondary leading-8">
        RedLife
      </span>
    </Link>
  );
};

export default Logo;
