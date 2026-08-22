import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

import {
  FaUserCircle,
  FaShoppingBag,
  FaBoxOpen,
  FaCheckCircle,
  FaMoneyBillWave,
  FaShieldAlt,
  FaSignOutAlt,
  FaSpinner,
} from "react-icons/fa";

const Profile = () => {
  const { user, logout } = useContext(AuthContext);

  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/orders/myOrders", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        setOrders(data);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const totalOrders = orders.length;

  const totalSpent = orders.reduce(
    (acc, order) => acc + order.totalAmount,
    0
  );

  const pendingOrders = orders.filter(
    (order) => order.status === "pending"
  ).length;

  const deliveredOrders = orders.filter(
    (order) => order.status === "delivered"
  ).length;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
  <main className="min-h-screen bg-slate-950 text-white py-12 px-6">

    <div className="max-w-7xl mx-auto">

      {/* Heading */}

      <h1 className="text-5xl font-bold mb-10">
        My Profile
      </h1>

      {loading ? (

        <div className="flex justify-center items-center py-32">

          <FaSpinner className="text-cyan-400 text-5xl animate-spin" />

        </div>

      ) : (

        <div className="grid lg:grid-cols-3 gap-8">

          {/* Left Section */}

          <div className="space-y-8">

            {/* User Card */}

            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center">

              <FaUserCircle className="text-8xl text-cyan-400 mx-auto mb-5" />

              <h2 className="text-3xl font-bold">
                {user?.name}
              </h2>

              <p className="text-gray-400 mt-2">
                {user?.email}
              </p>

              <span className="inline-block mt-5 bg-cyan-500/20 text-cyan-400 px-4 py-2 rounded-full text-sm">

                {user?.role?.toUpperCase() || "USER"}

              </span>

            </div>

            {/* Security */}

            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">

              <h3 className="text-xl font-semibold flex items-center gap-3 mb-6">

                <FaShieldAlt className="text-green-400" />

                Account Security

              </h3>

              <div className="space-y-4 text-gray-300">

                <div className="flex justify-between">

                  <span>Email Verified</span>

                  <FaCheckCircle className="text-green-400" />

                </div>

                <div className="flex justify-between">

                  <span>JWT Authentication</span>

                  <FaCheckCircle className="text-green-400" />

                </div>

                <div className="flex justify-between">

                  <span>Secure Payment</span>

                  <FaCheckCircle className="text-green-400" />

                </div>

              </div>

            </div>

            {/* Logout */}

            <button
              onClick={handleLogout}
              className="w-full bg-red-600 hover:bg-red-700 py-4 rounded-2xl font-semibold flex justify-center items-center gap-3 transition"
            >

              <FaSignOutAlt />

              Logout

            </button>

          </div>

          {/* Right Section */}

          <div className="lg:col-span-2 space-y-8">

            {/* Statistics */}

            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

                <FaShoppingBag className="text-cyan-400 text-3xl mb-3" />

                <p className="text-gray-400">
                  Total Orders
                </p>

                <h3 className="text-3xl font-bold mt-2">

                  {totalOrders}

                </h3>

              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

                <FaBoxOpen className="text-yellow-400 text-3xl mb-3" />

                <p className="text-gray-400">
                  Pending
                </p>

                <h3 className="text-3xl font-bold mt-2">

                  {pendingOrders}

                </h3>

              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

                <FaCheckCircle className="text-green-400 text-3xl mb-3" />

                <p className="text-gray-400">
                  Delivered
                </p>

                <h3 className="text-3xl font-bold mt-2">

                  {deliveredOrders}

                </h3>

              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

                <FaMoneyBillWave className="text-cyan-400 text-3xl mb-3" />

                <p className="text-gray-400">
                  Total Spent
                </p>

                <h3 className="text-3xl font-bold mt-2">

                  ₹{totalSpent}

                </h3>

              </div>

            </div>

            {/* Orders */}

            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">

              <h2 className="text-3xl font-bold mb-8">

                Order History

              </h2>

              {orders.length === 0 ? (

                <div className="text-center py-12">

                  <FaShoppingBag className="text-6xl text-gray-600 mx-auto mb-5" />

                  <h3 className="text-2xl font-semibold">

                    No Orders Yet

                  </h3>

                  <p className="text-gray-400 mt-3">

                    Start shopping to see your orders here.

                  </p>

                  <Link
                    to="/"
                    className="inline-block mt-6 bg-cyan-500 hover:bg-cyan-600 px-8 py-3 rounded-xl text-black font-semibold transition"
                  >

                    Continue Shopping

                  </Link>

                </div>

              ) : (

                <div className="space-y-5">

                  {orders.map((order) => (

                    <div
                      key={order._id}
                      className="border border-slate-800 rounded-2xl p-6 bg-slate-800/40"
                    >

                      <div className="flex flex-col md:flex-row md:justify-between gap-4">

                        <div>

                          <p className="text-sm text-gray-400">

                            Order ID

                          </p>

                          <h3 className="font-semibold break-all">

                            {order._id}

                          </h3>

                        </div>

                        <div>

                          <p className="text-sm text-gray-400">

                            Amount

                          </p>

                          <h3 className="font-semibold text-cyan-400">

                            ₹{order.totalAmount}

                          </h3>

                        </div>

                        <div>

                          <p className="text-sm text-gray-400">

                            Status

                          </p>

                          <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">

                            {order.status}

                          </span>

                        </div>

                      </div>

                    </div>

                  ))}

                </div>

              )}

            </div>

          </div>

        </div>

      )}

    </div>

  </main>
);

}

export default Profile