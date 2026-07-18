export const APP_NAME = "MeeThéo";

export const FAVORITES_STORAGE_KEY = "meetheo:favorites";

export const SEARCH_MIN_CHARS = 3;
export const SEARCH_DEBOUNCE_MS = 300;
export const SEARCH_RESULTS_COUNT = 5;

export const WEATHER_REVALIDATE_SECONDS = 1800;
export const FORECAST_DAYS = 7;

export const STRINGS = {
  appDescription:
    "Application météo pour rechercher des villes, consulter les prévisions et gérer vos favoris.",
  searchPlaceholder: "Rechercher une ville…",
  searchMinChars: "Saisissez au moins 3 caractères",
  searchLoading: "Recherche en cours…",
  searchNoResults: "Aucune ville trouvée",
  searchError: "Erreur lors de la recherche",
  favoritesTitle: "Villes favorites",
  favoritesEmpty:
    "Aucune ville favorite. Recherchez une ville et ajoutez-la à vos favoris.",
  backHome: "Retour à l'accueil",
  currentWeather: "Conditions actuelles",
  forecast: "Prévisions sur 7 jours",
  sunTimes: "Phases solaires",
  sunrise: "Lever du soleil",
  sunset: "Coucher du soleil",
  viewOnMap: "Voir sur la carte",
  outfitTitle: "Tenue recommandée",
  outfitSubtitle: "Suggestions selon la météo du jour",
  feelsLike: "Ressenti",
  humidity: "Humidité",
  pressure: "Pression",
  wind: "Vent",
  uvIndex: "Indice UV",
  skyCondition: "État du ciel",
  addFavorite: "Ajouter aux favoris",
  removeFavorite: "Retirer des favoris",
  retry: "Réessayer",
  notFoundTitle: "Page introuvable",
  notFoundMessage: "La page que vous recherchez n'existe pas.",
  cityNotFoundTitle: "Ville introuvable",
  cityNotFoundMessage: "Impossible de trouver cette ville.",
  errorTitle: "Une erreur est survenue",
  errorMessage: "Impossible de charger les données. Veuillez réessayer.",
  loading: "Chargement…",
  attribution: "Données météo par Open-Meteo (CC BY 4.0)",
} as const;
