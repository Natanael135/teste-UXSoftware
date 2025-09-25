import Link from "next/link";

interface FeaturedProductCTAProps {
  id: string;
  price: number;
  ctaText: string;
}

export function FeaturedProductCTA({ id, price, ctaText }: FeaturedProductCTAProps) {
  return (
    <div className="flex items-center gap-4 mt-2">
      <span className="text-2xl font-bold text-accent">{price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</span>
      <Link href={`/products/${id}`} className="inline-block bg-primary hover:bg-accent text-primary-foreground hover:text-accent-foreground font-semibold px-6 py-2 rounded-lg shadow transition">
        {ctaText}
      </Link>
    </div>
  );
}