import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { STRINGS } from "@/lib/constants";

export default function CityNotFound() {
  return (
    <Container className="py-16 text-center">
      <p className="font-mono text-5xl font-bold text-warning">404</p>
      <h1 className="mt-4 font-mono text-xl font-semibold">{STRINGS.cityNotFoundTitle}</h1>
      <p className="mt-2 text-text-secondary">{STRINGS.cityNotFoundMessage}</p>
      <Link href="/" className="mt-8 inline-block">
        <Button variant="secondary">{STRINGS.backHome}</Button>
      </Link>
    </Container>
  );
}
