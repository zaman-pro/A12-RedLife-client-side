import { useState } from "react";
import { GrLogout } from "react-icons/gr";
import { FaBars } from "react-icons/fa";
import { Link, NavLink } from "react-router";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";
import Logo from "../Shared/Logo";

const Sidebar = () => {
  const { logout } = useAuth();
  const [isActive, setActive] = useState(true);

  const { role } = useRole();

  const handleToggle = () => {
    setActive(!isActive);
  };
  return (
    <aside>
      {/* sm device menu bar with logo */}
      <div className="bg-base-100 text-base-content flex justify-between md:hidden">
        <div>
          <div className="block cursor-pointer p-4 font-bold">
            <Link to="/" className="btn btn-ghost text-xl">
              <img
                className="h-full"
                src="https://i.ibb.co/wrY5MYL0/red-life-icon.png"
                alt="logo"
              />
            </Link>
          </div>
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
        }  md:translate-x-0 transition duration-200 ease-in-out`}
      >
        <div>
          <div>
            <div className="w-full hidden md:flex px-4 py-2 shadow-lg rounded-lg justify-center items-center mx-auto">
              {/* <Link to="/" className="btn btn-ghost text-xl">
                <img
                  className="h-full"
                  src="https://i.ibb.co/wrY5MYL0/red-life-icon.png"
                  alt="logo"
                />
              </Link> */}

              <Logo />
            </div>
          </div>

          {/* sidebar Items */}
          <div className="flex flex-col justify-between flex-1 mt-6">
            <ul className="menu bg-base-200 rounded-box space-y-2">
              <li className="border rounded">
                <NavLink to="overview">Overview</NavLink>
              </li>

              <li className="border rounded">
                <NavLink to="profile">Profile</NavLink>
              </li>

              <li className="border rounded">
                <NavLink to="my-donation-requests">My Donation Request</NavLink>
              </li>

              <li className="border rounded">
                <NavLink to="create-donation-request">
                  Create Donation Request
                </NavLink>
              </li>

              {role === "admin" && (
                <li className="border rounded">
                  <NavLink to="all-users">All User</NavLink>
                </li>
              )}

              {(role === "admin" || role === "volunteer") && (
                <li className="border rounded">
                  <NavLink to="all-blood-donation-request">
                    All Donation Request
                  </NavLink>
                </li>
              )}

              {(role === "admin" || role === "volunteer") && (
                <li className="border rounded">
                  <NavLink to="content-management">Content Management</NavLink>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div>
          <hr />
          <button
            onClick={logout}
            className="flex w-full items-center px-4 py-2 mt-5 text-base-content hover:bg-base-300 hover:text-base-content transition-colors duration-300 transform"
          >
            <GrLogout className="w-5 h-5" />
            <span className="mx-4 font-medium">Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
