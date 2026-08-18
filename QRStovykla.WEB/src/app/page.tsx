"use client";

import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleAccess = async () => {
    setError("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/access`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password,
          }),
        }
      );

      if (!response.ok) {
        setError("Neteisingas slaptažodis");
        return;
      }

      const data = await response.json();

      if (data.redirectUrl) {
        window.location.href = data.redirectUrl;
      }
    } catch {
      setError("Nepavyko prisijungti prie serverio");
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-6 text-white">
      <div className="w-full max-w-md text-center">

        {/* LOGO */}
        <div className="mb-8 flex justify-center">
          <Image
            src="/VUSAMIF.png"
            alt="VU SA MIF"
            width={100}
            height={100}
            priority
            className="h-auto w-[200px] max-w-full object-contain"
          />
        </div>

        <h1 className="mb-2 text-4xl font-bold">
          VU SA MIF
        </h1>

        <h2 className="mb-10 text-xl text-zinc-400">
          Stovykla 2027
        </h2>

        {/* PASSWORD */}
        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Slaptažodis"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAccess();
              }
            }}
            className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-5 py-4 pr-14 text-white outline-none transition placeholder:text-zinc-500 focus:border-white"
          />

          {/* EYE */}
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 transition hover:text-white"
            aria-label="Rodyti slaptažodį"
          >
            {showPassword ? (
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 3l18 18" />
                <path d="M10.6 10.6a2 2 0 002.8 2.8" />
                <path d="M9.9 4.2A10.5 10.5 0 0112 4c5 0 9 4 10 8a12.7 12.7 0 01-2 4.1" />
                <path d="M6.2 6.2C4.3 7.5 2.8 9.5 2 12c1 4 5 8 10 8 1.7 0 3.3-.5 4.7-1.2" />
              </svg>
            ) : (
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 19 2 12z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
        </div>

        <button
          onClick={handleAccess}
          className="w-full rounded-xl bg-white px-5 py-4 font-semibold text-black transition hover:bg-zinc-200 active:scale-[0.98]"
        >
          Prisijungti
        </button>

        {error && (
          <p className="mt-4 text-sm text-red-400">
            {error}
          </p>
        )}
      </div>
    </main>
  );
}