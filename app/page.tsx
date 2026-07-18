import { Container } from "@/components/layout/Container";
import { FavoritesList } from "@/components/favorites/FavoritesList";
import { CitySearch } from "@/components/search/CitySearch";
import { APP_NAME, STRINGS } from "@/lib/constants";

export default function Home() {
  return (
    <Container className="space-y-12 md:space-y-16">
      <section className="space-y-6 text-center sm:text-left">
        <h1 className="font-mono text-4xl font-bold tracking-tight text-primary sm:text-5xl">
          {APP_NAME}
        </h1>
        <p className="mx-auto max-w-xl text-lg text-text-secondary sm:mx-0">
          {STRINGS.appDescription}
        </p>
        <div className="mx-auto w-full max-w-lg sm:mx-0">
          <CitySearch />
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="font-mono text-xl font-semibold sm:text-2xl">
          {STRINGS.favoritesTitle}
        </h2>
        <FavoritesList />
      </section>
    </Container>
  );
}
