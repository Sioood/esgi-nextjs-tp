import { cn } from "@/lib/utils/cn";

interface RangeBarProps {
  /** Lower bound of this segment (e.g. day min temperature). */
  min: number;
  /** Upper bound of this segment (e.g. day max temperature). */
  max: number;
  /** Global scale lower bound (e.g. week min). */
  scaleMin: number;
  /** Global scale upper bound (e.g. week max). */
  scaleMax: number;
  className?: string;
}

/**
 * Horizontal temperature-range bar: a track spanning the whole scale with a
 * filled segment positioned for this day's min→max, using a green intensity
 * gradient (terminal-native, single-hue).
 */
export function RangeBar({
  min,
  max,
  scaleMin,
  scaleMax,
  className,
}: RangeBarProps) {
  const span = Math.max(scaleMax - scaleMin, 1);
  const left = ((min - scaleMin) / span) * 100;
  const width = Math.max(((max - min) / span) * 100, 6);

  return (
    <div
      className={cn(
        "relative h-1.5 w-full overflow-hidden rounded-full bg-surface-raised/60",
        className,
      )}
      aria-hidden="true"
    >
      <div
        className="absolute top-0 h-full rounded-full bg-linear-to-r from-primary/35 to-primary"
        style={{ left: `${left}%`, width: `${width}%` }}
      />
    </div>
  );
}
