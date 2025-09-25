import { AppImage } from "@/components/AppImage";

export function FooterContact() {
  return (
    <div className="w-full md:basis-0 md:grow md:min-w-[120px]">
      <h4 className="text-md font-semibold text-primary mb-2">Contato</h4>
      <ul className="space-y-1 text-sm">
        <li>Email: <a href="mailto:contato@uxmarketplace.com" className="hover:text-accent transition-colors">contato@usx.com</a></li>
        <li>WhatsApp: <a href="https://wa.me/5511999999999" className="hover:text-accent transition-colors">(11) 99999-9999</a></li>
      </ul>
      <div className="flex gap-3 mt-3">
        <a href="#" aria-label="Instagram" className="hover:text-accent transition-colors">
          <AppImage src="/instagram.svg" alt="Instagram" width={22} height={22} />
        </a>
        <a href="#" aria-label="Facebook" className="hover:text-accent transition-colors">
          <AppImage src="/facebook.svg" alt="Facebook" width={22} height={22} />
        </a>
      </div>
    </div>
  );
}
