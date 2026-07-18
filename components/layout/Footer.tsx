import { STRINGS } from "@/lib/constants";
import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border-subtle py-6">
      <Container>
        <p className="text-center text-xs text-text-tertiary">
          {STRINGS.attribution} —{" "}
          <a
            href="https://open-meteo.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-info transition-colors hover:text-primary"
          >
            open-meteo.com
          </a>
        </p>
      </Container>
    </footer>
  );
}
