import React, { useEffect, useRef, useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { Link, NavLink, useLocation } from "react-router";
import { themeChange } from "theme-change";
import { RxAvatar } from "react-icons/rx";
import toast from "react-hot-toast";
import NavLinks from "../NavLinks/NavLinks";
import { AnimatePresence, motion } from "motion/react";
import { Tooltip } from "react-tooltip";
import { RiHome4Line } from "react-icons/ri";
import useAuth from "../../../hooks/useAuth";
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";
import Logo from "../Logo";
import Loading from "../Loading/Loading";

const Navbar = () => {
  const location = useLocation();
  const { user, loading, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const dropdownRef = useRef(null);
  const menuRef = useRef(null);

  const toggleMenu = () => setIsOpen(!isOpen);
  const showAuthLinks = !user && location.pathname !== "/auth";

  useEffect(() => {
    themeChange(false);
  }, []);

  // Theme state sync
  useEffect(() => {
    const updateTheme = () => {
      setTheme(localStorage.getItem("theme") || "light");
    };

    window.addEventListener("themeChange", updateTheme);
    return () => window.removeEventListener("themeChange", updateTheme);
  }, []);

  // Click outside dropdown to close
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Click outside menu to close
  useEffect(() => {
    const handleClickOutsideMenu = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutsideMenu);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideMenu);
    };
  }, [isOpen]);

  const handleThemeChange = (e) => {
    // console.log(e);
    if (!e.isTrusted) return;

    const newTheme = e.target.checked ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);

    // theme change update
    window.dispatchEvent(new Event("themeChange"));
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

  const dropLinks = (
    <>
      <li>
        <NavLink
          to="/dashboard/profile"
          className={({ isActive }) =>
            isActive ? "font-semibold text-primary" : ""
          }
        >
          Profile
        </NavLink>
        <NavLink
          to="/dashboard/my-donation-requests"
          className={({ isActive }) =>
            isActive ? "font-semibold text-primary" : ""
          }
        >
          My Requests
        </NavLink>
        <NavLink
          to="/dashboard/create-donation-request"
          className={({ isActive }) =>
            isActive ? "font-semibold text-primary" : ""
          }
        >
          Create Request
        </NavLink>
      </li>
    </>
  );

  if (loading) return <Loading />;

  return (
    <div className="navbar h-16 bg-base-100/80 fixed z-50 top-0 left-1/2 -translate-x-1/2 rounded-md px-4 lg:px-5 max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 backdrop-blur-md">
      <div className="navbar-start">
        <div className="relative md:hidden" ref={menuRef}>
          <button
            onClick={toggleMenu}
            className="transition-transform duration-300 ease-in-out relative w-7 h-7 flex text-secondary"
          >
            <div
              className="absolute inset-0 transition-all duration-300 ease-in-out transform"
              style={{ opacity: isOpen ? 0 : 1, transform: "rotate(0deg)" }}
            >
              <RiHome4Line className="w-full h-full" />
            </div>
            <div
              className="absolute inset-0 transition-all duration-300 ease-in-out transform"
              style={{
                opacity: isOpen ? 1 : 0,
                transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
              }}
            >
              <FaXmark className="w-full h-full" />
            </div>
          </button>

          <AnimatePresence mode="wait">
            {isOpen && (
              <motion.ul
                role="menu"
                aria-label="mobile Menu"
                key="mobile-menu"
                layout
                className="absolute left-0 mt-6 z-10 p-2 shadow menu menu-sm bg-base-100 rounded-box w-52 overflow-hidden will-change-transform"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 32,
                  mass: 0.8,
                }}
              >
                <NavLinks user={user} onLinkClick={() => setIsOpen(false)} />
              </motion.ul>
            )}
          </AnimatePresence>
        </div>

        <Logo />
      </div>

      <div className="navbar-center hidden md:flex">
        <ul className="menu menu-horizontal px-1">
          <NavLinks user={user} />
        </ul>
      </div>

      <div className="navbar-end flex items-center gap-3">
        {/* theme toggle button */}
        <label className="swap swap-rotate">
          <input
            type="checkbox"
            onChange={handleThemeChange}
            checked={theme === "dark"}
          />

          <IoSunnyOutline size={28} className="swap-off fill-current" />

          <IoMoonOutline size={28} className="swap-on fill-current" />
        </label>

        {/* Avatar with dropdown */}
        {user ? (
          <>
            <div ref={dropdownRef} className="relative">
              <div
                role="button"
                tabIndex={0}
                data-tooltip-id="user-tooltip"
                data-tooltip-content={user?.displayName || "Guest"}
                className="w-7 h-7 md:w-10 md:h-10 rounded-full overflow-hidden cursor-pointer flex items-center justify-center"
                onClick={() => setIsDropdownOpen((prev) => !prev)}
              >
                {user?.photoURL ? (
                  <img
                    src={user.photoURL}
                    className="w-full h-full object-cover"
                    alt="User Avatar"
                  />
                ) : (
                  <RxAvatar className="w-full h-full" />
                )}
              </div>

              <AnimatePresence mode="wait">
                {isDropdownOpen && (
                  <motion.ul
                    key="dropdown"
                    layout
                    className="absolute right-0 mt-6 z-10 p-2 shadow menu menu-sm bg-base-100 rounded-box w-52 overflow-hidden will-change-transform"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 32,
                      mass: 0.8,
                    }}
                  >
                    {dropLinks}

                    <li>
                      <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                          isActive ? "font-semibold text-primary" : ""
                        }
                      >
                        Dashboard
                      </NavLink>
                    </li>

                    <li>
                      <button
                        onClick={handleLogout}
                        className="btn btn-xs btn-secondary rounded mt-1"
                      >
                        Logout
                      </button>
                    </li>
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>

            <div className="hidden lg:block">
              <Tooltip
                id="user-tooltip"
                place="bottom"
                offset={13}
                key={theme}
                style={{
                  backgroundColor: theme === "dark" ? "#f3f4f6" : "#1f2937",
                  color: theme === "dark" ? "#111827" : "#f9fafb",
                }}
              />
            </div>
          </>
        ) : (
          showAuthLinks && (
            <div className="flex gap-2">
              <Link
                to="/auth?mode=login"
                className="btn btn-outline btn-secondary"
              >
                Login
              </Link>

              {/* <Link
                to="/auth?mode=register"
                className="btn btn-outline btn-secondary hidden md:flex"
              >
                Register
              </Link> */}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Navbar;
