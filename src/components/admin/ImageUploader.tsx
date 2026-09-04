"use client";

import { useState } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";

export function ImageUploader({
  name,
  initialImages = [],
}: {
  name: string;
  initialImages?: string[];
}) {
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
        setError("تعذّر رفع إحدى الصور");
        continue;
      }
      const { data } = supabase.storage.from("product-images").getPublicUrl(path);
      uploaded.push(data.publicUrl);
    }

    setImages((current) => [...current, ...uploaded]);
    setUploading(false);
  };

  return (
    <div className="flex flex-col gap-2">
      <input type="hidden" name={name} value={images.join(",")} />
      <span className="text-sm font-medium text-brown-900">صور المنتج</span>
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
      </div>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={(e) => handleUpload(e.target.files)}
        disabled={uploading}
        className="text-sm text-brown-800"
      />
      {uploading && <span className="text-sm text-brown-800">جارٍ الرفع...</span>}
      {error && <span className="text-sm text-maroon-700">{error}</span>}
    </div>
  );
}
