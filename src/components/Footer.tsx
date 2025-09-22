import React from "react";

export const Footer: React.FC = () => (
  <footer className="bg-background border-t border-border py-4 mt-8" aria-label="Rodapé">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center text-muted-foreground text-sm">
      <span aria-hidden="true">© {new Date().getFullYear()} usx.</span> Todos os direitos reservados.
    </div>
  </footer>
);
