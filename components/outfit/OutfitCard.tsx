import type { OutfitItem } from "@/lib/utils/outfit";
import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { STRINGS } from "@/lib/constants";

interface OutfitCardProps {
  items: OutfitItem[];
  compact?: boolean;
}

export function OutfitCard({ items, compact = false }: OutfitCardProps) {
  if (items.length === 0) return null;

  if (compact) {
    return (
      <p className="mt-3 text-xs text-text-secondary">
        {items
          .slice(0, 3)
          .map((item) => `${item.icon} ${item.label}`)
          .join(" · ")}
      </p>
    );
  }

  return (
    <Card>
      <h2 className="font-mono text-xl font-semibold">{STRINGS.outfitTitle}</h2>
      <p className="mt-1 text-sm text-text-secondary">{STRINGS.outfitSubtitle}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {items.map((item) => (
          <Chip key={item.id} variant="success">
            {item.icon} {item.label}
          </Chip>
        ))}
      </div>
    </Card>
  );
}
