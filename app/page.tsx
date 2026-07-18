import { Container } from "@/components/layout/Container";
import { CitySearch } from "@/components/search/CitySearch";
import { APP_NAME, STRINGS } from "@/lib/constants";

export default function Home() {
  return (
    <Container className="space-y-12">
      <section className="space-y-6 text-center sm:text-left">
        <h1 className="font-mono text-4xl font-bold tracking-tight text-primary sm:text-5xl">
          {APP_NAME}
        </h1>
        <p className="max-w-xl text-lg text-text-secondary">
          {STRINGS.appDescription}
        </p>
        <div className="mx-auto max-w-lg sm:mx-0">
          <CitySearch />
        </div>
      </section>
    </Container>
  );
}
