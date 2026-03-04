"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-white">
      <span className="text-gold-400 text-6xl mb-6">ॐ</span>
      <h1 className="text-5xl md:text-7xl font-bold text-wood-900 font-[family-name:var(--font-playfair)]">
        404
      </h1>
      <p className="text-xl text-wood-500 mt-4 mb-2">Page Not Found</p>
      <p className="text-wood-400 max-w-md mb-8">
        The page you&apos;re looking for doesn&apos;t exist. It may have been
        moved or the URL might be incorrect.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <Link
          href="/"
          className="px-6 py-3 bg-temple-500 text-white rounded-lg hover:bg-temple-600 transition-colors font-medium"
        >
          Go Home
        </Link>
        <Link
          href="/shop"
          className="px-6 py-3 border-2 border-wood-300 text-wood-700 rounded-lg hover:border-gold-500 transition-colors font-medium"
        >
          Browse Shop
        </Link>
      </div>
    </div>
  );
}
