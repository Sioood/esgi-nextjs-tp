"use client";

import { StatusPanel } from "@/components/layout/StatusPanel";
import { Button } from "@/components/ui/Button";
import { STRINGS } from "@/lib/constants";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <StatusPanel
      window="runtime.error"
      code="500"
      command="meetheo --run"
      title={STRINGS.errorTitle}
      message={STRINGS.errorMessage}
      tone="error"
    >
      <Button onClick={reset}>{STRINGS.retry}</Button>
    </StatusPanel>
  );
}
