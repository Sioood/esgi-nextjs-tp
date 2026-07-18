import { Card } from "@/components/ui/Card";
import { STRINGS } from "@/lib/constants";
import { formatTime } from "@/lib/utils/format";

interface SunTimesProps {
  sunrise: string;
  sunset: string;
  timezone: string;
}

export function SunTimes({ sunrise, sunset, timezone }: SunTimesProps) {
  return (
    <Card>
      <h2 className="font-mono text-xl font-semibold">{STRINGS.sunTimes}</h2>
      <dl className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <dt className="text-xs font-semibold text-text-secondary">{STRINGS.sunrise}</dt>
          <dd className="mt-1 font-mono text-lg text-primary">
            🌅 {formatTime(sunrise, timezone)}
          </dd>
        </div>
        <div>
          <dt className="text-xs font-semibold text-text-secondary">{STRINGS.sunset}</dt>
          <dd className="mt-1 font-mono text-lg text-secondary">
            🌇 {formatTime(sunset, timezone)}
          </dd>
        </div>
      </dl>
    </Card>
  );
}
