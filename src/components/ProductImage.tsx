import Image from "next/image";

export function ProductImage({
  images,
  name,
  className = "",
  sizes,
}: {
  images: string[];
  name: string;
  className?: string;
  sizes?: string;
}) {
  const src = images[0];

  if (!src) {
    return (
      <div
        className={`bg-desert-gradient relative flex items-center justify-center overflow-hidden ${className}`}
      >
        <div className="bg-dune-pattern absolute inset-0 opacity-10" />
        <span className="font-display relative text-4xl text-cream/90">
          {name.trim().charAt(0)}
        </span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={name}
        fill
        sizes={sizes ?? "(min-width: 1024px) 25vw, 50vw"}
        className="object-cover"
      />
    </div>
  );
}
