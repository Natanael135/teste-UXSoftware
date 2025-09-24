import { AppImage } from "@/components/AppImage";
import React from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

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
  id = "",
  name,
  price,
  image,
  imageUrl,
  description,
  onAddToCart,
  animationDelay = 0,
}) => {
  return (
    <Card style={{ animationDelay: `${animationDelay}ms` }} className="group shadow-lg hover:scale-[1.03] hover:shadow-xl transition-transform duration-300 animate-fade-in bg-card border border-border">
      {(imageUrl || image) && (
        <Link
          href={`/products/${id}`}
          tabIndex={-1}
          className="flex justify-center items-center mb-2 focus:outline-none"
        >
        <AppImage
          src={(imageUrl || image) ?? ""}
          alt={name}
          width={180}
          height={180}
          className="object-cover rounded group-hover:scale-105 transition-transform duration-300 bg-background w-[90%] h-auto"
          style={{ aspectRatio: '1/1' }}
        />
      </Link>
    )}
    <CardHeader>
      <Link href={`/products/${id}`} className="focus:outline-none">
        <CardTitle className="hover:underline cursor-pointer text-foreground">{name}</CardTitle>
      </Link>
      <CardDescription className="text-accent font-bold">R$ {price.toFixed(2)}</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="text-sm text-muted-foreground flex-1">{description}</div>
    </CardContent>
    <CardFooter className="flex gap-2 mt-2">
      {onAddToCart && (
        <Button className="w-full bg-accent text-accent-foreground font-semibold hover:bg-primary hover:text-primary-foreground animate-bounce-once" onClick={onAddToCart}>
          <ShoppingCart className="h-4 w-4 mr-2 inline-block transition-transform group-hover:scale-110" />
          Adicionar ao carrinho
        </Button>
      )}
    </CardFooter>
    </Card>
  );
};

