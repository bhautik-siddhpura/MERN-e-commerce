import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

import {
  FaUsers,
  FaBoxOpen,
  FaShoppingCart,
  FaRupeeSign,
  FaClock,
  FaCheckCircle,
  FaPlus,
  FaBoxes,
  FaClipboardList,
  FaUserShield,
  FaSyncAlt,
} from "react-icons/fa";

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  /* ===========================
        Dashboard States
  ============================ */

  const [loading, setLoading] = useState(true);

  const [products, setProducts] = useState([]);

  const [orders, setOrders] = useState([]);

  const [users, setUsers] = useState([]);

  /* ===========================
        Authentication
  ============================ */

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (user.role !== "admin") {
      navigate("/");
      return;
    }

    fetchDashboardData();
  }, []);

  /* ===========================
        Fetch Dashboard
  ============================ */

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      const headers = {
        Authorization: `Bearer ${user.token}`,
      };

      const [productsRes, usersRes, ordersRes] = await Promise.all([
        fetch("/api/products"),
        fetch("/api/auth/users", { headers }),
        fetch("/api/orders", { headers }),
      ]);

      const productsData = await productsRes.json();
      const usersData = await usersRes.json();
      const ordersData = await ordersRes.json();

      if (productsRes.ok) {
        setProducts(productsData);
      }

      if (usersRes.ok) {
        setUsers(usersData.users || []);
      }

      if (ordersRes.ok) {
        setOrders(ordersData);
      }
    } catch (error) {
      console.error("Dashboard Error :", error);
    } finally {
      setLoading(false);
    }
  };

  /* ===========================
        Dashboard Statistics
  ============================ */

  const totalRevenue = orders.reduce(
    (acc, order) => acc + order.totalAmount,
    0
  );

  const pendingOrders = orders.filter(
    (order) => order.status === "pending"
  ).length;

  const deliveredOrders = orders.filter(
    (order) => order.status === "delivered"
  ).length;

  const totalProducts = products.length;

  const totalUsers = users.length;

  const totalOrders = orders.length;

  /* ===========================
        Recent Orders
  ============================ */

  const recentOrders = [...orders]
    .sort(
      (a, b) =>
        new Date(b.createdAt) -
        new Date(a.createdAt)
    )
    .slice(0, 5);

  /* ===========================
        Refresh Dashboard
  ============================ */

  const refreshDashboard = () => {
    fetchDashboardData();
  };

  /* ===========================
        Loading Screen
  ============================ */

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-950 flex justify-center items-center">

        <div className="text-center">

          <div className="w-14 h-14 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto"></div>

          <p className="mt-6 text-gray-400 text-lg">
            Loading Dashboard...
          </p>

        </div>

      </main>
    );
  }
    return (
    <main className="min-h-screen bg-slate-950 text-white">

      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* ===============================
                Header
        ================================ */}

        <div className="flex flex-col md:flex-row justify-between md:items-center gap-6 mb-10">

          <div>

            <h1 className="text-5xl font-bold">
              Admin Dashboard
            </h1>

            <p className="text-gray-400 mt-2">
              Welcome back, {user?.name}
            </p>

          </div>

          <button
            onClick={refreshDashboard}
            className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-black px-6 py-3 rounded-xl font-semibold transition"
          >
            <FaSyncAlt />
            Refresh
          </button>

        </div>

        {/* ===============================
                Statistics Cards
        ================================ */}

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-cyan-500 transition">

            <div className="flex justify-between items-center">

              <div>

                <p className="text-gray-400">
                  Revenue
                </p>

                <h2 className="text-4xl font-bold mt-2 text-cyan-400">
                  ₹{totalRevenue}
                </h2>

              </div>

              <FaRupeeSign
                size={40}
                className="text-cyan-400"
              />

            </div>

          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-cyan-500 transition">

            <div className="flex justify-between items-center">

              <div>

                <p className="text-gray-400">
                  Orders
                </p>

                <h2 className="text-4xl font-bold mt-2">
                  {totalOrders}
                </h2>

              </div>

              <FaShoppingCart
                size={40}
                className="text-cyan-400"
              />

            </div>

          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-cyan-500 transition">

            <div className="flex justify-between items-center">

              <div>

                <p className="text-gray-400">
                  Products
                </p>

                <h2 className="text-4xl font-bold mt-2">
                  {totalProducts}
                </h2>

              </div>

              <FaBoxOpen
                size={40}
                className="text-cyan-400"
              />

            </div>

          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-cyan-500 transition">

            <div className="flex justify-between items-center">

              <div>

                <p className="text-gray-400">
                  Users
                </p>

                <h2 className="text-4xl font-bold mt-2">
                  {totalUsers}
                </h2>

              </div>

              <FaUsers
                size={40}
                className="text-cyan-400"
              />

            </div>

          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-yellow-500 transition">

            <div className="flex justify-between items-center">

              <div>

                <p className="text-gray-400">
                  Pending
                </p>

                <h2 className="text-4xl font-bold mt-2 text-yellow-400">
                  {pendingOrders}
                </h2>

              </div>

              <FaClock
                size={40}
                className="text-yellow-400"
              />

            </div>

          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-green-500 transition">

            <div className="flex justify-between items-center">

              <div>

                <p className="text-gray-400">
                  Delivered
                </p>

                <h2 className="text-4xl font-bold mt-2 text-green-400">
                  {deliveredOrders}
                </h2>

              </div>

              <FaCheckCircle
                size={40}
                className="text-green-400"
              />

            </div>

          </div>

        </div>

        {/* ===============================
                Quick Actions
        ================================ */}

        <div className="mt-14">

          <h2 className="text-3xl font-bold mb-8">
            Quick Actions
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

            <Link
              to="/admin/add-product"
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-cyan-500 transition text-center"
            >

              <FaPlus
                size={34}
                className="mx-auto text-cyan-400"
              />

              <h3 className="mt-4 text-xl font-semibold">
                Add Product
              </h3>

            </Link>

            <Link
              to="/admin/products"
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-cyan-500 transition text-center"
            >

              <FaBoxes
                size={34}
                className="mx-auto text-cyan-400"
              />

              <h3 className="mt-4 text-xl font-semibold">
                Manage Products
              </h3>

            </Link>

            <Link
              to="/admin/orders"
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-cyan-500 transition text-center"
            >

              <FaClipboardList
                size={34}
                className="mx-auto text-cyan-400"
              />

              <h3 className="mt-4 text-xl font-semibold">
                Manage Orders
              </h3>

            </Link>

            <Link
              to="/admin/users"
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-cyan-500 transition text-center"
            >

              <FaUserShield
                size={34}
                className="mx-auto text-cyan-400"
              />

              <h3 className="mt-4 text-xl font-semibold">
                Manage Users
              </h3>

            </Link>

          </div>

        </div>

                {/* ===============================
                Recent Orders
        ================================ */}

        <div className="mt-16">

          <div className="flex justify-between items-center mb-8">

            <h2 className="text-3xl font-bold">
              Recent Orders
            </h2>

            <Link
              to="/admin/orders"
              className="text-cyan-400 hover:text-cyan-300"
            >
              View All
            </Link>

          </div>

          <div className="overflow-x-auto bg-slate-900 border border-slate-800 rounded-2xl">

            <table className="w-full">

              <thead className="bg-slate-800">

                <tr>

                  <th className="text-left p-4">Order ID</th>

                  <th className="text-left p-4">Customer</th>

                  <th className="text-left p-4">Amount</th>

                  <th className="text-left p-4">Status</th>

                </tr>

              </thead>

              <tbody>

                {recentOrders.length === 0 ? (

                  <tr>

                    <td
                      colSpan="4"
                      className="text-center p-10 text-gray-400"
                    >
                      No Orders Found
                    </td>

                  </tr>

                ) : (

                  recentOrders.map((order) => (

                    <tr
                      key={order._id}
                      className="border-t border-slate-800 hover:bg-slate-800 transition"
                    >

                      <td className="p-4">
                        #{order._id.slice(-6)}
                      </td>

                      <td className="p-4">
                        {order.user?.name || "Unknown"}
                      </td>

                      <td className="p-4">
                        ₹{order.totalAmount}
                      </td>

                      <td className="p-4">

                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            order.status === "delivered"
                              ? "bg-green-500/20 text-green-400"
                              : order.status === "pending"
                              ? "bg-yellow-500/20 text-yellow-400"
                              : "bg-cyan-500/20 text-cyan-400"
                          }`}
                        >
                          {order.status}
                        </span>

                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </div>

        </div>

        {/* ===============================
                Recent Users & Products
        ================================ */}

        <div className="grid lg:grid-cols-2 gap-8 mt-16">

          {/* Users */}

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

            <h2 className="text-2xl font-bold mb-6">
              Latest Users
            </h2>

            <div className="space-y-4">

              {users.slice(0, 5).map((item) => (

                <div
                  key={item._id}
                  className="flex justify-between items-center border-b border-slate-800 pb-3"
                >

                  <div>

                    <h3 className="font-semibold">
                      {item.name}
                    </h3>

                    <p className="text-sm text-gray-400">
                      {item.email}
                    </p>

                  </div>

                  <span className="text-cyan-400 capitalize">
                    {item.role}
                  </span>

                </div>

              ))}

            </div>

          </div>

          {/* Products */}

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

            <h2 className="text-2xl font-bold mb-6">
              Latest Products
            </h2>

            <div className="space-y-4">

              {products.slice(0, 5).map((item) => (

                <div
                  key={item._id}
                  className="flex justify-between items-center border-b border-slate-800 pb-3"
                >

                  <div>

                    <h3 className="font-semibold">
                      {item.name}
                    </h3>

                    <p className="text-sm text-gray-400">
                      ₹{item.price}
                    </p>

                  </div>

                  <span className="text-green-400">
                    Stock : {item.stock}
                  </span>

                </div>

              ))}

            </div>

          </div>

        </div>

      </div>

    </main>
  );
};

export default AdminDashboard;