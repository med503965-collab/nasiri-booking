export function ProductImage({
  colorFrom,
  colorTo,
  name,
  className = "",
}: {
  colorFrom: string;
  colorTo: string;
  name: string;
  className?: string;
}) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${className}`}
      style={{
        background: `linear-gradient(135deg, ${colorFrom}, ${colorTo})`,
      }}
    >
      <div className="bg-dune-pattern absolute inset-0 opacity-10" />
      <span className="font-display relative text-4xl text-cream/90">
        {name.trim().charAt(0)}
      </span>
    </div>
  );
}
