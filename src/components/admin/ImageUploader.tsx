"use client";

import { useId, useState } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";

export function ImageUploader({
  name,
  initialImages = [],
}: {
  name: string;
  initialImages?: string[];
}) {
  const inputId = useId();
  const [images, setImages] = useState<string[]>(initialImages);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploading(true);
    setError(null);
    const supabase = createClient();
    const uploaded: string[] = [];

    for (const file of Array.from(files)) {
      const path = `${Date.now()}-${Math.random().toString(36).slice(2)}-${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from("product-images")
        .upload(path, file);
      if (uploadError) {
        setError(uploadError.message || "تعذّر رفع إحدى الصور");
        continue;
      }
      const { data } = supabase.storage.from("product-images").getPublicUrl(path);
      uploaded.push(data.publicUrl);
    }

    setImages((current) => [...current, ...uploaded]);
    setUploading(false);
  };

  return (
    <div className="flex flex-col gap-3 rounded-2xl border-2 border-dashed border-clay-400/60 bg-sand-50 p-4">
      <input type="hidden" name={name} value={images.join(",")} />
      <span className="font-display text-base text-brown-900">📷 صور المنتج</span>
      <p className="text-xs text-brown-800/70">
        اضغطي على المربع أدناه لاختيار صورة أو أكثر من الهاتف أو الكاميرا.
      </p>

      <div className="flex flex-wrap gap-3">
        {images.map((src, i) => (
          <div key={src} className="relative h-20 w-20 overflow-hidden rounded-lg border border-sand-200">
            <Image src={src} alt="" fill sizes="80px" className="object-cover" />
            <button
              type="button"
              onClick={() => setImages((current) => current.filter((_, idx) => idx !== i))}
              className="absolute top-0.5 right-0.5 rounded-full bg-brown-900/80 px-1.5 text-xs text-cream"
            >
              ×
            </button>
          </div>
        ))}

        <label
          htmlFor={inputId}
          className="flex h-20 w-20 cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed border-clay-400 bg-cream text-clay-600 hover:bg-sand-100"
        >
          <span className="text-2xl leading-none">+</span>
          <span className="text-xs">إضافة</span>
        </label>
        <input
          id={inputId}
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => handleUpload(e.target.files)}
          disabled={uploading}
          className="hidden"
        />
      </div>

      {uploading && <span className="text-sm text-brown-800">جارٍ رفع الصورة...</span>}
      {error && <span className="text-sm text-maroon-700">{error}</span>}
    </div>
  );
}
