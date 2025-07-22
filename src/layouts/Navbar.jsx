import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

// Navigation Items
const navItems = [
  { name: "Home", link: "/home" },
  { name: "Profile", link: "/profile" },
  { name: "Contact", link: "/contact" },
  { name: "Admin", link: "/admin" },
  { name: "Login", link: "/", special: true },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
        <nav className="bg-base-300 shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 text-pink-600 text-2xl font-bold">
            <Link to="/home">NTN</Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.link}
                className={`${
                  item.special
                    ? "text-pink-500 font-semibold hover:underline"
                    : " hover:text-pink-500"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 focus:outline-none"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden  px-4 pt-2 pb-4 space-y-2 text-center text-2xl">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.link}
              onClick={toggleMenu}
              className={`block ${
                item.special
                  ? "text-pink-500 font-semibold hover:underline"
                  : " hover:text-pink-500"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
    <Outlet />
    </>
  );
}

export default Navbar;
