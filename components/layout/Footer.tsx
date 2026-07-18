import { STRINGS } from "@/lib/constants";
import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border-subtle py-8">
      <Container className="flex flex-col items-center gap-2 text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-text-tertiary">
          <span className="text-primary/70">$</span> MeeThéo · Next.js · Open-Meteo
        </p>
        <p className="text-xs text-text-tertiary">
          {STRINGS.attribution} —{" "}
          <a
            href="https://open-meteo.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-tertiary underline-offset-2 transition-colors hover:text-primary hover:underline"
          >
            open-meteo.com
          </a>
        </p>
      </Container>
    </footer>
  );
}
