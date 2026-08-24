"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    setErrorMessage("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMessage(error.message);
      setLoading(false);
      return;
    }

    router.replace("/dashboard");
    router.refresh();
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-6 text-white">
      <div className="w-full max-w-md">

        {/* LOGO / TITLE */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold tracking-tight">
            Dunia Arkoub
          </h1>

          <p className="mt-3 text-sm text-gray-400">
            Client Lead Management
          </p>
        </div>

        {/* LOGIN CARD */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8 shadow-2xl">

          <div className="mb-8">
            <h2 className="text-2xl font-semibold">
              Welcome Back
            </h2>

            <p className="mt-2 text-sm text-gray-400">
              Sign in to access your lead dashboard.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">

            {/* EMAIL */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-300"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-yellow-600"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-gray-300"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-yellow-600"
              />
            </div>

            {/* ERROR */}
            {errorMessage && (
              <div className="rounded-xl border border-red-900/50 bg-red-950/40 px-4 py-3 text-sm text-red-400">
                {errorMessage}
              </div>
            )}

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-yellow-600 px-4 py-3 font-semibold text-black transition hover:bg-yellow-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>

          </form>
        </div>

        {/* FOOTER */}
        <p className="mt-8 text-center text-xs text-gray-600">
          © 2026 Dunia Arkoub · Designed by AGA CyberWorks
        </p>

      </div>
    </main>
  );
}