import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSearch,
  FaSyncAlt,
  FaBoxOpen,
} from "react-icons/fa";

const AdminProducts = () => {
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  /* ===========================
          States
  =========================== */

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  /* ===========================
        Authentication
  =========================== */

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (user.role !== "admin") {
      navigate("/");
      return;
    }

    fetchProducts();
  }, []);

  /* ===========================
        Fetch Products
  =========================== */

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/products");

      const data = await res.json();

      if (res.ok) {
        setProducts(data);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  /* ===========================
        Delete Product
  =========================== */

  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        alert("Product deleted successfully.");

        fetchProducts();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }
  };

  /* ===========================
        Search Filter
  =========================== */

  const filteredProducts = products.filter((product) => {
    const keyword = search.toLowerCase();

    return (
      product.name.toLowerCase().includes(keyword) ||
      product.category.toLowerCase().includes(keyword)
    );
  });

  /* ===========================
        Loading Screen
  =========================== */

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-950 flex justify-center items-center">

        <div className="text-center">

          <div className="w-14 h-14 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto"></div>

          <p className="mt-5 text-gray-400">
            Loading Products...
          </p>

        </div>

      </main>
    );
  }
    return (
    <main className="min-h-screen bg-slate-950 text-white">

      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* ===========================
                Header
        =========================== */}

        <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-6 mb-10">

          <div>

            <h1 className="text-5xl font-bold">
              Manage Products
            </h1>

            <p className="text-gray-400 mt-2">
              Total Products : {filteredProducts.length}
            </p>

          </div>

          <div className="flex flex-wrap gap-4">

            {/* Search */}

            <div className="relative">

              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                type="text"
                placeholder="Search Product..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-slate-900 border border-slate-800 rounded-xl pl-12 pr-5 py-3 outline-none focus:border-cyan-500 w-72"
              />

            </div>

            {/* Refresh */}

            <button
              onClick={fetchProducts}
              className="bg-slate-900 hover:bg-slate-800 border border-slate-800 px-5 py-3 rounded-xl flex items-center gap-2 transition"
            >
              <FaSyncAlt />
              Refresh
            </button>

            {/* Add Product */}

            <Link
              to="/admin/add-product"
              className="bg-cyan-500 hover:bg-cyan-600 text-black font-semibold px-6 py-3 rounded-xl flex items-center gap-2 transition"
            >
              <FaPlus />
              Add Product
            </Link>

          </div>

        </div>

        {/* ===========================
              Product Table
        =========================== */}

        <div className="overflow-x-auto bg-slate-900 border border-slate-800 rounded-2xl">

          <table className="w-full">

            <thead className="bg-slate-800">

              <tr>

                <th className="text-left p-5">Image</th>

                <th className="text-left p-5">Product</th>

                <th className="text-left p-5">Category</th>

                <th className="text-left p-5">Price</th>

                <th className="text-left p-5">Stock</th>

                <th className="text-center p-5">Actions</th>

              </tr>

            </thead>

            <tbody>

              {filteredProducts.length === 0 ? (

                <tr>

                  <td
                    colSpan="6"
                    className="text-center py-20"
                  >

                    <FaBoxOpen
                      size={60}
                      className="mx-auto text-gray-500 mb-5"
                    />

                    <h2 className="text-2xl font-bold">
                      No Products Found
                    </h2>

                    <p className="text-gray-400 mt-2">
                      Try another search keyword.
                    </p>

                  </td>

                </tr>

              ) : (

                filteredProducts.map((product) => (

                  <tr
                    key={product._id}
                    className="border-t border-slate-800 hover:bg-slate-800 transition"
                  >

                    {/* Image */}

                    <td className="p-5">

                      {product.imageURL ? (
                        <img
                            src={product.imageURL}
                            alt={product.name}
                            className="w-20 h-20 object-cover rounded-xl"
                        />
                    ) : (
                        <div className="w-20 h-20 rounded-xl bg-slate-800 flex items-center justify-center text-gray-500 text-xs">
                            No Image
                        </div>
                    )}

                    </td>

                    {/* Name */}

                    <td className="p-5">

                      <h3 className="font-semibold text-lg">
                        {product.name}
                      </h3>

                    </td>

                    {/* Category */}

                    <td className="p-5">

                      <span className="text-cyan-400">
                        {product.category}
                      </span>

                    </td>

                    {/* Price */}

                    <td className="p-5 font-semibold">
                      ₹{product.price}
                    </td>

                    {/* Stock */}

                    <td className="p-5">

                      {product.stock > 0 ? (

                        <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full">

                          {product.stock}

                        </span>

                      ) : (

                        <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full">

                          Out of Stock

                        </span>

                      )}

                    </td>

                    {/* Actions */}

                    <td className="p-5">

                      <div className="flex justify-center gap-3">

                        <Link
                          to={`/admin/edit-product/${product._id}`}
                          className="bg-yellow-500 hover:bg-yellow-600 p-3 rounded-xl transition"
                        >
                          <FaEdit />
                        </Link>

                        <button
                          onClick={() => deleteProduct(product._id)}
                          className="bg-red-600 hover:bg-red-700 p-3 rounded-xl transition"
                        >
                          <FaTrash />
                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

    </main>
  );
};

export default AdminProducts;