import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ProductModalFooterProps {
  onClose: () => void;
  loading: boolean;
  isEdit: boolean;
}

export function ProductModalFooter({ onClose, loading, isEdit }: ProductModalFooterProps) {
  return (
    <DialogFooter className="flex gap-2 mt-4">
      <Button type="button" variant="secondary" className="bg-secondary text-secondary-foreground font-semibold hover:bg-accent hover:text-accent-foreground transition" onClick={onClose} disabled={loading}>
        Cancelar
      </Button>
      <Button type="submit" className="bg-primary text-primary-foreground font-semibold hover:bg-accent hover:text-accent-foreground transition" disabled={loading}>
        {loading ? "Salvando..." : isEdit ? "Salvar" : "Criar"}
      </Button>
    </DialogFooter>
  );
}