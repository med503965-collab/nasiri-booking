import Image from "next/image";

export function Logo({ className = "", src = "/logo.png" }: { className?: string; src?: string }) {
  return (
    <Image
      src={src}
      alt="AYOUNA"
      width={64}
      height={64}
      className={`rounded-full object-cover ${className}`}
    />
  );
}
