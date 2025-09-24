import { FooterLogo } from './FooterLogo';
import { FooterNavigation } from './FooterNavigation';
import { FooterInstitutional } from './FooterInstitutional';
import { FooterContact } from './FooterContact';

export function Footer() {
  return (
    <footer className="bg-background border-t border-border pt-10 pb-4" aria-label="Rodapé">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:flex-wrap md:justify-between gap-y-8 md:gap-y-0 gap-8 md:gap-12">
          <FooterLogo />
          <FooterNavigation />
          <FooterInstitutional />
          <FooterContact />
        </div>
        <div className="mt-8 text-center text-muted-foreground text-xs border-t border-border pt-4">
          <span aria-hidden="true">© {new Date().getFullYear()} UX Marketplace.</span> Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
