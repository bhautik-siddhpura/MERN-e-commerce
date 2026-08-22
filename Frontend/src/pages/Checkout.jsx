import React, { useState, useContext , useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import  AuthContext  from '../context/AuthContext';
import { clearCart } from '../redux/cartSlice';
import img from '../assets/logo.png'

import {
  FaMapMarkerAlt,
  FaShoppingBag,
  FaCreditCard,
  FaLock,
  FaTruck,
  FaShieldAlt,
  FaCheckCircle,
  FaArrowRight,
  FaBoxOpen,
} from "react-icons/fa";

const Checkout = () => {
  const { user } = useContext(AuthContext);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

const [address, setAddress] = useState({
  fullName: user?.name || "",
  street: "",
  city: "",
  postalCode: "",
  country: "India",
});
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const totalItems = cartItems.reduce(
  (acc, item) => acc + item.quantity,
  0
);

const gst = Math.round(totalPrice * 0.18);
const shipping = totalPrice > 0 ? 0 : 0;
const grandTotal = totalPrice + gst + shipping;


   useEffect(() => {
  // Only run when Checkout page first loads
  if (cartItems.length === 0) {
    navigate("/cart", { replace: true });
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

    const handlePayment = async () => {
    try {
        // Create Razorpay Order
        const orderRes = await fetch("/api/payment/order", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            amount: grandTotal,
        }),
        });

        const orderData = await orderRes.json();

        if (!orderRes.ok) {
        alert(orderData.message || "Failed to create payment order.");
        return;
        }

        // Check Razorpay SDK
        if (!window.Razorpay) {
        alert("Razorpay SDK is not loaded.");
        return;
        }

        const options = {
  key: import.meta.env.VITE_RAZORPAY_KEY_ID,

  amount: orderData.amount,

  currency: orderData.currency,

  name: "Morphix",

  description: "Order Payment",

  imageURL: img,

  order_id: orderData.id,

  prefill: {
    name: address.fullName,
    email: user?.email || "",
  },

  theme: {
    color: "#06b6d4",
  },


        handler: async (response) => {
            try {
            // Verify Payment
            const verifyRes = await fetch("/api/payment/verify", {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(response),
            });

            if (!verifyRes.ok) {
                alert("Payment verification failed.");
                return;
            }

            console.log({

                items: cartItems,

                totalAmount: grandTotal,

                address,

                paymentId: response.razorpay_payment_id

                });

            // Save Order
            const saveOrderRes = await fetch("/api/orders", {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
                },
                body: JSON.stringify({
                items: cartItems,
                totalAmount: totalPrice,
                address,
                paymentId: response.razorpay_payment_id,
                }),
            });

            const saveData = await saveOrderRes.json();

            if (!saveOrderRes.ok) {
                alert(saveData.message || "Failed to save order.");
                return;
            }

            dispatch(clearCart());

            console.log("Going to Order Success Page...");
            navigate("/ordersuccess");
            console.log("Navigate executed");

            } catch (error) {
            console.error(error);
            alert("Something went wrong while saving your order.");
            }
        },
      };

        const razorpay = new window.Razorpay(options);

        razorpay.on("payment.failed", function (response) {
        alert(response.error.description);
        console.error(response.error);
        });

        razorpay.open();
    } catch (error) {
        console.error(error);
        alert("Something went wrong while initiating payment.");
    }
    };

  
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user) {
        alert("Please login first.");
        navigate("/login");
        return;
    }

    if (
        !address.fullName ||
        !address.street ||
        !address.city ||
        !address.postalCode ||
        !address.country
    ) {
        alert("Please fill all shipping details.");
        return;
    }

    handlePayment();
    };

  return (
  <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white py-12 px-6">

    <div className="max-w-7xl mx-auto">

      {/* Heading */}

      <div className="text-center mb-14">

        <h1 className="text-5xl font-bold">
          Secure Checkout
        </h1>

        <p className="text-gray-400 mt-3 text-lg">
          Complete your order securely with encrypted payment.
        </p>

      </div>

      <div className="grid lg:grid-cols-3 gap-10">

        {/* ================= LEFT ================= */}

        <form
          onSubmit={handleSubmit}
          className="lg:col-span-2 bg-slate-900/70 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl"
        >

          <div className="flex items-center gap-3 mb-8">

            <FaMapMarkerAlt className="text-cyan-400 text-2xl" />

            <h2 className="text-3xl font-bold">
              Shipping Address
            </h2>

          </div>

          <div className="space-y-5">

            <input
              type="text"
              placeholder="Full Name"
              required
              value={address.fullName}
              onChange={(e) =>
                setAddress({ ...address, fullName: e.target.value })
              }
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 outline-none focus:border-cyan-500"
            />

            <input
              type="text"
              placeholder="Street Address"
              required
              value={address.street}
              onChange={(e) =>
                setAddress({ ...address, street: e.target.value })
              }
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 outline-none focus:border-cyan-500"
            />

            <div className="grid md:grid-cols-2 gap-5">

              <input
                type="text"
                placeholder="City"
                required
                value={address.city}
                onChange={(e) =>
                  setAddress({ ...address, city: e.target.value })
                }
                className="bg-slate-800 border border-slate-700 rounded-xl p-4 outline-none focus:border-cyan-500"
              />

              <input
                type="text"
                placeholder="Postal Code"
                required
                value={address.postalCode}
                onChange={(e) =>
                  setAddress({
                    ...address,
                    postalCode: e.target.value,
                  })
                }
                className="bg-slate-800 border border-slate-700 rounded-xl p-4 outline-none focus:border-cyan-500"
              />

            </div>

            <input
              type="text"
              placeholder="Country"
              required
              value={address.country}
              onChange={(e) =>
                setAddress({ ...address, country: e.target.value })
              }
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 outline-none focus:border-cyan-500"
            />

          </div>

          {/* Trust Badges */}

          <div className="grid md:grid-cols-3 gap-4 mt-10">

            <div className="bg-slate-800 rounded-xl p-4 text-center">

              <FaTruck className="mx-auto text-cyan-400 text-3xl mb-2" />

              <p className="font-semibold">
                Free Delivery
              </p>

            </div>

            <div className="bg-slate-800 rounded-xl p-4 text-center">

              <FaShieldAlt className="mx-auto text-green-400 text-3xl mb-2" />

              <p className="font-semibold">
                Secure Payment
              </p>

            </div>

            <div className="bg-slate-800 rounded-xl p-4 text-center">

              <FaCheckCircle className="mx-auto text-yellow-400 text-3xl mb-2" />

              <p className="font-semibold">
                Easy Returns
              </p>

            </div>

          </div>

        </form>

        {/* ================= RIGHT ================= */}

        <div className="bg-slate-900/70 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 h-fit sticky top-24 shadow-2xl">

          <div className="flex items-center gap-3 mb-8">

            <FaShoppingBag className="text-cyan-400 text-2xl" />

            <h2 className="text-3xl font-bold">
              Order Summary
            </h2>

          </div>

          <div className="space-y-6">

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
              <span className="text-green-400">FREE</span>
            </div>

            <div className="flex justify-between">
              <span>GST (18%)</span>
              <span>₹{gst}</span>
            </div>

            <hr className="border-slate-700" />

            <div className="flex justify-between text-3xl font-bold">

              <span>Total</span>

              <span className="text-cyan-400">
                ₹{grandTotal}
              </span>

            </div>

          </div>

          <button
            onClick={handleSubmit}
            className="mt-8 w-full bg-cyan-500 hover:bg-cyan-600 py-4 rounded-xl text-black font-bold flex items-center justify-center gap-3 transition-all hover:scale-[1.02]"
          >

            <FaCreditCard />

            Proceed To Payment

            <FaArrowRight />

          </button>

          {/* Secure */}

          <div className="mt-8 border-t border-slate-700 pt-6 space-y-4 text-sm">

            <div className="flex items-center gap-3">

              <FaLock className="text-green-400" />

              <span>256-bit SSL Encrypted Checkout</span>

            </div>

            <div className="flex items-center gap-3">

              <FaShieldAlt className="text-cyan-400" />

              <span>Payments secured by Razorpay</span>

            </div>

            <div className="flex items-center gap-3">

              <FaBoxOpen className="text-yellow-400" />

              <span>Estimated Delivery: 3-5 Business Days</span>

            </div>

          </div>

        </div>

      </div>

    </div>

  </main>
);
};

export default Checkout;