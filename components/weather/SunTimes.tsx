import { WindowCard } from "@/components/ui/WindowCard";
import { STRINGS } from "@/lib/constants";
import { formatTime } from "@/lib/utils/format";

interface SunTimesProps {
  sunrise: string;
  sunset: string;
  timezone: string;
}

export function SunTimes({ sunrise, sunset, timezone }: SunTimesProps) {
  return (
    <WindowCard title="sun.times" className="h-full">
      <dl className="flex items-center justify-between gap-4">
        <div>
          <dt className="font-mono text-[11px] font-semibold uppercase tracking-widest text-text-secondary">
            {STRINGS.sunrise}
          </dt>
          <dd className="mt-1 font-mono text-2xl font-bold text-secondary tabular-nums">
            {formatTime(sunrise, timezone)}
          </dd>
        </div>
        <span className="text-2xl" aria-hidden="true">
          🌅
        </span>
      </dl>

      {/* Decorative day arc */}
      <div className="my-4 h-px w-full bg-linear-to-r from-transparent via-secondary/50 to-transparent" />

      <dl className="flex items-center justify-between gap-4">
        <div>
          <dt className="font-mono text-[11px] font-semibold uppercase tracking-widest text-text-secondary">
            {STRINGS.sunset}
          </dt>
          <dd className="mt-1 font-mono text-2xl font-bold text-secondary tabular-nums">
            {formatTime(sunset, timezone)}
          </dd>
        </div>
        <span className="text-2xl" aria-hidden="true">
          🌇
        </span>
      </dl>
    </WindowCard>
  );
}
