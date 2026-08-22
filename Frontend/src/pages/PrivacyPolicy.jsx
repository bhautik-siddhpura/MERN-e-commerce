const PrivacyPolicy = () => {
  return (
    <main className="min-h-screen bg-slate-950 text-white py-20">

      <div className="max-w-5xl mx-auto px-6">

        <h1 className="text-5xl font-bold mb-10">
          Privacy Policy
        </h1>

        <div className="space-y-8 text-gray-400 leading-8">

          <section>

            <h2 className="text-2xl text-white font-bold mb-3">
              Information We Collect
            </h2>

            <p>
              We collect your basic account information, shipping details,
              payment information (processed securely through payment
              providers), and shopping activity to improve your experience.
            </p>

          </section>

          <section>

            <h2 className="text-2xl text-white font-bold mb-3">
              How We Use Your Information
            </h2>

            <p>
              Your information is used to process orders, provide customer
              support, improve services, personalize recommendations, and
              maintain account security.
            </p>

          </section>

          <section>

            <h2 className="text-2xl text-white font-bold mb-3">
              Data Security
            </h2>

            <p>
              Morphix uses modern security practices, encrypted payment
              gateways, and secure servers to protect your personal
              information.
            </p>

          </section>

        </div>

      </div>

    </main>
  );
};

export default PrivacyPolicy;