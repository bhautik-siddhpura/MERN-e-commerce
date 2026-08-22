import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  removeFromCart,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
} from "../redux/cartSlice";

import {
  FaTrash,
  FaArrowLeft,
  FaShoppingBag,
  FaPlus,
  FaMinus,
} from "react-icons/fa";

const Cart = () => {
  const dispatch = useDispatch();

  const cartItems = useSelector(
    (state) => state.cart.cartItems
  );

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const totalItems = cartItems.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <main className="min-h-screen bg-slate-950 flex flex-col justify-center items-center text-white">

        <FaShoppingBag
          size={90}
          className="text-cyan-500 mb-6"
        />

        <h1 className="text-4xl font-bold">
          Your Cart is Empty
        </h1>

        <p className="text-gray-400 mt-4">
          Looks like you haven't added any products yet.
        </p>

        <Link
          to="/"
          className="mt-8 px-8 py-3 bg-cyan-500 hover:bg-cyan-600 rounded-xl text-black font-semibold transition"
        >
          Continue Shopping
        </Link>

      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">

      <div className="max-w-7xl mx-auto px-6 py-12">

        <div className="flex justify-between items-center mb-10">

          <div>

            <h1 className="text-5xl font-bold">
              Shopping Cart
            </h1>

            <p className="text-gray-400 mt-2">
              {totalItems} Item(s)
            </p>

          </div>

          <button
            onClick={() => dispatch(clearCart())}
            className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-xl transition"
          >
            Clear Cart
          </button>

        </div>

        <div className="grid lg:grid-cols-3 gap-10">

          {/* Cart Items */}

          <div className="lg:col-span-2 space-y-6">

            {cartItems.map((item) => (

              <div
                key={item._id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row gap-6"
              >

                <img
                  src={item.imageURL}
                  alt={item.name}
                  className="w-36 h-36 rounded-xl object-cover"
                />

                <div className="flex-1">

                  <h2 className="text-3xl font-semibold">
                    {item.name}
                  </h2>

                  <p className="text-cyan-400 text-xl mt-2">
                    ₹{item.price}
                  </p>

                  {/* Quantity */}

                  <div className="flex items-center gap-5 mt-6">

                    <span className="font-semibold">
                      Quantity
                    </span>

                    <div className="flex items-center bg-slate-800 rounded-lg overflow-hidden">

                      <button
                        onClick={() =>
                          dispatch(decreaseQuantity(item._id))
                        }
                        className="px-4 py-3 hover:bg-slate-700 transition"
                      >
                        <FaMinus />
                      </button>

                      <span className="px-6 font-bold">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          dispatch(increaseQuantity(item._id))
                        }
                        disabled={item.quantity >= item.stock}
                        className={`px-4 py-3 transition ${
                          item.quantity >= item.stock
                            ? "opacity-40 cursor-not-allowed"
                            : "hover:bg-slate-700"
                        }`}
                      >
                        <FaPlus />
                      </button>

                    </div>

                  </div>

                  <p className="mt-5 text-xl font-semibold">

                    Total :
                    <span className="text-cyan-400 ml-2">
                      ₹{item.price * item.quantity}
                    </span>

                  </p>

                </div>

                <button
                  onClick={() =>
                    dispatch(removeFromCart(item._id))
                  }
                  className="self-start bg-red-600 hover:bg-red-700 p-4 rounded-xl transition"
                >
                  <FaTrash />
                </button>

              </div>

            ))}

          </div>

          {/* Order Summary */}

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 sticky top-24 h-fit">

            <h2 className="text-3xl font-bold mb-8">
              Order Summary
            </h2>

            <div className="space-y-5">

              <div className="flex justify-between">

                <span>Total Items</span>

                <span>{totalItems}</span>

              </div>

              <div className="flex justify-between">

                <span>Subtotal</span>

                <span>₹{totalPrice}</span>

              </div>

              <div className="flex justify-between">

                <span>Shipping</span>

                <span className="text-green-400">
                  FREE
                </span>

              </div>

              <hr className="border-slate-700" />

              <div className="flex justify-between text-3xl font-bold">

                <span>Total</span>

                <span className="text-cyan-400">
                  ₹{totalPrice}
                </span>

              </div>

            </div>

            <Link
              to="/checkout"
              className="block w-full mt-8 bg-cyan-500 hover:bg-cyan-600 text-center text-black font-bold py-4 rounded-xl transition">
              Proceed To Checkout
            </Link>

            <Link
              to="/"
              className="flex justify-center items-center gap-3 mt-6 text-gray-400 hover:text-white transition"
            >

              <FaArrowLeft />

              Continue Shopping

            </Link>

          </div>

        </div>

      </div>

    </main>
  );
};

export default Cart;