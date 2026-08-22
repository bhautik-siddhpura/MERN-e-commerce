import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

const ProductCard = ({ product }) => {

  const dispatch = useDispatch();

  const handleAddToCart = () => {

    const item = {
      ...product,
      quantity: 1,
    };

    console.log("Dispatching:", item);

    dispatch(addToCart(item));

    // alert("Product added to cart!");
  };

  return (
    <div className="group bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 hover:border-cyan-500 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10">

      {/* Product Image */}
      <div className="relative overflow-hidden">

        <img
          src={product.imageURL}
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-105 transition duration-500"
        />

      </div>

      {/* Product Details */}
      <div className="p-5">

        <p className="text-cyan-400 text-sm uppercase tracking-wide">
          {product.category}
        </p>

        <h2 className="text-xl font-semibold text-white mt-2 line-clamp-1">
          {product.name}
        </h2>

        <p className="text-gray-400 text-sm mt-2 line-clamp-2">
          {product.description}
        </p>

        <div className="mt-4">
          <span className="text-3xl font-bold text-white">
            ₹{product.price}
          </span>
        </div>

        <div className="mt-2">
          {product.stock > 0 ? (
            <span className="text-green-400">
              In Stock ({product.stock})
            </span>
          ) : (
            <span className="text-red-500">
              Out of Stock
            </span>
          )}
        </div>

        <div className="flex gap-3 mt-6">

          <Link
            to={`/product/${product._id}`}
            className="flex-1 text-center bg-slate-800 hover:bg-slate-700 text-white py-3 rounded-lg transition"
          >
            View
          </Link>

          <button
            onClick={handleAddToCart}
            className="flex items-center justify-center gap-2 flex-1 bg-cyan-500 hover:bg-cyan-600 text-black font-semibold py-3 rounded-lg transition"
          >
            <FaShoppingCart />
            Add
          </button>

        </div>

      </div>

    </div>
  );
};

export default ProductCard;