export default function Vehicles() {
  return (
    <section className="bg-zinc-950 text-white py-24 px-6">
      <div className="max-w-4xl mx-auto text-center">

        <p className="uppercase tracking-[0.4em] text-sm text-yellow-500 mb-5">
          Your Next Vehicle Awaits
        </p>

        <h2 className="text-4xl md:text-5xl font-semibold">
          Explore the Collection
        </h2>

        <p className="mt-6 text-gray-300 text-lg leading-relaxed">
          Browse the latest selection of luxury vehicles available through
          Land Rover Novi. Once you find a vehicle that catches your eye,
          let Dunia know — she will personally guide you through the next
          steps and create a seamless buying experience.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">

          <a
            href="https://www.landrovernovi.com/"
            target="_blank"
            className="bg-yellow-600 hover:bg-yellow-700 px-8 py-4 rounded-full font-medium transition"
          >
            Browse Available Vehicles
          </a>

          <button className="border border-white/40 hover:bg-white hover:text-black px-8 py-4 rounded-full transition">
            Tell Dunia What Caught Your Eye
          </button>

        </div>

      </div>
    </section>
  );
}