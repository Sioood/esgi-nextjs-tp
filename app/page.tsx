import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";

export default function Home() {
  return (
    <Container className="space-y-12">
      <section className="space-y-4 text-center sm:text-left">
        <p className="font-mono text-xs font-semibold uppercase tracking-widest text-primary">
          DevLog Design System
        </p>
        <h1 className="font-mono text-4xl font-bold tracking-tight text-primary sm:text-5xl">
          MeeThéo
        </h1>
        <p className="max-w-xl text-lg text-text-secondary">
          Application météo — Phase 1 terminée. Design system DevLog appliqué.
        </p>
      </section>

      <section className="grid gap-6 sm:grid-cols-2">
        <Card>
          <h2 className="font-mono text-lg font-semibold">Composants UI</h2>
          <p className="mt-2 text-sm text-text-secondary">
            Button, Card, Input, Chip et Label sont prêts pour les phases suivantes.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button size="sm">Primary</Button>
            <Button size="sm" variant="secondary">
              Secondary
            </Button>
            <Button size="sm" variant="ghost">
              Ghost
            </Button>
          </div>
        </Card>

        <Card elevated>
          <h2 className="font-mono text-lg font-semibold">Tokens DevLog</h2>
          <p className="mt-2 text-sm text-text-secondary">
            Fond navy-black, accents vert phosphore, typo JetBrains Mono + Inter.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Chip variant="success">Météo</Chip>
            <Chip variant="info">Prévisions</Chip>
            <Chip variant="warning">Outfit</Chip>
          </div>
        </Card>
      </section>
    </Container>
  );
}
