import Link from "next/link";
import { APP_NAME } from "@/lib/constants";
import { Container } from "./Container";

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-border-subtle bg-background/80 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between">
        <Link
          href="/"
          className="group inline-flex items-center gap-2.5 rounded-sm"
          aria-label={`${APP_NAME} — accueil`}
        >
          <span className="font-mono text-sm text-text-tertiary transition-colors group-hover:text-primary">
            ~/
          </span>
          <span className="font-mono text-lg font-bold tracking-tight text-primary text-glow-primary">
            {APP_NAME}
          </span>
          <span className="ml-0.5 hidden h-4 w-2 animate-blink bg-primary sm:block" />
        </Link>

        <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-text-tertiary">
          <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_8px_rgba(74,222,128,0.6)]" />
          <span className="hidden sm:inline">online</span>
        </span>
      </Container>
    </header>
  );
}
