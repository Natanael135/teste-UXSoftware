import { Container } from "@/components/Container";
import { Button } from "@/components/ui/button";
import { Hammer } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <Container className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="mb-8">
        <Hammer className="w-24 h-24 text-primary animate-hammer mx-auto" />
      </div>
      <h1 className="text-4xl md:text-6xl font-bold text-primary mb-4">
        Página em Construção
      </h1>
      <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-md">
        Ops! Esta página ainda está sendo construída. Volte em breve para ver as novidades!
      </p>
      <Link href="/">
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
          Voltar ao Início
        </Button>
      </Link>
    </Container>
  );
}