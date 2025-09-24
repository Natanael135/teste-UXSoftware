import Link from "next/link";

export function FooterLogo() {
  return (
    <div className="w-full md:basis-0 md:grow md:min-w-[120px] mb-6 md:mb-0">
      <Link href="/" className="text-2xl font-extrabold tracking-tight text-primary-foreground drop-shadow-sm hover:text-accent transition-colors">
        UX <span className="text-accent">Marketplace</span>
      </Link>
      <p className="mt-2 text-muted-foreground text-sm max-w-xs">
        O marketplace para quem busca tecnologia, inovação e confiança. Produtos selecionados, entrega rápida e suporte de verdade.
      </p>
    </div>
  );
}
