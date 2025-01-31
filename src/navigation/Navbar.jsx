import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Number from "../assets/Number";
import usePerson from "../hooks/usePerson";
import CartSvg from "../svgs/CartSvg";

const Navbar = () => {
  const { userIsLoggedIn, setUserIsLoggedIn, user, setUser } = usePerson();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogOut = () => {
    localStorage.removeItem("JWTUser");
    setUser(null);
    setUserIsLoggedIn(false);
  };

  return (
    <nav className="gradient-soft-natural shadow-sm  fixed top-0 left-0 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3">
            <CartSvg />
            <h1 className="gradient-word text-2xl font-semibold">
              <NavLink to="/quickmart" className="">
                QuickMart
              </NavLink>
            </h1>
            <p className="text-pale-lime uppercase sm:block hidden ">
              | {user?.user.name}
            </p>
          </div>

          {/* Mobile Menu Button */}
          <div className="sm:hidden text-burnt-sienna text-2xl">
            <Link
              to="/quickmart/cart"
              className=" text-2xl text-burnt-sienna text-lg  transition-colors"
            >
              Cart [ <Number /> ]
            </Link>
            <button
              className="focus:outline-none ml-3 cursor-pointer"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>

          {/* Navbar Links */}
          <ul
            className={`absolute sm:static right-0 top-16 w-full sm:w-auto sm:flex sm:items-center sm:justify-center space-y-4 sm:space-y-0 sm:space-x-6 p-5 sm:p-0 shadow-md sm:shadow-none transition-all duration-300 ease-in-out ${
              menuOpen ? "block gradient-soft-natural" : "hidden"
            }`}
          >
            <li>
              <Link
                to="/quickmart/cart"
                className="hidden sm:block text-burnt-sienna text-lg transition-colors"
              >
                Cart [ <Number /> ]
              </Link>
            </li>
            <li className="text-end">
              <p className="text-sunset-orange uppercase block sm:hidden">
                {user?.user.name}
              </p>
            </li>
            <li className="text-end">
              <Link
                to="/quickmart"
                className="block text-burnt-sienna text-lg transition-colors"
              >
                Home
              </Link>
            </li>
            <li className="text-end">
              {userIsLoggedIn ? (
                <Link
                  onClick={handleLogOut}
                  className="block text-burnt-sienna text-lg transition-colors"
                >
                  Logout
                </Link>
              ) : (
                <Link
                  to="/quickmart/login"
                  className="block text-burnt-sienna text-lg transition-colors"
                >
                  Login
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
