import React from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

const PasswordToggle = ({ show, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={show ? "Hide password" : "Show password"}
      className="hover:bg-accent/20 rounded-full p-1.5 text-secondary absolute right-3 top-1/2 -translate-y-1/2 transition-colors duration-300 ease-in-out"
    >
      {show ? <FaEyeSlash /> : <FaEye />}
    </button>
  );
};

export default PasswordToggle;
