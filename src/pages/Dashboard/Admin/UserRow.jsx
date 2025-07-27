import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { FaEllipsisV } from "react-icons/fa";

const DropdownMenu = ({ children, anchorRef, isOpen, onClose }) => {
  const dropdownRef = useRef(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  // Calculate dropdown position based on anchor element
  useEffect(() => {
    if (isOpen && anchorRef.current) {
      const rect = anchorRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      });
    }
  }, [isOpen, anchorRef]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        anchorRef.current &&
        !anchorRef.current.contains(e.target)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose, anchorRef]);

  if (!isOpen) return null;

  return createPortal(
    <div
      ref={dropdownRef}
      style={{
        position: "absolute",
        top: position.top,
        left: position.left,
        transform: "translateX(-100%)",
        zIndex: 9999,
      }}
      className="menu bg-base-100 shadow-lg rounded-box p-2 w-52"
    >
      {children}
    </div>,
    document.body
  );
};

const UserActionsDropdown = ({
  user,
  onStatusChange,
  onRoleChange,
  onClose,
}) => (
  <>
    {user.status === "active" && (
      <li>
        <button onClick={() => onStatusChange(user._id, "blocked")}>
          Block
        </button>
      </li>
    )}
    {user.status === "blocked" && (
      <li>
        <button onClick={() => onStatusChange(user._id, "active")}>
          Unblock
        </button>
      </li>
    )}
    {["volunteer", "admin", "donor"].map(
      (role) =>
        user.role !== role && (
          <li key={role}>
            <button onClick={() => onRoleChange(user._id, role)}>
              Make {role.charAt(0).toUpperCase() + role.slice(1)}
            </button>
          </li>
        )
    )}
  </>
);

const UserRow = ({ index, user, onStatusChange, onRoleChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef(null);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <tr className="hover:bg-base-300 transition-colors duration-300">
      <td>{index + 1}</td>
      <td>
        <img
          src={user.photo}
          alt={user.name}
          className="w-10 h-10 rounded-full ring ring-secondary"
        />
      </td>
      <td>{user.email}</td>
      <td>{user.name}</td>
      <td className="capitalize">{user.role}</td>
      <td className="capitalize">{user.status}</td>
      <td>
        <button
          ref={menuButtonRef}
          onClick={toggleMenu}
          className="btn btn-sm btn-ghost"
          aria-label="User actions"
        >
          <FaEllipsisV />
        </button>

        <DropdownMenu
          anchorRef={menuButtonRef}
          isOpen={isMenuOpen}
          onClose={closeMenu}
        >
          <UserActionsDropdown
            user={user}
            onStatusChange={onStatusChange}
            onRoleChange={onRoleChange}
            onClose={closeMenu}
          />
        </DropdownMenu>
      </td>
    </tr>
  );
};

export default UserRow;
