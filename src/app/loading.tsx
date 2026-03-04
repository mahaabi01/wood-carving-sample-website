export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <div className="relative w-16 h-16 mx-auto mb-4">
          <div className="absolute inset-0 border-4 border-wood-200 rounded-full" />
          <div className="absolute inset-0 border-4 border-transparent border-t-temple-500 rounded-full animate-spin" />
        </div>
        <p className="text-wood-400 text-sm">Loading...</p>
      </div>
    </div>
  );
}
