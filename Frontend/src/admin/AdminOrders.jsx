import React, { useContext, useEffect, useMemo, useState } from "react";
import AuthContext from "../context/AuthContext";

import {
  FaShoppingBag,
  FaSearch,
  FaFilter,
  FaBoxOpen,
  FaTruck,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";

const AdminOrders = () => {
  const { user } = useContext(AuthContext);

  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/orders", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to fetch orders.");
        return;
      }

      // Supports either array response or {orders: []}
      setOrders(data.orders || data);

    } catch (error) {
      console.error(error);
      alert("Something went wrong while loading orders.");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(`/api/orders/${id}/status`, {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },

        body: JSON.stringify({
          status,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to update order.");
        return;
      }

      fetchOrders();

    } catch (error) {
      console.error(error);
      alert("Unable to update order.");
    }
  };

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {

      const matchesSearch =
        order._id
          .toLowerCase()
          .includes(search.toLowerCase()) ||

        order.user?.name
          ?.toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" ||
        order.status === statusFilter;

      return matchesSearch && matchesStatus;

    });
  }, [orders, search, statusFilter]);

  const totalOrders = orders.length;

  const pendingOrders = orders.filter(
    (order) => order.status === "pending"
  ).length;

  const shippedOrders = orders.filter(
    (order) => order.status === "shipped"
  ).length;

  const deliveredOrders = orders.filter(
    (order) => order.status === "delivered"
  ).length;

  const totalRevenue = orders.reduce(
    (acc, order) => acc + order.totalAmount,
    0
  );
    if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex justify-center items-center">
        <div className="w-14 h-14 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white py-10 px-6">

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-10">

          <div>

            <h1 className="text-4xl font-bold flex items-center gap-3">
              <FaShoppingBag className="text-cyan-400" />
              Orders Management
            </h1>

            <p className="text-gray-400 mt-2">
              View and manage customer orders.
            </p>

          </div>

        </div>

        {/* Statistics */}

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 mb-10">

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center">
            <FaShoppingBag className="mx-auto text-cyan-400 text-3xl mb-3" />
            <h2 className="text-3xl font-bold">{totalOrders}</h2>
            <p className="text-gray-400 mt-2">Total Orders</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center">
            <FaClock className="mx-auto text-yellow-400 text-3xl mb-3" />
            <h2 className="text-3xl font-bold">{pendingOrders}</h2>
            <p className="text-gray-400 mt-2">Pending</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center">
            <FaTruck className="mx-auto text-blue-400 text-3xl mb-3" />
            <h2 className="text-3xl font-bold">{shippedOrders}</h2>
            <p className="text-gray-400 mt-2">Shipped</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center">
            <FaCheckCircle className="mx-auto text-green-400 text-3xl mb-3" />
            <h2 className="text-3xl font-bold">{deliveredOrders}</h2>
            <p className="text-gray-400 mt-2">Delivered</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center">
            <FaBoxOpen className="mx-auto text-purple-400 text-3xl mb-3" />
            <h2 className="text-3xl font-bold">
              ₹{totalRevenue.toLocaleString()}
            </h2>
            <p className="text-gray-400 mt-2">Revenue</p>
          </div>

        </div>

        {/* Search & Filter */}

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-8 flex flex-col md:flex-row gap-4">

          <div className="relative flex-1">

            <FaSearch className="absolute left-4 top-4 text-gray-500" />

            <input
              type="text"
              placeholder="Search Order ID or Customer..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-800 rounded-xl py-3 pl-12 pr-4 outline-none border border-slate-700 focus:border-cyan-500"
            />

          </div>

          <div className="relative">

            <FaFilter className="absolute left-4 top-4 text-gray-500" />

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-slate-800 rounded-xl py-3 pl-12 pr-8 border border-slate-700 outline-none focus:border-cyan-500"
            >
              <option>All</option>
              <option>pending</option>
              <option>shipped</option>
              <option>delivered</option>
            </select>

          </div>

        </div>

        {/* Orders Table */}

        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden">

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-slate-800">

                <tr>

                  <th className="p-4 text-left">Order ID</th>

                  <th className="p-4 text-left">Customer</th>

                  <th className="p-4 text-left">Amount</th>

                  <th className="p-4 text-left">Status</th>

                  <th className="p-4 text-left">Created</th>

                  <th className="p-4 text-center">Action</th>

                </tr>

              </thead>

              <tbody>

                {filteredOrders.length === 0 ? (

                  <tr>

                    <td
                      colSpan="6"
                      className="text-center py-16 text-gray-500"
                    >
                      No Orders Found
                    </td>

                  </tr>

                ) : (

                  filteredOrders.map((order) => (

                    <tr
                      key={order._id}
                      className="border-t border-slate-800 hover:bg-slate-800/50 transition"
                    >

                      <td className="p-4 font-mono text-sm">
                        {order._id.slice(-8)}
                      </td>

                      <td className="p-4">
                        <div className="font-semibold">
                          {order.user?.name}
                        </div>

                        <div className="text-gray-400 text-sm">
                          {order.user?.email}
                        </div>
                      </td>

                      <td className="p-4 font-semibold text-cyan-400">
                        ₹{order.totalAmount}
                      </td>

                      <td className="p-4">

                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold
                          ${
                            order.status === "pending"
                              ? "bg-yellow-500/20 text-yellow-400"
                              : order.status === "shipped"
                              ? "bg-blue-500/20 text-blue-400"
                              : "bg-green-500/20 text-green-400"
                          }`}
                        >
                          {order.status}
                        </span>

                      </td>

                      <td className="p-4 text-gray-400">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>

                      <td className="p-4">

                        <select
                          value={order.status}
                          onChange={(e) =>
                            updateStatus(order._id, e.target.value)
                          }
                          className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 outline-none"
                        >
                          <option value="pending">Pending</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                        </select>

                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </main>
  );
};

export default AdminOrders;