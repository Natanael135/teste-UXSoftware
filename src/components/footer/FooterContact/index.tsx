export function FooterContact() {
  return (
  <div className="w-full md:basis-0 md:grow md:min-w-[120px]">
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
  );
}
