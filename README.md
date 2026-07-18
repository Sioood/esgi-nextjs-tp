# MeeThéo

Application météo web développée avec **Next.js 16**, **TypeScript** et l'**App Router**. Recherchez une ville, consultez ses conditions météorologiques et ses prévisions sur 7 jours, gérez vos villes favorites et obtenez des suggestions de tenue adaptées à la météo du jour.

## Fonctionnalités implémentées

- [x] Page d'accueil avec recherche de villes et suggestions en temps réel (géocodage [Open-Meteo](https://open-meteo.com/en/docs/geocoding-api))
- [x] Autocomplétion avec debounce (300 ms, minimum 3 caractères)
- [x] Page de détail par ville : `/ville/[id]-[slug]` (ex. `/ville/2988507-paris`)
- [x] Conditions actuelles : température, ressenti, humidité, pression, vent, indice UV, état du ciel
- [x] Prévisions journalières sur 7 jours (min/max + icônes WMO)
- [x] Lever et coucher du soleil
- [x] Lien vers [OpenStreetMap](https://www.openstreetmap.org/) pour localiser la ville
- [x] Gestion des favoris (ajout / suppression) avec persistance `localStorage`
- [x] Indicateur visuel favori (étoile) sur recherche, accueil et page détail
- [x] Cartes météo sur les villes favorites (accueil)
- [x] **Fonctionnalité originale** : prévision d'outfit selon la météo du jour
- [x] États `loading.tsx`, `error.tsx` et `not-found.tsx` (global + page ville)
- [x] Design responsive (mobile, tablette, desktop)
- [x] Thème **DevLog** (dark mode, terminal-inspired) — voir [DESIGN.md](DESIGN.md)

## Fonctionnalité originale — Prévision d'outfit

**Valeur ajoutée :** Au-delà de l'affichage météo brut, MeeThéo propose des suggestions vestimentaires concrètes pour la journée (manteau, parapluie, lunettes de soleil, etc.) en fonction de la température ressentie, du vent, de l'UV, des précipitations et des codes météo WMO.

**Implémentation technique :** Moteur de règles pur en TypeScript dans [`lib/utils/outfit.ts`](lib/utils/outfit.ts), sans API tierce. Les règles combinent :

- `apparent_temperature` — paliers vestimentaires (manteau, veste, tenue légère…)
- `weather_code` — pluie et neige (codes WMO)
- `wind_speed_10m` — coupe-vent si > 30 km/h
- `uv_index_max` — protection solaire si ≥ 6
- `precipitation_probability_max` — parapluie si > 50 %

Le composant [`OutfitCard`](components/outfit/OutfitCard.tsx) affiche les suggestions en chips sur la page détail ; un résumé compact apparaît sur les cartes favoris de l'accueil.

## Technologies utilisées

| Technologie | Usage |
| ----------- | ----- |
| [Next.js 16](https://nextjs.org/docs/app) | App Router, Server Components, Route Handlers |
| [React 19](https://fr.react.dev/) | Composants fonctionnels, hooks, Context |
| TypeScript | Typage strict, zéro `any` |
| Tailwind CSS 4 | Design system DevLog via CSS variables |
| [Open-Meteo Geocoding API](https://open-meteo.com/en/docs/geocoding-api) | Recherche et résolution de villes |
| [Open-Meteo Forecast API](https://open-meteo.com/en/docs) | Conditions actuelles et prévisions |

## Installation et lancement

```bash
git clone <url-du-depot>
cd meetheo
pnpm install
pnpm dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

### Scripts disponibles

| Commande | Description |
| -------- | ----------- |
| `pnpm dev` | Serveur de développement |
| `pnpm build` | Build de production |
| `pnpm start` | Serveur de production |
| `pnpm lint` | Vérification ESLint |

## Variables d'environnement

Copier [`.env.example`](.env.example) vers `.env.local` :

```bash
cp .env.example .env.local
```

| Variable | Requis | Description |
| -------- | ------ | ----------- |
| `NEXT_PUBLIC_APP_NAME` | Non | Nom de l'application (défaut : MeeThéo) |

> Open-Meteo ne nécessite **pas de clé API** pour un usage non-commercial (licence [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)).

## Architecture — Server vs Client Components

| Composant / Page | Type | Raison |
| ---------------- | ---- | ------ |
| `app/layout.tsx` | Server | Layout, metadata SEO |
| `app/page.tsx` | Server | Composition de la page d'accueil |
| `app/ville/[citySlug]/page.tsx` | Server | Fetch météo côté serveur (`getWeather` + cache) |
| `app/loading.tsx`, `app/error.tsx`, `app/not-found.tsx` | Conventions App Router | États globaux |
| `app/ville/[citySlug]/loading.tsx`, `error.tsx`, `not-found.tsx` | Conventions App Router | États page ville |
| `CitySearch` | Client | Debounce, état local, navigation clavier |
| `FavoritesList`, `FavoriteButton` | Client | `localStorage`, Context React |
| `FavoritesProvider` (`Providers`) | Client | État global des favoris |
| Route Handlers `/api/geocode`, `/api/weather` | Server | Proxy typé vers Open-Meteo |

### Cache API

| Endpoint | Stratégie |
| -------- | --------- |
| Météo (`getWeather`) | `fetch` + `revalidate: 1800` (30 min) + `cache()` React |
| Géocodage recherche | `revalidate: 3600` (1 h) |
| Géocodage par ID | `revalidate: 86400` (24 h) |

## Structure du projet

```
app/
  layout.tsx, page.tsx, globals.css
  loading.tsx, error.tsx, not-found.tsx
  api/geocode/route.ts, api/weather/route.ts
  ville/[citySlug]/
    page.tsx, loading.tsx, error.tsx, not-found.tsx
components/
  ui/           Button, Card, Input, Chip, Label, Skeleton
  layout/       Header, Footer, Container, Providers
  search/       CitySearch
  weather/      CurrentWeatherCard, ForecastList, WeatherIcon, SunTimes
  favorites/    FavoritesList, FavoriteButton
  outfit/       OutfitCard
lib/
  api/          geocoding.ts, forecast.ts
  types/        geocoding.ts, weather.ts, favorites.ts
  utils/        city-slug.ts, weather-codes.ts, outfit.ts, format.ts, cn.ts
  hooks/        useFavorites.tsx
  constants.ts
public/screenshots/   # Captures d'écran pour la soumission
PLAN.md               # Suivi des phases de développement
DESIGN.md             # Design system DevLog
```

## Captures d'écran

Ajouter vos captures dans [`public/screenshots/`](public/screenshots/) :

| Fichier | Contenu |
| ------- | ------- |
| `01-accueil.png` | Page d'accueil avec recherche et favoris |
| `02-recherche.png` | Résultats de recherche / suggestions |
| `03-ville-1.png` | Page détail ville complète |
| `04-ville-2.png` | Page détail ville complète |
| `05-feature-outfit.png` | Suggestion d'outfit en action |

## Attribution

- Données météo : [Open-Meteo](https://open-meteo.com/) — licence [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)
- Données de localisation : [GeoNames](https://www.geonames.org/)
- Cartes : [OpenStreetMap](https://www.openstreetmap.org/)

## Licence

Projet réalisé dans le cadre du mini-projet Next.js — ESGI.
