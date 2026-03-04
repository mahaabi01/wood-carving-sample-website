"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-white">
      <span className="text-temple-500 text-5xl mb-4">⚠</span>
      <h1 className="text-3xl font-bold text-wood-900 font-[family-name:var(--font-playfair)]">
        Something Went Wrong
      </h1>
      <p className="text-wood-500 mt-3 max-w-md mb-6">
        {error.message || "An unexpected error occurred. Please try again."}
      </p>
      <button
        onClick={reset}
        className="px-6 py-3 bg-temple-500 text-white rounded-lg hover:bg-temple-600 transition-colors font-medium"
      >
        Try Again
      </button>
    </div>
  );
}
