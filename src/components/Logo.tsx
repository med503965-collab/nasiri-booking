import Image from "next/image";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Image
      src="/logo.png"
      alt="AYOUNA"
      width={64}
      height={64}
      className={`rounded-full object-cover ${className}`}
    />
  );
}
