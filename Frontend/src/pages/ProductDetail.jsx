import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import {
  FaStar,
  FaShoppingCart,
  FaHeart,
  FaTruck,
  FaUndoAlt,
  FaShieldAlt,
} from "react-icons/fa";

const ProductDetail = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        const data = await res.json();

        setProduct(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        _id: product._id,
        name: product.name,
        imageURL: product.imageURL,
        price: product.price,
        stock: product.stock,
        quantity: 1,
      })
    );

    // alert("Product added to cart successfully!");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex justify-center items-center">
        <div className="w-14 h-14 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-slate-950 flex justify-center items-center text-white text-3xl">
        Product Not Found
      </div>
    );
  }

  return (
    <main className="bg-slate-950 min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-14">

          {/* Product Image */}

          <div>
            <div className="bg-slate-900 rounded-3xl overflow-hidden p-10 border border-slate-800">
              <img
                src={product.imageURL}
                alt={product.name}
                className="w-full h-[500px] object-contain hover:scale-110 transition duration-500"
              />
            </div>
          </div>

          {/* Product Details */}

          <div>

            <p className="text-cyan-400 uppercase tracking-widest">
              {product.category}
            </p>

            <h1 className="text-5xl font-bold mt-3">
              {product.name}
            </h1>

            <div className="flex items-center gap-3 mt-5">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>

              <span className="text-gray-400">
                (125 Reviews)
              </span>
            </div>

            <h2 className="text-5xl font-bold text-cyan-400 mt-8">
              ₹{product.price}
            </h2>

            <p className="mt-6 text-gray-400 leading-8">
              {product.description}
            </p>

            <div className="mt-8">
              <span
                className={`px-4 py-2 rounded-full ${
                  product.stock > 0
                    ? "bg-green-500/20 text-green-400"
                    : "bg-red-500/20 text-red-400"
                }`}
              >
                {product.stock > 0
                  ? `In Stock (${product.stock})`
                  : "Out of Stock"}
              </span>
            </div>

            {/* Buttons */}

            <div className="flex flex-wrap gap-5 mt-10">

              <button
                onClick={handleAddToCart}
                className="flex-1 bg-cyan-500 hover:bg-cyan-600 py-4 rounded-xl text-black font-bold flex justify-center items-center gap-3 transition"
              >
                <FaShoppingCart />
                Add To Cart
              </button>

              <button className="flex-1 bg-white text-black hover:bg-gray-200 py-4 rounded-xl font-bold transition">
                Buy Now
              </button>

              <button className="w-16 bg-slate-800 hover:bg-pink-600 rounded-xl flex justify-center items-center transition">
                <FaHeart size={22} />
              </button>

            </div>

            {/* Services */}

            <div className="mt-14 space-y-5">

              <div className="flex items-center gap-4">
                <FaTruck className="text-cyan-400" />
                <span>Free Delivery Across India</span>
              </div>

              <div className="flex items-center gap-4">
                <FaUndoAlt className="text-cyan-400" />
                <span>7 Days Easy Returns</span>
              </div>

              <div className="flex items-center gap-4">
                <FaShieldAlt className="text-cyan-400" />
                <span>100% Secure Payment</span>
              </div>

            </div>

          </div>

        </div>
      </div>
    </main>
  );
};

export default ProductDetail;