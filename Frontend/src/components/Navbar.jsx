import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AuthContext from "../context/AuthContext.jsx";
import img from "../assets/logo.png";

import {
  FaShoppingCart,
  FaHeart,
  FaUserCircle,
  FaBars,
  FaTimes,
  FaSignOutAlt,
  FaUser,
  FaTachometerAlt,
} from "react-icons/fa";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  const cartItems = useSelector(
    (state) => state.cart.cartItems
  );

  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

  // Logout functionality
  const handleLogout = () => {
    setMenuOpen(false);
    logout();
    navigate("/login");
  };

  // Close mobile menu after navigation
  const closeMenu = () => {
    setMenuOpen(false);
  };

  // Wishlist count placeholder
  const wishlistCount = 0;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950 shadow-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:h-20 sm:px-6">

        {/* Logo */}
        <Link
          to="/"
          onClick={closeMenu}
          className="flex min-w-0 shrink-0 items-center gap-2 sm:gap-3"
        >
          <img
            src={img}
            alt="Morphix Logo"
            className="h-9 w-auto sm:h-11"
          />

          <span className="text-2xl font-bold tracking-wide text-white sm:text-3xl">
            Morphix
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-5 md:flex lg:gap-6">

          {/* Wishlist */}
          <Link
            to="/wishlist"
            aria-label={`Wishlist, ${wishlistCount} items`}
            className="relative shrink-0"
          >
            <FaHeart
              size={22}
              className="text-white transition hover:text-pink-500"
            />

            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-pink-600 text-[10px] text-white">
              {wishlistCount}
            </span>
          </Link>

          {/* Cart */}
          <Link
            to="/cart"
            aria-label={`Shopping cart, ${cartItems?.length || 0} items`}
            className="relative shrink-0"
          >
            <FaShoppingCart
              size={22}
              className="text-white transition hover:text-cyan-400"
            />

            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-cyan-500 text-[10px] font-semibold text-black">
              {cartItems?.length || 0}
            </span>
          </Link>

          {user ? (
            <>
              {/* User Profile */}
              <Link
                to="/profile"
                className="whitespace-nowrap font-medium text-white transition hover:text-cyan-400"
              >
                Hi, {user.name}
              </Link>

              {/* Admin Dashboard */}
              {user.role === "admin" && (
                <Link
                  to="/admin"
                  className="font-semibold text-cyan-400 transition hover:text-cyan-300"
                >
                  Admin
                </Link>
              )}

              {/* Logout */}
              <button
                type="button"
                onClick={handleLogout}
                className="whitespace-nowrap rounded-lg bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" aria-label="Login">
              <FaUserCircle
                size={28}
                className="text-white transition hover:text-cyan-400"
              />
            </Link>
          )}
        </nav>

        {/* Mobile Actions */}
        <div className="flex shrink-0 items-center gap-4 md:hidden">

          {/* Mobile Wishlist */}
          <Link
            to="/wishlist"
            aria-label={`Wishlist, ${wishlistCount} items`}
            onClick={closeMenu}
            className="relative"
          >
            <FaHeart
              size={20}
              className="text-white transition hover:text-pink-500"
            />

            <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-pink-600 text-[9px] text-white">
              {wishlistCount}
            </span>
          </Link>

          {/* Mobile Cart */}
          <Link
            to="/cart"
            aria-label={`Shopping cart, ${cartItems?.length || 0} items`}
            onClick={closeMenu}
            className="relative"
          >
            <FaShoppingCart
              size={20}
              className="text-white transition hover:text-cyan-400"
            />

            <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-cyan-500 text-[9px] font-semibold text-black">
              {cartItems?.length || 0}
            </span>
          </Link>

          {/* Hamburger Button */}
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            className="rounded-lg p-2 text-white transition hover:bg-slate-800 hover:text-cyan-400"
          >
            {menuOpen ? (
              <FaTimes size={23} />
            ) : (
              <FaBars size={23} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="border-t border-slate-800 bg-slate-900 px-4 py-4 shadow-xl md:hidden">

          <nav className="mx-auto flex max-w-7xl flex-col gap-2">

            {user ? (
              <>
                {/* User Information */}
                <div className="mb-2 border-b border-slate-800 px-3 py-3">
                  <p className="text-sm text-gray-400">
                    Welcome back
                  </p>

                  <p className="mt-1 break-words font-semibold text-white">
                    {user.name}
                  </p>
                </div>

                {/* Profile */}
                <Link
                  to="/profile"
                  onClick={closeMenu}
                  className="flex items-center gap-3 rounded-lg px-3 py-3 text-white transition hover:bg-slate-800 hover:text-cyan-400"
                >
                  <FaUser />
                  My Profile
                </Link>

                {/* Wishlist */}
                <Link
                  to="/wishlist"
                  onClick={closeMenu}
                  className="flex items-center justify-between rounded-lg px-3 py-3 text-white transition hover:bg-slate-800 hover:text-pink-400"
                >
                  <span className="flex items-center gap-3">
                    <FaHeart />
                    Wishlist
                  </span>

                  <span className="rounded-full bg-pink-600 px-2 py-1 text-xs">
                    {wishlistCount}
                  </span>
                </Link>

                {/* Cart */}
                <Link
                  to="/cart"
                  onClick={closeMenu}
                  className="flex items-center justify-between rounded-lg px-3 py-3 text-white transition hover:bg-slate-800 hover:text-cyan-400"
                >
                  <span className="flex items-center gap-3">
                    <FaShoppingCart />
                    Shopping Cart
                  </span>

                  <span className="rounded-full bg-cyan-500 px-2 py-1 text-xs font-semibold text-black">
                    {cartItems?.length || 0}
                  </span>
                </Link>

                {/* Admin Dashboard */}
                {user.role === "admin" && (
                  <Link
                    to="/admin"
                    onClick={closeMenu}
                    className="flex items-center gap-3 rounded-lg px-3 py-3 font-semibold text-cyan-400 transition hover:bg-slate-800"
                  >
                    <FaTachometerAlt />
                    Admin Dashboard
                  </Link>
                )}

                {/* Logout */}
                <button
                  type="button"
                  onClick={handleLogout}
                  className="mt-2 flex w-full items-center justify-center gap-3 rounded-lg bg-red-600 px-4 py-3 font-semibold text-white transition hover:bg-red-700"
                >
                  <FaSignOutAlt />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="flex items-center gap-3 rounded-lg px-3 py-3 text-white transition hover:bg-slate-800 hover:text-cyan-400"
                >
                  <FaUserCircle size={20} />
                  Login
                </Link>

                <Link
                  to="/cart"
                  onClick={closeMenu}
                  className="flex items-center gap-3 rounded-lg px-3 py-3 text-white transition hover:bg-slate-800 hover:text-cyan-400"
                >
                  <FaShoppingCart />
                  Shopping Cart
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;