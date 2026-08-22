const TermsConditions = () => {
  return (
    <main className="min-h-screen bg-slate-950 text-white py-20">

      <div className="max-w-5xl mx-auto px-6">

        <h1 className="text-5xl font-bold mb-10">
          Terms & Conditions
        </h1>

        <div className="space-y-8 text-gray-400 leading-8">

          <section>

            <h2 className="text-2xl text-white font-bold mb-3">
              Acceptance of Terms
            </h2>

            <p>
              By accessing and using Morphix, you agree to comply with these
              Terms & Conditions and all applicable laws.
            </p>

          </section>

          <section>

            <h2 className="text-2xl text-white font-bold mb-3">
              Orders & Payments
            </h2>

            <p>
              Orders are confirmed only after successful payment verification.
              Morphix reserves the right to cancel fraudulent or suspicious
              transactions.
            </p>

          </section>

          <section>

            <h2 className="text-2xl text-white font-bold mb-3">
              Returns & Refunds
            </h2>

            <p>
              Eligible products can be returned within the specified return
              period according to our Return Policy. Refunds are processed to
              the original payment method after verification.
            </p>

          </section>

        </div>

      </div>

    </main>
  );
};

export default TermsConditions;