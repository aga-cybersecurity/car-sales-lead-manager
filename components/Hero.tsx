"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isTikTokBrowser, setIsTikTokBrowser] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();

    const isTikTok =
      userAgent.includes("tiktok") ||
      userAgent.includes("musical_ly");

    setIsTikTokBrowser(isTikTok);

    // TikTok gets the image + browser prompt.
    if (isTikTok) return;

    // Instagram and normal browsers keep the video.
    const video = videoRef.current;

    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    const tryPlayVideo = async () => {
      try {
        await video.play();
      } catch {
        // Browser blocked autoplay.
        // Poster image remains available.
      }
    };

    tryPlayVideo();

    const handleCanPlay = () => {
      tryPlayVideo();
    };

    const handleLoadedData = () => {
      tryPlayVideo();
    };

    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("loadeddata", handleLoadedData);

    return () => {
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("loadeddata", handleLoadedData);
    };
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-[100svh] w-full overflow-hidden bg-black"
    >
      {/* Background Image */}
      <img
        src="/images/dunia1.jpeg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 z-0 h-full w-full object-cover object-[center_40%]"
      />

      {/* Background Video */}
      {!isTikTokBrowser && (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/images/dunia1.jpeg"
          aria-hidden="true"
          className="absolute inset-0 z-0 h-full w-full object-cover object-[center_40%]"
        >
          <source
            src="/videos/Hero-mobile-optimized.mp4"
            type="video/mp4"
          />
        </video>
      )}

      {/* Luxury Overlay */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-black/85 via-black/55 to-black/35" />

      {/* Bottom Blend */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-48 bg-gradient-to-t from-black via-black/40 to-transparent" />

      {/* TikTok Browser Message */}
      {isTikTokBrowser && (
        <div className="absolute top-5 left-1/2 z-20 w-[calc(100%-40px)] max-w-md -translate-x-1/2">
          <div className="rounded-2xl border border-white/15 bg-black/70 px-5 py-4 text-center shadow-2xl backdrop-blur-md">
            <p className="text-sm font-medium text-white">
    
 </p>
            <p className="mt-3 text-xs text-yellow-500">
              Tap ••• in TikTok, then choose
              <span className="font-semibold">
                {" "}Open in Browser
              </span>
            </p>
          </div>
        </div>
      )}


      {/* Hero Content */}
      <div className="relative z-10 flex min-h-[100svh] items-center justify-center px-6 pt-20 text-center">
        <div className="max-w-4xl">

          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-5 text-xs uppercase tracking-[0.45em] text-yellow-500 md:text-sm"
          >
            Luxury Vehicle Consultant
          </motion.p>

          {/* Heading */}
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

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: 0.5,
              duration: 1,
            }}
            className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-gray-300 md:text-lg"
          >
            Personalized guidance for purchasing, leasing,
            factory orders, trade-ins, and luxury ownership
            with Dunia Arkoub.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.8,
              duration: 0.8,
            }}
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