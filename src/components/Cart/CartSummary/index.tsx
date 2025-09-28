"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart } from "lucide-react";

interface CartSummaryProps {
  subtotal: number;
  descontos: number;
  total: number;
  onCheckout: () => void;
  onClearCart: () => void;
}

export function CartSummary({ subtotal, descontos, total, onCheckout, onClearCart }: CartSummaryProps) {
  return (
    <Card>
      <CardContent className="space-y-4 p-6">
        <Button variant="outline" className="w-full font-bold text-green-700 border-green-600 hover:text-accent">
          INSERIR CUPOM DE DESCONTO
        </Button>
        <div className="border rounded-lg p-4 space-y-2 bg-muted/40">
          <div className="flex justify-between text-base">
            <span>Subtotal</span>
            <span>R$ {subtotal.toFixed(2)}</span>
          </div>
          <Separator />
          <div className="flex justify-between text-base">
            <span>Descontos</span>
            <span className="text-green-700">- R$ {descontos.toFixed(2)}</span>
          </div>
          <Separator />
          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span className="text-accent">R$ {total.toFixed(2)}</span>
          </div>
        </div>
        <Button className="w-full h-12 text-lg font-bold bg-accent hover:bg-primary text-white rounded-lg mt-2" onClick={onCheckout}>
          <ShoppingCart className="h-5 w-5 mr-2" />
          FINALIZAR COMPRA
        </Button>
        <Button variant="outline" size="sm" className="w-full mt-2 text-sm hover:text-accent" onClick={onClearCart}>
          Limpar Carrinho
        </Button>
      </CardContent>
    </Card>
  );
}