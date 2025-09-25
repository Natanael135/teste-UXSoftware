import React from "react";
import { cn } from "@/lib/utils";
import { FeaturedProductBadge } from "./FeaturedProductBadge";
import { FeaturedProductTitle } from "./FeaturedProductTitle";
import { FeaturedProductDescription } from "./FeaturedProductDescription";
import { FeaturedProductCTA } from "./FeaturedProductCTA";
import { FeaturedProductImage } from "./FeaturedProductImage";

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
        <FeaturedProductBadge />
        <FeaturedProductTitle name={name} />
        <FeaturedProductDescription description={description} />
        <FeaturedProductCTA id={id} price={price} ctaText={ctaText} />
      </div>
      <FeaturedProductImage image={image} name={name} />
    </section>
  );
};
