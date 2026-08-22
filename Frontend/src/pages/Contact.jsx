import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Contact = () => {
  return (
    <main className="min-h-screen bg-slate-950 text-white">

      <section className="py-20">

        <div className="max-w-6xl mx-auto px-6">

          <h1 className="text-5xl font-bold text-center mb-14">
            Contact Us
          </h1>

          <div className="grid lg:grid-cols-2 gap-10">

            <div className="bg-slate-900 p-10 rounded-2xl">

              <h2 className="text-3xl font-bold mb-8">
                Send us a Message
              </h2>

              <form className="space-y-6">

                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full p-4 rounded-xl bg-slate-800 outline-none"
                />

                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full p-4 rounded-xl bg-slate-800 outline-none"
                />

                <textarea
                  rows="6"
                  placeholder="Your Message"
                  className="w-full p-4 rounded-xl bg-slate-800 outline-none"
                ></textarea>

                <button className="w-full py-4 rounded-xl bg-cyan-500 hover:bg-cyan-600 font-semibold">
                  Send Message
                </button>

              </form>

            </div>

            <div className="space-y-8">

              <div className="bg-slate-900 p-8 rounded-2xl flex gap-5">

                <FaEnvelope className="text-cyan-400 text-3xl" />

                <div>

                  <h3 className="font-bold">Email</h3>

                  <p className="text-gray-400">
                    support@morphix.com
                  </p>

                </div>

              </div>

              <div className="bg-slate-900 p-8 rounded-2xl flex gap-5">

                <FaPhoneAlt className="text-pink-500 text-3xl" />

                <div>

                  <h3 className="font-bold">
                    Phone
                  </h3>

                  <p className="text-gray-400">
                    +91 98765 43210
                  </p>

                </div>

              </div>

              <div className="bg-slate-900 p-8 rounded-2xl flex gap-5">

                <FaMapMarkerAlt className="text-green-400 text-3xl" />

                <div>

                  <h3 className="font-bold">
                    Address
                  </h3>

                  <p className="text-gray-400">
                    Ahmedabad, Gujarat, India
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
};

export default Contact;