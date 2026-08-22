import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

import {
  FaBoxOpen,
  FaTag,
  FaRupeeSign,
  FaWarehouse,
  FaList,
  FaImage,
  FaFileAlt,
} from "react-icons/fa";

const AddProduct = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");

  // Actual image file
  const [image, setImage] = useState(null);

  // Preview
  const [preview, setPreview] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImage(file);

    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("Please login first.");
      navigate("/login");
      return;
    }

    if (
      !name ||
      !category ||
      !price ||
      !stock ||
      !description ||
      !image
    ) {
      alert("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("name", name);
      formData.append("category", category);
      formData.append("price", price);
      formData.append("stock", stock);
      formData.append("description", description);

      // Must match upload.single("image")
      formData.append("image", image);

      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to add product.");
        return;
      }

      alert("Product added successfully.");

      navigate("/admin/products");
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };
    return (
    <main className="min-h-screen bg-slate-950 text-white py-10 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}

        <div className="mb-10">

          <h1 className="text-4xl font-bold">
            Add New Product
          </h1>

          <p className="text-gray-400 mt-2">
            Upload a new product to your Morphix store.
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="grid lg:grid-cols-3 gap-8"
        >

          {/* Left Section */}

          <div className="lg:col-span-2 bg-slate-900 rounded-3xl border border-slate-800 p-8 space-y-6">

            <h2 className="text-2xl font-semibold mb-4">
              Product Information
            </h2>

            {/* Product Name */}

            <div>

              <label className="flex items-center gap-2 mb-2 text-gray-300">

                <FaBoxOpen />

                Product Name

              </label>

              <input
                type="text"
                placeholder="Enter product name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 outline-none focus:border-cyan-500"
              />

            </div>

            {/* Category */}

            <div>

              <label className="flex items-center gap-2 mb-2 text-gray-300">

                <FaList />

                Category

              </label>

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 outline-none focus:border-cyan-500"
              >

                <option value="">Select Category</option>

                <option value="Mobiles">Mobiles</option>

                <option value="Laptops">Laptops</option>

                <option value="Wearables">Wearables</option>

                <option value="Audio">Audio</option>

                <option value="Accessories">Accessories</option>

                <option value="Gaming">Gaming</option>

                <option value="Cameras">Cameras</option>

                <option value="Home Appliances">Home Appliances</option>

              </select>

            </div>

            {/* Price & Stock */}

            <div className="grid md:grid-cols-2 gap-6">

              <div>

                <label className="flex items-center gap-2 mb-2 text-gray-300">

                  <FaRupeeSign />

                  Price

                </label>

                <input
                  type="number"
                  placeholder="Enter Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 outline-none focus:border-cyan-500"
                />

              </div>

              <div>

                <label className="flex items-center gap-2 mb-2 text-gray-300">

                  <FaWarehouse />

                  Stock

                </label>

                <input
                  type="number"
                  placeholder="Available Stock"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 outline-none focus:border-cyan-500"
                />

              </div>

            </div>

            {/* Description */}

            <div>

              <label className="flex items-center gap-2 mb-2 text-gray-300">

                <FaFileAlt />

                Description

              </label>

              <textarea
                rows={7}
                placeholder="Write detailed product description..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 outline-none resize-none focus:border-cyan-500"
              />

            </div>

          </div>

          {/* Right Section */}

          <div className="bg-slate-900 rounded-3xl border border-slate-800 p-8 h-fit">

            <h2 className="text-2xl font-semibold mb-6">
              Product Image
            </h2>

            <label
              htmlFor="imageUpload"
              className="cursor-pointer block"
            >

              <div className="h-72 border-2 border-dashed border-slate-700 rounded-2xl flex items-center justify-center overflow-hidden hover:border-cyan-500 transition">

                {preview ? (

                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-full object-contain"
                  />

                ) : (

                  <div className="text-center text-gray-500">

                    <FaImage
                      size={60}
                      className="mx-auto mb-4"
                    />

                    <p>Select Product Image</p>

                  </div>

                )}

              </div>

            </label>

            <input
              id="imageUpload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              hidden
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-8 bg-cyan-500 hover:bg-cyan-600 disabled:opacity-50 text-black font-bold py-4 rounded-xl transition-all duration-300"
            >

              {loading ? "Uploading..." : "Add Product"}

            </button>

          </div>

        </form>

      </div>
    </main>
  );
};

export default AddProduct;