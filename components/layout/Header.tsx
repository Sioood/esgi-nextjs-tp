import Link from "next/link";
import { Container } from "./Container";

export function Header() {
  return (
    <header className="border-b border-border-subtle">
      <Container className="flex h-16 items-center">
        <Link
          href="/"
          className="font-mono text-xl font-bold tracking-tight text-primary transition-colors hover:text-[#22c55e]"
        >
          MeeThéo
        </Link>
      </Container>
    </header>
  );
}
