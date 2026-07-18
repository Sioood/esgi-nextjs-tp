# PLAN.md — MeeThéo

Document de suivi global pour le mini-projet Next.js. **Ne lancer une phase que lorsqu'elle est validée explicitement.**

---

## Contexte et objectifs

| Élément           | Décision                                                                                                          |
| ----------------- | ----------------------------------------------------------------------------------------------------------------- |
| Nom               | **MeeThéo**                                                                                                       |
| Stack             | Next.js 16.2, React 19, TypeScript, Tailwind CSS 4, App Router                                                    |
| APIs              | [Open-Meteo Geocoding](https://open-meteo.com/en/docs/geocoding-api) + [Forecast](https://open-meteo.com/en/docs) |
| Design            | [DESIGN.md](DESIGN.md) — thème DevLog (dark, terminal-inspired)                                                   |
| UI                | Français (chaînes dans `lib/constants.ts`, pas de lib i18n)                                                       |
| Route ville       | `/ville/[geocodingId]-[slug]` (ex. `/ville/2988507-paris`)                                                        |
| Carte             | Lien externe OpenStreetMap (sans dépendance Leaflet)                                                              |
| Feature originale | **Prévision d'outfit** selon météo du jour                                                                        |

### État actuel du dépôt

- [x] **PLAN.md** créé — document de suivi
- [x] **Phase 0** prête à commit (`chore: init MeeThéo project foundations`)
- [ ] Phases 1 à 10 — **non commencées** (code en brouillon local non stagé, à implémenter phase par phase)
- [x] Projet Next.js initialisé (`create-next-app`)
- [x] [DESIGN.md](DESIGN.md) présent, non encore appliqué au CSS
- [ ] Aucune intégration API météo committée

---

## Phases et commits

Chaque phase = **1 commit** (ou série de commits atomiques) avec message conventionnel.

### Phase 0 — Fondations projet ✅

**Commit :** `chore: init MeeThéo project foundations`

- [x] Renommer metadata : titre **MeeThéo**, description FR
- [x] Enrichir [`.gitignore`](.gitignore) (`.cursor/`, `Thumbs.db`, `*.local`, `/.pnpm-store`)
- [x] Créer `.env.example`
- [x] Créer arborescence `components/`, `lib/`, `public/screenshots/` (`.gitkeep`)
- [x] Mettre à jour `package.json` name → `meetheo`
- [x] Créer **PLAN.md**

**Fichiers stagés pour ce commit :** voir `git status` — uniquement fondations + bootstrap Next.js, pas les phases suivantes.

### Phase 1 — Design system DevLog

**Commit :** `feat(design): apply DevLog tokens and fonts`

- [ ] Remplacer Geist par **Inter** + **JetBrains Mono** via `next/font/google`
- [ ] Porter les tokens [DESIGN.md](DESIGN.md) en CSS variables dans `app/globals.css`
- [ ] Configurer Tailwind `@theme` avec les tokens DevLog
- [ ] Composants UI : `Button`, `Card`, `Input`, `Chip`, `Label`
- [ ] Layout : `Header`, `Footer`, `Container`

### Phase 2 — Types TypeScript et couche API

**Commit :** `feat(api): add Open-Meteo types and fetch helpers`

- [ ] Types : `GeocodingResult`, `WeatherResponse`, etc.
- [ ] `lib/api/geocoding.ts`, `lib/api/forecast.ts` avec cache `revalidate: 1800`
- [ ] `lib/utils/city-slug.ts`, `weather-codes.ts`, `format.ts`
- [ ] `lib/constants.ts`
- [ ] Route Handler `app/api/geocode/route.ts`

### Phase 3 — Recherche de villes

**Commit :** `feat(search): add city search with autocomplete`

- [ ] `CitySearch` client, debounce 300 ms, min 3 caractères
- [ ] Navigation vers `/ville/{id}-{slug}`

### Phase 4 — Gestion des favoris

**Commit :** `feat(favorites): add localStorage favorites with UI`

- [ ] `useFavorites` + `FavoritesProvider`
- [ ] `FavoriteButton`, `FavoritesList`

### Phase 5 — Page d'accueil complète

**Commit :** `feat(home): build homepage with search and favorites`

### Phase 6 — Page détail ville

**Commit :** `feat(city): add dynamic city detail page`

- [ ] `app/ville/[citySlug]/page.tsx`
- [ ] Conditions actuelles, prévisions 7j, lever/coucher, lien OSM

### Phase 7 — Fonctionnalité outfit

**Commit :** `feat(outfit): add daily outfit suggestion based on weather`

- [ ] `lib/utils/outfit.ts` — moteur de règles
- [ ] `OutfitCard` sur détail + résumé sur favoris

### Phase 8 — États Next.js

**Commit :** `feat(ui): add loading, error and not-found states`

- [ ] `loading.tsx`, `error.tsx`, `not-found.tsx` (global + ville)

### Phase 9 — README et documentation

**Commit :** `docs: write complete README for submission`

### Phase 10 — Qualité finale

**Commit :** `chore: final polish and lint pass`

- [ ] `pnpm lint` et `pnpm build` sans erreur
- [ ] Historique Git propre

---

## Checklist livrables (sujet PDF)

| Livrable                                | Phase | Statut |
| --------------------------------------- | ----- | ------ |
| PLAN.md (suivi)                         | 0     | ✅     |
| .gitignore configuré                    | 0     | ✅     |
| Code source complet                     | 0–10  | ⬜     |
| README.md détaillé                      | 9     | ⬜     |
| Captures d'écran                        | 9–10  | ⬜     |
| Recherche + géocodage                   | 3     | ⬜     |
| Météo actuelle + prévisions 7j          | 6     | ⬜     |
| Favoris localStorage                    | 4     | ⬜     |
| Feature originale outfit                | 7     | ⬜     |
| Routes dynamiques                       | 6     | ⬜     |
| Server + Client Components              | 2–7   | ⬜     |
| loading.tsx / error.tsx / not-found.tsx | 8     | ⬜     |
| TypeScript strict (pas de any)          | 2     | ⬜     |
| Cache API (pas de duplication)          | 2     | ⬜     |
| UI responsive + DESIGN.md               | 1,5–7 | ⬜     |
| Historique Git propre                   | toutes | ⬜    |

### Captures à réaliser (par toi)

1. Accueil — recherche + favoris
2. Résultats de recherche / suggestions
3. Page détail ville complète
4. Gestion favoris (ajout / suppression)
5. Outfit suggestion en action

---

## Stratégie Git

```
main
 ├── chore: init MeeThéo project foundations   ← Phase 0 (en cours)
 ├── feat(design): apply DevLog tokens...      ← Phase 1
 ├── feat(api): add Open-Meteo types...        ← Phase 2
 └── …
```

**Convention :** `feat(scope):`, `fix(scope):`, `chore:`, `docs:`

---

## Prochaine étape

**Phase 1** — Design system DevLog. Valider avant de lancer l'implémentation.

---

## Références

- [React](https://fr.react.dev/)
- [Next.js App Router](https://nextjs.org/docs/app)
- [Open-Meteo Forecast API](https://open-meteo.com/en/docs)
- [Open-Meteo Geocoding API](https://open-meteo.com/en/docs/geocoding-api)
- [DESIGN.md](DESIGN.md)
