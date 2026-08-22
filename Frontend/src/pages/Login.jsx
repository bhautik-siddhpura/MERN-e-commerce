import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaShieldAlt,
} from "react-icons/fa";
import logo from "../assets/logo.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Login Successful!");

        login(data);

        navigate("/");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
  <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-6 py-12">

    {/* Background Blur */}

    <div className="absolute w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full left-0 top-10"></div>

    <div className="absolute w-96 h-96 bg-purple-500/10 blur-[120px] rounded-full right-0 bottom-10"></div>

    {/* Card */}

    <div className="relative w-full max-w-md">

      <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl shadow-2xl p-8">

        {/* Logo */}

        <div className="flex flex-col items-center">

          <img
            src={logo}
            alt="Morphix"
            className="w-20 mb-5"
          />

          <h1 className="text-4xl font-bold text-white">
            Welcome Back
          </h1>

          <p className="mt-3 text-gray-400 text-center">
            Sign in to continue your shopping journey.
          </p>

        </div>

        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="mt-10 space-y-6"
        >

          {/* Email */}

          <div>

            <label className="text-gray-300 mb-2 block">
              Email Address
            </label>

            <div className="flex items-center rounded-xl bg-slate-800 border border-slate-700 focus-within:border-cyan-500 transition">

              <FaEnvelope className="mx-4 text-cyan-400" />

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-transparent py-4 pr-4 outline-none text-white placeholder-gray-500"
              />

            </div>

          </div>

          {/* Password */}

          <div>

            <div className="flex justify-between mb-2">

              <label className="text-gray-300">
                Password
              </label>

              <Link
                to="/forgot-password"
                className="text-sm text-cyan-400 hover:text-cyan-300"
              >
                Forgot Password?
              </Link>

            </div>

            <div className="flex items-center rounded-xl bg-slate-800 border border-slate-700 focus-within:border-cyan-500 transition">

              <FaLock className="mx-4 text-cyan-400" />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-transparent py-4 outline-none text-white placeholder-gray-500"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="px-4 text-gray-400 hover:text-white"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>

            </div>

          </div>

          {/* Button */}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl bg-cyan-500 hover:bg-cyan-600 transition-all duration-300 font-semibold text-lg text-black shadow-lg shadow-cyan-500/20 hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
          >
            {loading ? "Logging In..." : "Login"}
          </button>

        </form>

        {/* Divider */}

        <div className="flex items-center gap-3 my-8">

          <div className="flex-1 h-px bg-slate-700"></div>

          <span className="text-gray-500 text-sm">
            OR
          </span>

          <div className="flex-1 h-px bg-slate-700"></div>

        </div>

        {/* Register */}

        <p className="text-center text-gray-400">

          Don't have an account?

          <Link
            to="/register"
            className="text-cyan-400 font-semibold hover:text-cyan-300 ml-2"
          >
            Create Account
          </Link>

        </p>

        {/* Footer */}

        <div className="mt-8 flex justify-center items-center gap-2 text-gray-500 text-sm">

          <FaShieldAlt />

          <span>
            Secure Login • Protected by Morphix
          </span>

        </div>

      </div>

    </div>

  </main>
);
};

export default Login;