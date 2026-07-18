import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { STRINGS } from "@/lib/constants";

export default function NotFound() {
  return (
    <Container className="py-16 text-center">
      <p className="font-mono text-5xl font-bold text-primary">404</p>
      <h1 className="mt-4 font-mono text-xl font-semibold">{STRINGS.notFoundTitle}</h1>
      <p className="mt-2 text-text-secondary">{STRINGS.notFoundMessage}</p>
      <Link href="/" className="mt-8 inline-block">
        <Button variant="secondary">{STRINGS.backHome}</Button>
      </Link>
    </Container>
  );
}
