"use client";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";
import { STRINGS } from "@/lib/constants";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Container className="py-16 text-center">
      <h1 className="font-mono text-3xl font-bold text-error">{STRINGS.errorTitle}</h1>
      <p className="mt-4 text-text-secondary">{STRINGS.errorMessage}</p>
      <Button className="mt-8" onClick={reset}>
        {STRINGS.retry}
      </Button>
    </Container>
  );
}
