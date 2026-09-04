"use client";

import { useId, useState } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";

export function StoreLogoUploader({
  name,
  initialUrl,
}: {
  name: string;
  initialUrl: string;
}) {
  const inputId = useId();
  const [logoUrl, setLogoUrl] = useState(initialUrl);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async (files: FileList | null) => {
    const file = files?.[0];
    if (!file) return;
    setUploading(true);
    setError(null);

    const supabase = createClient();
    const path = `branding/logo-${Date.now()}.${file.name.split(".").pop() ?? "png"}`;
    const { error: uploadError } = await supabase.storage
      .from("product-images")
      .upload(path, file, { upsert: true });

    if (uploadError) {
      setError(uploadError.message || "تعذّر رفع الشعار");
      setUploading(false);
      return;
    }

    const { data } = supabase.storage.from("product-images").getPublicUrl(path);
    setLogoUrl(data.publicUrl);
    setUploading(false);
  };

  return (
    <div className="flex flex-col gap-2">
      <input type="hidden" name={name} value={logoUrl} />
      <span className="text-sm font-medium text-brown-900">شعار المتجر</span>
      <div className="flex items-center gap-4">
        <div className="relative h-20 w-20 overflow-hidden rounded-full border border-sand-200 bg-white">
          <Image src={logoUrl} alt="الشعار الحالي" fill sizes="80px" className="object-cover" />
        </div>
        <label
          htmlFor={inputId}
          className="cursor-pointer rounded-full border-2 border-dashed border-clay-400 px-4 py-2 text-sm font-medium text-clay-600 hover:bg-sand-100"
        >
          {uploading ? "جارٍ الرفع..." : "تغيير الشعار"}
        </label>
        <input
          id={inputId}
          type="file"
          accept="image/*"
          onChange={(e) => handleUpload(e.target.files)}
          disabled={uploading}
          className="hidden"
        />
      </div>
      {error && <span className="text-sm text-maroon-700">{error}</span>}
    </div>
  );
}
