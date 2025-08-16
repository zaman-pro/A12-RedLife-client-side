import React from "react";
import { FaCheck } from "react-icons/fa";

const BenefitItem = ({ text }) => {
  return (
    <li className="flex items-start">
      <span className="mt-1 mr-3 text-red-500">
        <FaCheck />
      </span>
      <span className="">{text}</span>
    </li>
  );
};

export default BenefitItem;
