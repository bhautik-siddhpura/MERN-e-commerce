import React, { useContext, useEffect, useMemo, useState } from "react";
import AuthContext from "../context/AuthContext";

import {
  FaUsers,
  FaUserShield,
  FaUser,
  FaSearch,
} from "react-icons/fa";

const AdminUsers = () => {
  const { user } = useContext(AuthContext);

  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch All Users
  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/auth/users", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to fetch users.");
        return;
      }

      // Supports both:
      // { users: [...] }
      // [...]
      setUsers(data.users || data);

    } catch (error) {
      console.error(error);
      alert("Something went wrong while loading users.");
    } finally {
      setLoading(false);
    }
  };

  // Search Users
  const filteredUsers = useMemo(() => {
    return users.filter((item) => {

      const keyword = search.toLowerCase();

      return (
        item.name?.toLowerCase().includes(keyword) ||
        item.email?.toLowerCase().includes(keyword)
      );
    });

  }, [users, search]);

  // Statistics

  const totalUsers = users.length;

  const totalAdmins = users.filter(
    (item) => item.role === "admin"
  ).length;

  const normalUsers = users.filter(
    (item) => item.role !== "admin"
  ).length;

  // New users registered in last 30 days
  const newUsers = users.filter((item) => {

    if (!item.createdAt) return false;

    const createdDate = new Date(item.createdAt);

    const thirtyDaysAgo = new Date();

    thirtyDaysAgo.setDate(
      thirtyDaysAgo.getDate() - 30
    );

    return createdDate >= thirtyDaysAgo;

  }).length;
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

        <div className="mb-10">

          <h1 className="text-4xl font-bold flex items-center gap-3">
            <FaUsers className="text-cyan-400" />
            User Management
          </h1>

          <p className="text-gray-400 mt-2">
            View and manage all registered users.
          </p>

        </div>

        {/* Statistics */}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center">

            <FaUsers className="mx-auto text-cyan-400 text-3xl mb-3" />

            <h2 className="text-3xl font-bold">
              {totalUsers}
            </h2>

            <p className="text-gray-400 mt-2">
              Total Users
            </p>

          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center">

            <FaUserShield className="mx-auto text-yellow-400 text-3xl mb-3" />

            <h2 className="text-3xl font-bold">
              {totalAdmins}
            </h2>

            <p className="text-gray-400 mt-2">
              Admins
            </p>

          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center">

            <FaUser className="mx-auto text-green-400 text-3xl mb-3" />

            <h2 className="text-3xl font-bold">
              {normalUsers}
            </h2>

            <p className="text-gray-400 mt-2">
              Normal Users
            </p>

          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center">

            <FaUsers className="mx-auto text-purple-400 text-3xl mb-3" />

            <h2 className="text-3xl font-bold">
              {newUsers}
            </h2>

            <p className="text-gray-400 mt-2">
              New (30 Days)
            </p>

          </div>

        </div>

        {/* Search */}

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-8">

          <div className="relative">

            <FaSearch className="absolute left-4 top-4 text-gray-500" />

            <input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-cyan-500"
            />

          </div>

        </div>

        {/* Users Table */}

        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden">

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-slate-800">

                <tr>

                  <th className="text-left p-4">
                    Name
                  </th>

                  <th className="text-left p-4">
                    Email
                  </th>

                  <th className="text-left p-4">
                    Role
                  </th>

                  <th className="text-left p-4">
                    Joined
                  </th>

                </tr>

              </thead>

              <tbody>

                {filteredUsers.length === 0 ? (

                  <tr>

                    <td
                      colSpan="4"
                      className="text-center py-16 text-gray-500"
                    >
                      No Users Found
                    </td>

                  </tr>

                ) : (

                  filteredUsers.map((item) => (

                    <tr
                      key={item._id}
                      className="border-t border-slate-800 hover:bg-slate-800/50 transition"
                    >

                      <td className="p-4">

                        <div className="font-semibold">
                          {item.name}
                        </div>

                      </td>

                      <td className="p-4 text-gray-400">
                        {item.email}
                      </td>

                      <td className="p-4">

                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold
                          ${
                            item.role === "admin"
                              ? "bg-yellow-500/20 text-yellow-400"
                              : "bg-cyan-500/20 text-cyan-400"
                          }`}
                        >
                          {item.role}
                        </span>

                      </td>

                      <td className="p-4 text-gray-400">

                        {item.createdAt
                          ? new Date(item.createdAt).toLocaleDateString()
                          : "N/A"}

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

export default AdminUsers;