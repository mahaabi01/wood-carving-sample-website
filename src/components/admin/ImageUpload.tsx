"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Upload, X, Loader2 } from "lucide-react";

interface ImageUploadProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  required?: boolean;
}

export default function ImageUpload({
  label,
  value,
  onChange,
  required,
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    setError(null);
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Upload failed");
        return;
      }

      onChange(data.url);
    } catch {
      setError("Upload failed. Check your connection and try again.");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && "*"}
      </label>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />

      {value ? (
        <div className="relative w-full h-40 rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
          <Image src={value} alt={label} fill className="object-cover" sizes="400px" />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute top-2 right-2 w-7 h-7 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center transition-colors"
            aria-label="Remove image"
          >
            <X size={14} />
          </button>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="absolute bottom-2 right-2 px-3 py-1.5 text-xs font-medium bg-white/90 hover:bg-white rounded-lg shadow transition-colors disabled:opacity-60"
          >
            {uploading ? "Uploading..." : "Replace"}
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="w-full h-40 rounded-lg border-2 border-dashed border-gray-300 hover:border-temple-400 bg-gray-50 hover:bg-gray-100 flex flex-col items-center justify-center gap-2 text-gray-400 hover:text-temple-500 transition-colors disabled:opacity-60"
        >
          {uploading ? (
            <>
              <Loader2 size={22} className="animate-spin" />
              <span className="text-xs font-medium">Uploading...</span>
            </>
          ) : (
            <>
              <Upload size={22} />
              <span className="text-xs font-medium">
                Click to upload an image
              </span>
              <span className="text-[10px] text-gray-400">
                JPEG, PNG, WebP, or GIF — up to 4MB
              </span>
            </>
          )}
        </button>
      )}

      {error && <p className="text-xs text-red-600 mt-1.5">{error}</p>}
    </div>
  );
}
