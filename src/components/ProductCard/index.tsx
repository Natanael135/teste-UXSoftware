import { AppImage } from "@/components/AppImage";
import React from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image?: string;
  imageUrl?: string;
  description?: string;
  onAddToCart?: () => void;
  animationDelay?: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  name,
  price,
  image,
  imageUrl,
  description,
  onAddToCart,
  animationDelay = 0,
  ...props
}) => (
  <Card style={{ animationDelay: `${animationDelay}ms` }} className="group shadow-lg hover:scale-[1.03] hover:shadow-xl transition-transform duration-300 animate-fade-in bg-card border border-border" {...props}>
    {(imageUrl || image) && (
      <Link
        href={`/products/${props.id ?? ""}`}
        tabIndex={-1}
        className="flex justify-center items-center mb-2 focus:outline-none"
        style={{ minHeight: 160 }}
      >
        <AppImage
          src={(imageUrl || image) ?? ""}
          alt={name}
          width={220}
          height={160}
          className="object-cover rounded group-hover:scale-105 transition-transform duration-300 bg-background"
          style={{ width: '100%', maxWidth: 220, height: 'auto', objectFit: 'cover' }}
        />
      </Link>
    )}
    <CardHeader>
      <Link href={`/products/${props.id ?? ""}`} className="focus:outline-none">
        <CardTitle className="hover:underline cursor-pointer text-foreground">{name}</CardTitle>
      </Link>
      <CardDescription className="text-accent font-bold">R$ {price.toFixed(2)}</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="text-sm text-muted-foreground flex-1">{description}</div>
    </CardContent>
    <CardFooter className="flex gap-2 mt-2">
      {onAddToCart && (
        <Button className="flex-1 bg-accent text-accent-foreground font-semibold hover:bg-primary hover:text-primary-foreground animate-bounce-once" onClick={onAddToCart}>
          <span className="inline-block transition-transform group-hover:scale-110">🛒</span> Adicionar ao carrinho
        </Button>
      )}
    </CardFooter>
  </Card>
);
