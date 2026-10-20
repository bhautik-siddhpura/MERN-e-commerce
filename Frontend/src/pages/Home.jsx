import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import heroImage from "../assets/electronics-hero.png";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");

        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await res.json();

        // Display all products instead of only the first 4
        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Scroll to Featured Products
  const handleShopNow = () => {
    document.getElementById("featured-products")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Hero Banner */}
<section
  className="relative flex min-h-[580px] items-center justify-center overflow-hidden bg-cover bg-center px-5 py-20 sm:min-h-[620px] md:min-h-[680px]"
  style={{
    backgroundImage: `url(${heroImage})`,
  }}
>
  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-slate-950/70"></div>

  {/* Gradient Overlay */}
  <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/50 to-slate-950/70"></div>

  {/* Hero Content */}
  <div className="relative z-10 mx-auto max-w-4xl text-center">

    {/* Small Badge */}
    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-300 backdrop-blur-sm">
      <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-400"></span>
      Your Next-Gen Shopping Destination
    </div>

    {/* Heading */}
    <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl md:text-7xl">
      Welcome to
      <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
        Morphix
      </span>
    </h1>

    {/* Description */}
    <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-gray-300 sm:text-lg sm:leading-8 md:text-xl">
      Discover premium electronics, innovative gadgets, and everyday
      essentials. Experience smarter shopping with quality products,
      secure payments, and reliable delivery.
    </p>

    {/* Buttons */}
    <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">

      <button
        type="button"
        onClick={() =>
          document
            .getElementById("featured-products")
            ?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            })
        }
        className="w-full rounded-xl bg-cyan-500 px-8 py-3.5 font-bold text-slate-950 shadow-lg shadow-cyan-500/20 transition duration-300 hover:-translate-y-1 hover:bg-cyan-400 sm:w-auto"
      >
        Shop Now →
      </button>

      <button
        type="button"
        onClick={() =>
          document
            .getElementById("featured-products")
            ?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            })
        }
        className="w-full rounded-xl border border-white/30 bg-white/10 px-8 py-3.5 font-semibold text-white backdrop-blur-sm transition duration-300 hover:border-cyan-400 hover:bg-white/20 sm:w-auto"
      >
        Explore Products
      </button>

    </div>

    {/* Trust Indicators */}
    <div className="mt-12 flex flex-wrap items-center justify-center gap-x-7 gap-y-4 text-sm text-gray-300">

      <div className="flex items-center gap-2">
        <span className="text-cyan-400">✓</span>
        Premium Products
      </div>

      <div className="flex items-center gap-2">
        <span className="text-cyan-400">✓</span>
        Secure Checkout
      </div>

      <div className="flex items-center gap-2">
        <span className="text-cyan-400">✓</span>
        Reliable Delivery
      </div>

    </div>

  </div>

  {/* Bottom Fade */}
  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950 to-transparent"></div>
</section>

      {/* Featured Products */}
      <section
        id="featured-products"
        className="mx-auto max-w-7xl scroll-mt-24 px-6 py-20"
      >
        <h2 className="mb-10 text-center text-4xl font-bold">
          Featured Products
        </h2>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-cyan-500 border-t-transparent"></div>
          </div>
        ) : products.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-lg text-gray-400">
              No products available right now.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default Home;