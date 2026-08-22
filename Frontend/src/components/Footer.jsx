import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaGithub,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#0F172A] text-gray-300 border-t border-gray-800 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-14">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <Link
              to="/"
              className="text-3xl font-extrabold text-white"
            >
              Morphix
            </Link>

            <p className="mt-4 text-gray-400 leading-7">
              Morphix is your trusted online shopping destination,
              offering premium products with secure payments,
              lightning-fast delivery, and an exceptional shopping experience.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-5">
              Quick Links
            </h2>

            <ul className="space-y-3">

              <li>
                <Link
                  to="/"
                  className="hover:text-cyan-400 transition"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/admin"
                  className="hover:text-cyan-400 transition"
                >
                  Admin
                </Link>
              </li>

              <li>
                <Link
                  to="/cart"
                  className="hover:text-cyan-400 transition"
                >
                  Cart
                </Link>
              </li>

              <li>
                <Link
                  to="/login"
                  className="hover:text-cyan-400 transition"
                >
                  Login
                </Link>
              </li>

            </ul>
          </div>

          {/* Customer */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-5">
              Customer Support
            </h2>

            <ul className="space-y-3">

              <li>
                <Link
                  to="/about"
                  className="hover:text-cyan-400 transition"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  className="hover:text-cyan-400 transition"
                >
                  Contact
                </Link>
              </li>

              <li>
                <Link
                  to="/privacy"
                  className="hover:text-cyan-400 transition"
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link
                  to="/terms"
                  className="hover:text-cyan-400 transition"
                >
                  Terms & Conditions
                </Link>
              </li>

            </ul>
          </div>

          {/* Contact */}
          <div>

            <h2 className="text-xl font-semibold text-white mb-5">
              Contact
            </h2>

            <div className="space-y-3 text-gray-400">

              <p>📧 support@morphix.com</p>

              <p>📞 +91 98765 43210</p>

              <p>📍 Gujarat, India</p>

            </div>

            <div className="flex items-center gap-4 mt-6">

              <a
                href="#"
                className="bg-gray-800 p-3 rounded-full hover:bg-blue-600 transition"
              >
                <FaFacebookF />
              </a>

              <a
                href="#"
                className="bg-gray-800 p-3 rounded-full hover:bg-pink-600 transition"
              >
                <FaInstagram />
              </a>

              <a
                href="#"
                className="bg-gray-800 p-3 rounded-full hover:bg-sky-600 transition"
              >
                <FaTwitter />
              </a>

              <a
                href="#"
                className="bg-gray-800 p-3 rounded-full hover:bg-blue-700 transition"
              >
                <FaLinkedinIn />
              </a>

              <a
                href="#"
                className="bg-gray-800 p-3 rounded-full hover:bg-gray-600 transition"
              >
                <FaGithub />
              </a>

            </div>

          </div>

        </div>

        {/* Bottom */}

        <div className="border-t border-gray-800 mt-12 pt-6 text-center text-gray-500">

          © {new Date().getFullYear()} Morphix. All Rights Reserved.

        </div>

      </div>
    </footer>
  );
};

export default Footer;