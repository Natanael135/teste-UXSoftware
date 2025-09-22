import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface FeaturedProductProps {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  ctaText?: string;
}

export const FeaturedProduct: React.FC<FeaturedProductProps> = ({
  id,
  name,
  description,
  image,
  price,
  ctaText = "Ver produto"
}) => {
  return (
    <section className={cn(
      "w-full flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-primary/10 via-background to-background rounded-xl shadow-lg p-6 md:p-10 gap-8 my-8 border border-border"
    )}>
      <div className="flex-1 flex flex-col items-start gap-4">
        <span className="uppercase text-xs font-semibold text-secondary tracking-widest">Produto em destaque</span>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight drop-shadow-sm">{name}</h2>
        <p className="text-muted-foreground text-lg max-w-xl">{description}</p>
        <div className="flex items-center gap-4 mt-2">
          <span className="text-2xl font-bold text-accent">{price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</span>
          <Link href={`/products/${id}`} className="inline-block bg-primary hover:bg-accent text-primary-foreground hover:text-accent-foreground font-semibold px-6 py-2 rounded-lg shadow transition">
            {ctaText}
          </Link>
        </div>
      </div>
      <div className="flex-1 flex justify-center items-center">
        <img src={image} alt={name} className="rounded-xl shadow-lg max-h-72 w-auto object-contain bg-card" />
      </div>
    </section>
  );
};
