import Link from "next/link";

export function FooterNavigation() {
  return (
  <div className="w-full md:basis-0 md:grow md:min-w-[120px]">
      <h4 className="text-md font-semibold text-primary mb-2">Navegação</h4>
      <ul className="space-y-1 text-sm">
        <li><Link href="/products" className="hover:text-accent transition-colors">Produtos</Link></li>
        <li><Link href="/cart" className="hover:text-accent transition-colors">Carrinho</Link></li>
        <li><Link href="/login" className="hover:text-accent transition-colors">Entrar</Link></li>
        <li><Link href="/register" className="hover:text-accent transition-colors">Cadastrar</Link></li>
      </ul>
    </div>
  );
}
