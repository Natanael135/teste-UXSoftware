
import { AppImage } from "@/components/AppImage";
import React from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image?: string;
  imageUrl?: string;
  description?: string;
  animationDelay?: number;
  discountPercent?: number;
  code?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  id = "",
  name,
  price,
  image,
  imageUrl,
  description,
  animationDelay = 0,
  discountPercent,
  code,
}) => {
  const parcelas = 8;
  const valorParcela = price / parcelas;
  const pixDiscount = discountPercent ?? 0;
  const pixPrice = price * (1 + pixDiscount / 100);

  return (
    <Card
      style={{ animationDelay: `${animationDelay}ms` }}
      className="group bg-white border border-border flex flex-col justify-between relative p-0 overflow-hidden shadow-md rounded-2xl w-full max-w-[276px] min-h-0 mx-auto sm:max-w-full sm:min-h-0 sm:rounded-xl sm:shadow md:max-w-[276px] md:h-auto md:flex-col md:items-stretch md:p-0 max-md:max-w-[393.6px] max-md:h-[193px] max-md:flex-row max-md:items-center max-md:p-2"
    >
      <div className="flex flex-col w-full h-full md:flex-col md:items-stretch max-md:flex-row max-md:items-center max-md:p-2 max-md:gap-2">
        {discountPercent !== undefined && (
          <span className="absolute left-3 top-3 z-10 bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-md shadow-sm">
            {discountPercent > 0 ? '+' : ''}{discountPercent.toFixed(2)}%
          </span>
        )}
        {(imageUrl || image) && (
          <Link
            href={`/products/${id}`}
            tabIndex={-1}
            className="flex justify-center items-center bg-[#f8f8f8] rounded-t-2xl w-full aspect-square min-h-0 max-h-[276px] md:rounded-t-2xl md:w-full md:h-auto md:aspect-square md:min-h-[180px] md:max-h-[276px] max-md:rounded-l-2xl max-md:rounded-tr-none max-md:w-[100px] max-md:h-[100px] max-md:aspect-square max-md:min-h-0 max-md:max-h-none"
          >
            <AppImage
              src={(imageUrl || image) ?? ""}
              alt={name}
              width={100}
              height={100}
              className="object-contain w-full h-full max-w-[276px] max-h-[276px] max-md:max-w-[100px] max-md:max-h-[100px] md:max-w-[276px] md:max-h-[276px]"
            />
          </Link>
        )}
  <div className="flex flex-col flex-1 px-4 pb-4 pt-2 sm:py-2 sm:pl-4 sm:pr-2 sm:justify-center max-md:justify-center max-md:py-0 max-md:px-0 max-md:text-sm">
          {code && (
            <span className="text-xs text-gray-400 mb-1">Cód.: {code}</span>
          )}
          <CardHeader className="p-0 mb-1">
            <Link href={`/products/${id}`} className="focus:outline-none">
              <CardTitle className="hover:underline cursor-pointer text-foreground text-base leading-tight mb-1 line-clamp-2 min-h-[48px] sm:min-h-0">{name}</CardTitle>
            </Link>
          </CardHeader>
          <CardContent className="p-0 mb-2">
            <div className="text-xs text-muted-foreground flex-1 min-h-[32px] line-clamp-2 sm:min-h-0">{description}</div>
          </CardContent>
          <div className="mt-2 mb-1">
            <span className="block text-lg font-bold text-gray-800">R$ {pixPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} <span className="text-xs font-normal text-gray-500">no PIX</span></span>
            <span className="block text-xs text-gray-500">ou {parcelas}x de R$ {valorParcela.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

