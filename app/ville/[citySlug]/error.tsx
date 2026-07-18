"use client";

import Link from "next/link";
import { StatusPanel } from "@/components/layout/StatusPanel";
import { Button } from "@/components/ui/Button";
import { STRINGS } from "@/lib/constants";

export default function CityError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <StatusPanel
      window="runtime.error"
      code="500"
      command="meetheo --forecast"
      title={STRINGS.errorTitle}
      message={STRINGS.errorMessage}
      tone="error"
    >
      <Button onClick={reset}>{STRINGS.retry}</Button>
      <Link href="/">
        <Button variant="secondary">{STRINGS.backHome}</Button>
      </Link>
    </StatusPanel>
  );
}
