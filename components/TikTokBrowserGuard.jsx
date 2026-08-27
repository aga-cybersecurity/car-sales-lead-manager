"use client";

import { useEffect, useState } from "react";

export default function TikTokBrowserGuard({ children }) {
  const [isTikTok, setIsTikTok] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

  const tikTok = true;

    setIsTikTok(tikTok);
    setChecked(true);
  }, []);

  if (!checked) {
    return null;
  }

  if (isTikTok) {
    const currentUrl = window.location.href;

    const openBrowser = () => {
      // Try to open the current page outside TikTok
      window.location.href = currentUrl;
    };

    return (
      <div className="fixed inset-0 z-[99999] flex min-h-screen items-center justify-center bg-black px-6 text-white">
        <div className="w-full max-w-md text-center">

          <div className="mb-8">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-white/20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 6H19.5V12M19 5L11 13"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 14.5V19C19 19.5523 18.5523 20 18 20H5C4.44772 20 4 19.5523 4 19V6C4 5.44772 4.44772 4 5 4H9.5"
                />
              </svg>
            </div>

            <h1 className="font-serif text-3xl font-light tracking-wide">
              Open in Your Browser
            </h1>

            <p className="mt-4 text-sm leading-6 text-white/60">
              For the best experience, please open this website in Safari
              or Chrome.
            </p>
          </div>

          <button
            onClick={openBrowser}
            className="w-full rounded-full bg-white px-6 py-4 text-sm font-medium tracking-wide text-black transition hover:bg-white/90"
          >
            Open in Safari / Chrome
          </button>

          <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5 text-left">
            <p className="text-sm font-medium text-white">
              If the button doesn't work:
            </p>

            <ol className="mt-3 space-y-2 text-sm leading-6 text-white/60">
              <li>1. Tap the ⋯ menu in the top-right corner.</li>
              <li>2. Select <span className="text-white">“Open in browser”</span>.</li>
              <li>3. The website will open in Safari or Chrome.</li>
            </ol>
          </div>

          <p className="mt-8 text-xs text-white/30">
            AGA CyberWorks
          </p>
        </div>
      </div>
    );
  }

  return children;
}