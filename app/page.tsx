import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />

      {/* CONSULTATION CTA */}
      <section className="bg-zinc-950 px-6 py-24 text-white">
        <div className="mx-auto max-w-5xl text-center">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-yellow-500">
            Personalized Luxury Experience
          </p>

          <h2 className="mb-6 text-4xl font-semibold md:text-5xl">
            Let’s Find Your Perfect Vehicle
          </h2>

          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-gray-400">
            Looking for your next vehicle, considering a trade-in, or
            interested in a factory order? Tell Dunia what you’re looking
            for and she’ll help guide you through the process.
          </p>

          <a
            href="/consultation"
            className="inline-flex items-center justify-center rounded-xl bg-yellow-600 px-8 py-4 font-semibold text-black transition hover:bg-yellow-500"
          >
            Start Your Consultation
          </a>
        </div>
      </section>

      <Contact />
      <Footer />
    </main>
  );
}