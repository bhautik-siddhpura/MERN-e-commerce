import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";

import Login from "./pages/Login";
import Register from "./pages/Register";

import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import Profile from "./pages/Profile";


import AdminDashboard from "./admin/AdminDashboard";
import AddProduct from "./admin/AddProduct";
import AdminProducts from "./admin/AdminProducts";
import EditProduct from "./admin/EditProduct";
import AdminOrders from "./admin/AdminOrders";
import AdminUsers from "./admin/AdminUsers";

import About from "./pages/About";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950">

      <Navbar />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/ordersuccess" element={<OrderSuccess />} />
          <Route path="/profile" element={<Profile />} />

                    
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/add-product" element={<AddProduct />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/edit-product/:id" element={<EditProduct />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/users" element={<AdminUsers />} />

          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsConditions />} />
        </Routes>
      </main>

      <Footer />

    </div>
  );
}

export default App;