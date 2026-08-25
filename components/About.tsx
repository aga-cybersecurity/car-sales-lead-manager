export default function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-black px-6 py-28 text-white md:py-36"
    >
      {/* Background Accent */}
      <div className="absolute left-0 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-yellow-600/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-16 md:grid-cols-2 md:gap-20">

        {/* Image */}
     <div className="relative">
  <div className="absolute -inset-4 rounded-3xl border border-yellow-600/10" />

  <div className="absolute -bottom-6 -left-6 h-32 w-32 rounded-full bg-yellow-600/10 blur-3xl" />

  <div className="relative grid grid-cols-2 gap-3">
    <img
      src="/images/dunia1.jpeg"
      alt="Dunia Arkoub"
      className="h-[280px] w-full rounded-2xl object-cover shadow-2xl"
    />

    <img
      src="/images/dunia2.JPG"
      alt="Dunia Arkoub"
      className="h-[280px] w-full rounded-2xl object-cover shadow-2xl"
    />

    <img
      src="/images/dunia3.jpeg"
      alt="Dunia Arkoub"
      className="col-span-2 h-[320px] w-full rounded-2xl object-cover shadow-2xl"
    />
  </div>
</div>

        {/* Text */}
        <div className="max-w-xl">

          <p className="mb-6 text-xs uppercase tracking-[0.45em] text-yellow-500 md:text-sm">
            About Dunia
          </p>

          <h2 className="font-luxury text-4xl font-light leading-tight md:text-5xl lg:text-6xl">
            A Luxury Vehicle Experience
            <span className="block text-gray-400">
              Built Around You
            </span>
          </h2>

          <div className="mt-8 h-px w-20 bg-yellow-600" />

          <p className="mt-8 text-lg leading-relaxed text-gray-300">
            Finding the right vehicle should be more than a transaction.
            It should feel personal, effortless, and tailored to you.
          </p>

          <p className="mt-5 text-lg leading-relaxed text-gray-400">
            Dunia Arkoub takes the time to understand your lifestyle,
            preferences, and goals before guiding you toward the vehicle
            that fits your needs. From purchasing and leasing to factory
            orders and trade-ins, every detail is handled with a
            personalized approach.
          </p>

          {/* Signature-style closing */}
          <div className="mt-10">
            <p className="text-sm uppercase tracking-[0.3em] text-gray-500">
              Your vehicle. Your experience.
            </p>

            <p className="mt-2 text-lg font-light text-white">
              — Dunia Arkoub
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}