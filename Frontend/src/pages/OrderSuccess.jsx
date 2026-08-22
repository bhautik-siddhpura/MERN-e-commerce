import React from "react";
import { Link } from "react-router-dom";
import {
  FaCheckCircle,
  FaShoppingBag,
  FaClipboardList,
  FaArrowRight,
} from "react-icons/fa";

const OrderSuccess = () => {
  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center px-6 py-12">

      <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-10 text-center">

        {/* Success Icon */}

        <div className="flex justify-center">

          <div className="w-28 h-28 rounded-full bg-green-500/10 flex items-center justify-center">

            <FaCheckCircle
              size={70}
              className="text-green-400"
            />

          </div>

        </div>

        {/* Heading */}

        <h1 className="text-5xl font-bold text-white mt-8">
          Order Placed Successfully!
        </h1>

        <p className="text-gray-400 text-lg mt-5 leading-8">

          Thank you for shopping with

          <span className="text-cyan-400 font-semibold">
            {" "}Morphix
          </span>

          .

          <br />

          Your payment has been received successfully.

        </p>

        {/* Order Status */}

        <div className="mt-10 bg-slate-800 rounded-2xl p-6 border border-slate-700">

          <div className="flex items-center justify-between">

            <span className="text-gray-400">
              Order Status
            </span>

            <span className="text-green-400 font-semibold">
              Confirmed
            </span>

          </div>

          <div className="flex items-center justify-between mt-4">

            <span className="text-gray-400">
              Payment
            </span>

            <span className="text-green-400 font-semibold">
              Successful
            </span>

          </div>

          <div className="flex items-center justify-between mt-4">

            <span className="text-gray-400">
              Delivery
            </span>

            <span className="text-cyan-400 font-semibold">
              3 - 7 Business Days
            </span>

          </div>

        </div>

        {/* Message */}

        <div className="mt-8 text-gray-400 leading-7">

          A confirmation email has been sent to your registered email
          address.

          <br />

          You can track your order anytime from your account.

        </div>

        {/* Buttons */}

        <div className="grid md:grid-cols-2 gap-5 mt-10">

          <Link
            to="/orders"
            className="flex justify-center items-center gap-3 py-4 rounded-xl bg-slate-800 hover:bg-slate-700 transition font-semibold text-white"
          >
            <FaClipboardList />

            My Orders
          </Link>

          <Link
            to="/"
            className="flex justify-center items-center gap-3 py-4 rounded-xl bg-cyan-500 hover:bg-cyan-600 transition text-black font-bold"
          >
            <FaShoppingBag />

            Continue Shopping

            <FaArrowRight />
          </Link>

        </div>

      </div>

    </main>
  );
};

export default OrderSuccess;