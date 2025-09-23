import React from "react";
import Link from "next/link";

export const Footer: React.FC = () => (
  <footer className="bg-background border-t border-border pt-10 pb-4 mt-8" aria-label="Rodapé">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:justify-between gap-8 md:gap-12">
        {/* Coluna 1: Logo e institucional */}
        <div className="flex-1 min-w-[180px] mb-6 md:mb-0">
          <Link href="/" className="text-2xl font-extrabold tracking-tight text-primary-foreground drop-shadow-sm hover:text-accent transition-colors">UX <span className="text-accent">Marketplace</span></Link>
          <p className="mt-2 text-muted-foreground text-sm max-w-xs">O marketplace para quem busca tecnologia, inovação e confiança. Produtos selecionados, entrega rápida e suporte de verdade.</p>
        </div>
        {/* Coluna 2: Navegação */}
        <div className="flex-1 min-w-[150px]">
          <h4 className="text-md font-semibold text-primary mb-2">Navegação</h4>
          <ul className="space-y-1 text-sm">
            <li><Link href="/products" className="hover:text-accent transition-colors">Produtos</Link></li>
            <li><Link href="/cart" className="hover:text-accent transition-colors">Carrinho</Link></li>
            <li><Link href="/login" className="hover:text-accent transition-colors">Entrar</Link></li>
            <li><Link href="/register" className="hover:text-accent transition-colors">Cadastrar</Link></li>
          </ul>
        </div>
        {/* Coluna 3: Institucional */}
        <div className="flex-1 min-w-[150px]">
          <h4 className="text-md font-semibold text-primary mb-2">Institucional</h4>
          <ul className="space-y-1 text-sm">
            <li><a href="#" className="hover:text-accent transition-colors">Sobre nós</a></li>
            <li><a href="#" className="hover:text-accent transition-colors">Política de Privacidade</a></li>
            <li><a href="#" className="hover:text-accent transition-colors">Termos de Uso</a></li>
            <li><a href="#" className="hover:text-accent transition-colors">Trabalhe conosco</a></li>
          </ul>
        </div>
        {/* Coluna 4: Contato e redes sociais */}
        <div className="flex-1 min-w-[180px]">
          <h4 className="text-md font-semibold text-primary mb-2">Contato</h4>
          <ul className="space-y-1 text-sm">
            <li>Email: <a href="mailto:contato@uxmarketplace.com" className="hover:text-accent transition-colors">contato@usx.com</a></li>
            <li>WhatsApp: <a href="https://wa.me/5511999999999" className="hover:text-accent transition-colors">(11) 99999-9999</a></li>
          </ul>
          <div className="flex gap-3 mt-3">
            <a href="#" aria-label="Instagram" className="hover:text-accent transition-colors"><svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg></a>
            <a href="#" aria-label="Facebook" className="hover:text-accent transition-colors"><svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 2h-3a4 4 0 0 0-4 4v3H7v4h4v8h4v-8h3l1-4h-4V6a1 1 0 0 1 1-1h3z"/></svg></a>
          </div>
        </div>
      </div>
      <div className="mt-8 text-center text-muted-foreground text-xs border-t border-border pt-4">
        <span aria-hidden="true">© {new Date().getFullYear()} UX Marketplace.</span> Todos os direitos reservados.
      </div>
    </div>
  </footer>
);
