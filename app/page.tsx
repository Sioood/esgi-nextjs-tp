import { Container } from "@/components/layout/Container";
import { FavoritesList } from "@/components/favorites/FavoritesList";
import { CitySearch } from "@/components/search/CitySearch";
import { Overline } from "@/components/ui/Overline";
import { APP_NAME, STRINGS } from "@/lib/constants";

export default function Home() {
  return (
    <Container className="space-y-14 md:space-y-20">
      <section className="animate-rise space-y-6">
        <Overline prompt="//" tone="primary">
          météo terminal-inspired
        </Overline>

        <h1 className="font-mono text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
          <span className="text-primary text-glow-primary">{APP_NAME}</span>
          <span className="ml-1 inline-block h-9 w-3 translate-y-1 animate-blink bg-primary sm:h-12 sm:w-4" />
        </h1>

        <p className="max-w-2xl text-lg leading-relaxed text-text-secondary">
          {STRINGS.appDescription}
        </p>

        <div className="w-full max-w-xl rounded-lg border border-border-medium bg-surface/40 p-4 backdrop-blur-sm">
          <CitySearch />
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-baseline gap-3">
          <h2 className="font-mono text-xl font-semibold sm:text-2xl">
            <span className="text-text-tertiary">~/</span>
            {STRINGS.favoritesTitle}
          </h2>
        </div>
        <FavoritesList />
      </section>
    </Container>
  );
}
