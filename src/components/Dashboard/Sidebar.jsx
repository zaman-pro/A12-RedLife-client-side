import { useState } from "react";
import { FaBars, FaUsers, FaTasks } from "react-icons/fa";
import {
  MdOutlineDashboardCustomize,
  MdOutlineManageSearch,
} from "react-icons/md";
import { Link, NavLink } from "react-router";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";
import Logo from "../Shared/Logo";
import { FiList, FiPlusCircle, FiUser } from "react-icons/fi";
import { IoExitOutline } from "react-icons/io5";
import toast from "react-hot-toast";

const Sidebar = () => {
  const { logout } = useAuth();
  const [isActive, setActive] = useState(true);
  const { role } = useRole();

  const handleToggle = () => {
    setActive(!isActive);
  };

  const handleLogout = () => {
    toast.dismiss();
    const toastId = toast.loading("Logging out");

    logout()
      .then(() => {
        toast.success("Logout successful", { id: toastId });
      })
      .catch(() => {
        toast.error("Logout failed. Please try again", { id: toastId });
      });
  };

  if (!role) return null;

  return (
    <aside>
      {/* Mobile Header */}
      <div className="bg-base-100 flex justify-between md:hidden">
        <div className="block cursor-pointer p-4 font-bold">
          <Link to="/" className="btn btn-ghost text-xl">
            <img
              className="h-full"
              src="https://i.ibb.co/wrY5MYL0/red-life-icon.png"
              alt="logo"
            />
          </Link>
        </div>
        <button
          onClick={handleToggle}
          className="mobile-menu-button p-4 focus:outline-none focus:bg-base-300"
        >
          <FaBars className="h-5 w-5" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-base-200 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive && "-translate-x-full"
        } md:translate-x-0 transition duration-200 ease-in-out`}
      >
        <div>
          <div className="w-full hidden md:flex px-4 py-2 justify-center items-center mx-auto">
            <Logo />
          </div>

          {/* Menu Items */}
          <div className="flex flex-col justify-between flex-1 mt-6">
            <ul className="space-y-3">
              <li className="rounded-lg hover:shadow-md hover:shadow-accent/10 transition-all">
                <NavLink
                  to="overview"
                  className={({ isActive }) =>
                    `flex items-center px-2 py-2 ${
                      isActive && "text-secondary"
                    }`
                  }
                >
                  <MdOutlineDashboardCustomize className="mr-3 text-lg" />
                  Overview
                </NavLink>
              </li>

              <li className="rounded-lg hover:shadow-md hover:shadow-accent/10 transition-all">
                <NavLink
                  to="profile"
                  className={({ isActive }) =>
                    `flex items-center px-2 py-2 ${
                      isActive && "text-secondary"
                    }`
                  }
                >
                  <FiUser className="mr-3 text-lg" />
                  Profile
                </NavLink>
              </li>

              <li className="rounded-lg hover:shadow-md hover:shadow-accent/10 transition-all">
                <NavLink
                  to="my-donation-requests"
                  className={({ isActive }) =>
                    `flex items-center px-2 py-2 ${
                      isActive && "text-secondary"
                    }`
                  }
                >
                  <FiList className="mr-3 text-lg" />
                  My Donation Requests
                </NavLink>
              </li>

              <li className="rounded-lg hover:shadow-md hover:shadow-accent/10 transition-all">
                <NavLink
                  to="create-donation-request"
                  className={({ isActive }) =>
                    `flex items-center px-2 py-2 ${
                      isActive && "text-secondary"
                    }`
                  }
                >
                  <FiPlusCircle className="mr-3 text-lg" />
                  Create Request
                </NavLink>
              </li>

              {role === "admin" && (
                <li className="rounded-lg hover:shadow-md hover:shadow-accent/10 transition-all">
                  <NavLink
                    to="all-users"
                    className={({ isActive }) =>
                      `flex items-center px-2 py-2 ${
                        isActive && "text-secondary"
                      }`
                    }
                  >
                    <FaUsers className="mr-3 text-lg" />
                    All Users
                  </NavLink>
                </li>
              )}

              {(role === "admin" || role === "volunteer") && (
                <li className="rounded-lg hover:shadow-md hover:shadow-accent/10 transition-all">
                  <NavLink
                    to="all-blood-donation-request"
                    className={({ isActive }) =>
                      `flex items-center px-2 py-2 ${
                        isActive && "text-secondary"
                      }`
                    }
                  >
                    <FaTasks className="mr-3 text-lg" />
                    All Donation Requests
                  </NavLink>
                </li>
              )}

              {(role === "admin" || role === "volunteer") && (
                <li className="rounded-lg hover:shadow-md hover:shadow-accent/10 transition-all">
                  <NavLink
                    to="content-management"
                    className={({ isActive }) =>
                      `flex items-center px-2 py-2 ${
                        isActive && "text-secondary"
                      }`
                    }
                  >
                    <MdOutlineManageSearch className="mr-3 text-lg" />
                    Content Management
                  </NavLink>
                </li>
              )}

              {/* Mobile Logout */}
              <li className="rounded-lg block md:hidden" onClick={handleLogout}>
                <div className="flex items-center px-2 py-2 border border-secondary/50 rounded">
                  <IoExitOutline className="mr-3 text-xl" />
                  <span className="font-medium">Logout</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Desktop Logout */}
        <div className="hidden md:block">
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-2 py-2 mt-2 rounded-lg bg-gradient-to-r from-secondary/5 to-accent/5 hover:text-secondary"
          >
            <IoExitOutline className="mr-3 text-xl" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
