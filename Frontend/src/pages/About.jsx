import {
  FaShippingFast,
  FaShieldAlt,
  FaHeadset,
  FaCheckCircle,
} from "react-icons/fa";

const About = () => {
  return (
    <main className="min-h-screen bg-slate-950 text-white">

      {/* Hero */}
      <section className="bg-gradient-to-r from-slate-900 to-slate-800 py-24">

        <div className="max-w-7xl mx-auto px-6 text-center">

          <h1 className="text-5xl font-bold mb-6">
            About <span className="text-cyan-400">Morphix</span>
          </h1>

          <p className="text-gray-400 max-w-3xl mx-auto text-lg">
            Morphix is a premium online shopping platform built to provide
            customers with secure payments, lightning-fast delivery,
            exceptional customer support, and a seamless shopping experience.
          </p>

        </div>

      </section>

      {/* Our Story */}

      <section className="max-w-7xl mx-auto py-20 px-6">

        <div className="grid md:grid-cols-2 gap-16 items-center">

          <div>

            <h2 className="text-4xl font-bold mb-6">
              Our Story
            </h2>

            <p className="text-gray-400 leading-8">
              Morphix was created with one mission — to redefine online
              shopping by combining modern technology, trusted brands,
              premium products, and a customer-first experience.
            </p>

            <p className="text-gray-400 leading-8 mt-5">
              Whether you're buying electronics, fashion, home essentials,
              or lifestyle products, Morphix ensures quality,
              affordability, and speed.
            </p>

          </div>

          <div className="grid grid-cols-2 gap-6">

            <div className="bg-slate-900 rounded-2xl p-8 text-center">

              <FaShippingFast className="text-5xl text-cyan-400 mx-auto mb-4" />

              <h3 className="font-bold text-xl">
                Fast Delivery
              </h3>

            </div>

            <div className="bg-slate-900 rounded-2xl p-8 text-center">

              <FaShieldAlt className="text-5xl text-green-400 mx-auto mb-4" />

              <h3 className="font-bold text-xl">
                Secure Payment
              </h3>

            </div>

            <div className="bg-slate-900 rounded-2xl p-8 text-center">

              <FaHeadset className="text-5xl text-pink-400 mx-auto mb-4" />

              <h3 className="font-bold text-xl">
                24/7 Support
              </h3>

            </div>

            <div className="bg-slate-900 rounded-2xl p-8 text-center">

              <FaCheckCircle className="text-5xl text-yellow-400 mx-auto mb-4" />

              <h3 className="font-bold text-xl">
                Trusted Quality
              </h3>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
};

export default About;