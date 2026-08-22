import React , {useContext} from 'react'
import { Link , useNavigate} from "react-router-dom";
import AuthContext from '../context/AuthContext.jsx'
import {useSelector} from 'react-redux'
import img from "../assets/logo.png"

import {
  FaSearch,
  FaShoppingCart,

  FaHeart,
  FaUserCircle,
} from "react-icons/fa";



const Navbar = () => {

  const {user , logout} = useContext(AuthContext)
  const cartItems = useSelector( (state) => state.cart.cartItems)
  const navigate = useNavigate()
  const handleLogout = () => {
    logout();
    navigate('/login')
  }

  return (
    <header className="sticky top-0 z-50 bg-slate-950 border-b border-slate-800 shadow-lg">
      <div className="max-w-7xl mx-auto h-20 px-6 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3"
        >
          <img
            src={img}
            alt="Morphix"
            className="h-11 w-auto"
          />

          <span className="text-3xl font-bold text-white tracking-wide">
            Morphix
          </span>
        </Link>

        {/* Navigation */}
        {/* Right Side */}
        <div className="flex items-center gap-6">

          {/* Wishlist */}
          <Link
            to="/wishlist"
            className="relative"
          >
            <FaHeart
              size={22}
              className="text-white hover:text-pink-500 transition"
            />

            <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
              0
            </span>
          </Link>

          {/* Cart */}
          <Link
            to="/cart"
            className="relative"
          >
            <FaShoppingCart
              size={22}
              className="text-white hover:text-cyan-400 transition"
            />

            <span className="absolute -top-2 -right-2 bg-cyan-500 text-black text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-semibold">
              {cartItems?.length || 0}
            </span>
          </Link>

          {user ? (
            <>
              {/* User Name */}
              <Link
                to="/profile"
                className="text-white hover:text-cyan-400 font-medium"
              >
                Hi, {user.name}
              </Link>

              {/* Admin Dashboard */}
              {user.role === "admin" && (
                <Link
                  to="/admin"
                  className="text-cyan-400 hover:text-cyan-300 font-semibold"
                >
                  Admin
                </Link>
              )}

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition text-white"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login">
              <FaUserCircle
                size={28}
                className="text-white hover:text-cyan-400 transition"
              />
            </Link>
          )}

        </div>

      </div>
    </header>
  );
};

export default Navbar;