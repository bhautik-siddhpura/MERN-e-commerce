import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../context/AuthContext";

import {
  FaBoxOpen,
  FaList,
  FaRupeeSign,
  FaWarehouse,
  FaFileAlt,
  FaImage,
} from "react-icons/fa";

const EditProduct = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);

  const [fetching, setFetching] = useState(true);

  const [name, setName] = useState("");

  const [category, setCategory] = useState("");

  const [price, setPrice] = useState("");

  const [stock, setStock] = useState("");

  const [description, setDescription] = useState("");

  // Existing image URL from database
  const [preview, setPreview] = useState("");

  // Newly selected image
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const res = await fetch(`/api/products/${id}`);

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Product not found.");
        navigate("/admin/products");
        return;
      }

      setName(data.name);

      setCategory(data.category);

      setPrice(data.price);

      setStock(data.stock);

      setDescription(data.description);

      setPreview(data.imageURL);

    } catch (error) {
      console.error(error);
      alert("Failed to load product.");
    } finally {
      setFetching(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImage(file);

    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !name ||
      !category ||
      !price ||
      !stock ||
      !description
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

      // Upload new image only if selected
      if (image) {
        formData.append("image", image);
      }

      const res = await fetch(`/api/products/${id}`, {
        method: "PUT",

        headers: {
          Authorization: `Bearer ${user.token}`,
        },

        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to update product.");
        return;
      }

      alert("Product updated successfully.");

      navigate("/admin/products");

    } catch (error) {
      console.error(error);

      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

    if (fetching) {
    return (
      <div className="min-h-screen bg-slate-950 flex justify-center items-center">
        <div className="w-14 h-14 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white py-10 px-6">

      <div className="max-w-6xl mx-auto">

        {/* Header */}

        <div className="mb-10">

          <h1 className="text-4xl font-bold">
            Edit Product
          </h1>

          <p className="text-gray-400 mt-2">
            Update your existing product information.
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="grid lg:grid-cols-3 gap-8"
        >

          {/* Left Section */}

          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-6">

            <h2 className="text-2xl font-semibold">
              Product Details
            </h2>

            {/* Product Name */}

            <div>

              <label className="flex items-center gap-2 mb-2 text-gray-300">

                <FaBoxOpen />

                Product Name

              </label>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter product name"
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
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Enter price"
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
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  placeholder="Available stock"
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
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter product description"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 resize-none outline-none focus:border-cyan-500"
              />

            </div>

          </div>

          {/* Right Section */}

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 h-fit">

            <h2 className="text-2xl font-semibold mb-6">
              Product Image
            </h2>

            <label
              htmlFor="imageUpload"
              className="cursor-pointer block"
            >

              <div className="h-72 border-2 border-dashed border-slate-700 rounded-2xl overflow-hidden flex justify-center items-center hover:border-cyan-500 transition">

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

                    <p>No Image Selected</p>

                  </div>

                )}

              </div>

            </label>

            <input
              id="imageUpload"
              type="file"
              accept="image/*"
              hidden
              onChange={handleImageChange}
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-8 bg-cyan-500 hover:bg-cyan-600 disabled:opacity-50 text-black font-bold py-4 rounded-xl transition-all duration-300"
            >

              {loading ? "Updating Product..." : "Update Product"}

            </button>

          </div>

        </form>

      </div>

    </main>
  );
};

export default EditProduct;