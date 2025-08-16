import React from "react";
import { NavLink } from "react-router";

const NavLinks = ({ user, onLinkClick }) => {
  return (
    <>
      <li>
        <NavLink className="font-medium" to="/" onClick={onLinkClick}>
          Home
        </NavLink>
      </li>

      <li>
        <NavLink
          className="font-medium"
          to="/donation-requests"
          onClick={onLinkClick}
        >
          Donation Requests
        </NavLink>
      </li>
      <li>
        <NavLink className="font-medium" to="/blog" onClick={onLinkClick}>
          Blog
        </NavLink>
      </li>

      {user && (
        <>
          <li>
            <NavLink
              className="font-medium"
              to="/funding"
              onClick={onLinkClick}
            >
              Funding
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard" className="font-medium">
              Dashboard
            </NavLink>
          </li>
        </>
      )}
    </>
  );
};

export default NavLinks;
