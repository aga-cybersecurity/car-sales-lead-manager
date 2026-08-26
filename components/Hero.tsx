"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[100svh] w-full overflow-hidden bg-black"
    >
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/images/dunia1.jpeg"
        className="absolute inset-0 z-0 h-full w-full object-cover object-[center_40%]"
      >
        <source
          src="/videos/Hero-mobile-optimized.mp4"
          type="video/mp4"
        />
      </video>

      {/* Luxury Overlay */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-black/85 via-black/55 to-black/35" />

      {/* Bottom Blend */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-48 bg-gradient-to-t from-black via-black/40 to-transparent" />

      {/* Hero Content */}
      <div className="relative z-10 flex min-h-[100svh] items-center justify-center px-6 pt-20 text-center">
        <div className="max-w-4xl">

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-5 text-xs uppercase tracking-[0.45em] text-yellow-500 md:text-sm"
          >
            Luxury Vehicle Consultant
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="font-luxury text-4xl font-light leading-[1.12] text-white md:text-6xl lg:text-7xl"
          >
            Your Personal Guide
            <br />
            To Finding The
            <br />
            Perfect Vehicle
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-gray-300 md:text-lg"
          >
            Personalized guidance for purchasing, leasing,
            factory orders, trade-ins, and luxury ownership
            with Dunia Arkoub.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-9 flex flex-wrap justify-center gap-4"
          >
            <a
              href="#consultation"
              className="rounded-full bg-yellow-600 px-8 py-4 font-semibold text-black transition hover:bg-yellow-500"
            >
              Schedule Consultation
            </a>

            <a
              href="https://www.landrovernovi.com/new-inventory/index.htm"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/30 px-8 py-4 text-white transition hover:bg-white/10"
            >
              Browse Inventory
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
}