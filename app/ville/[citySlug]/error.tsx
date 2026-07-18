"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";
import { STRINGS } from "@/lib/constants";

export default function CityError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Container className="py-16 text-center">
      <h1 className="font-mono text-3xl font-bold text-error">{STRINGS.errorTitle}</h1>
      <p className="mt-4 text-text-secondary">{STRINGS.errorMessage}</p>
      <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <Button onClick={reset}>{STRINGS.retry}</Button>
        <Link href="/">
          <Button variant="secondary">{STRINGS.backHome}</Button>
        </Link>
      </div>
    </Container>
  );
}
