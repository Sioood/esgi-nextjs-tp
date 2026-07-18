import type { OutfitItem } from "@/lib/utils/outfit";
import { WindowCard } from "@/components/ui/WindowCard";
import { Chip } from "@/components/ui/Chip";
import { Overline } from "@/components/ui/Overline";
import { STRINGS } from "@/lib/constants";

interface OutfitCardProps {
  items: OutfitItem[];
  compact?: boolean;
}

export function OutfitCard({ items, compact = false }: OutfitCardProps) {
  if (items.length === 0) return null;

  if (compact) {
    return (
      <div className="mt-4 border-t border-border-subtle pt-3">
        <Overline prompt=">" tone="muted" className="mb-2">
          tenue
        </Overline>
        <div className="flex flex-wrap gap-1.5">
          {items.slice(0, 3).map((item) => (
            <Chip key={item.id} variant="soft">
              <span aria-hidden="true">{item.icon}</span> {item.label}
            </Chip>
          ))}
        </div>
      </div>
    );
  }

  return (
    <WindowCard title="outfit.today">
      <div className="flex items-center gap-2">
        <span className="text-2xl" aria-hidden="true">
          👕
        </span>
        <div>
          <h2 className="font-mono text-lg font-semibold">
            {STRINGS.outfitTitle}
          </h2>
          <p className="text-xs text-text-secondary">{STRINGS.outfitSubtitle}</p>
        </div>
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        {items.map((item) => (
          <Chip key={item.id} variant="soft">
            <span aria-hidden="true">{item.icon}</span> {item.label}
          </Chip>
        ))}
      </div>
    </WindowCard>
  );
}
