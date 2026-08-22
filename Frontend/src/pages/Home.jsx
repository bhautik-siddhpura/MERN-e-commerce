import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";
const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        // const res = await fetch("http://localhost:5000/api/products");
        const data = await res.json();

        // Display only first 4 products
        setProducts(data.slice(0, 4));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-white">

      {/* Hero Banner */}
      <section className="flex flex-col items-center justify-center text-center h-[65vh] px-6 bg-gradient-to-b from-slate-900 to-slate-950">

        <h1 className="text-5xl md:text-7xl font-bold">
          Welcome to
          <span className="text-cyan-400"> Morphix</span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-gray-400">
          Discover premium electronics, fashion, accessories and more at
          unbeatable prices with secure shopping and lightning-fast delivery.
        </p>
        <button className="mt-8 px-8 py-3 bg-cyan-500 hover:bg-cyan-600 rounded-xl font-semibold transition">
          Shop Now
        </button>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-6 py-20">

        <h2 className="text-4xl font-bold mb-10 text-center">
          Featured Products
        </h2>

        {loading ? (
          <div className="flex justify-center items-center py-16">

            <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>

          </div>
        ) : (
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">

            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
              />
            ))}

          </div>
        )}

      </section>

    </main>
  );
};

export default Home;