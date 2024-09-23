import algoliasearch, { SearchClient } from "algoliasearch";

const algoliaClient: SearchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || "",
  process.env.NEXT_PUBLIC_ALGOLIA_API_KEY || ""
);

export const artistsIndex = algoliaClient.initIndex(
  process.env.NEXT_PUBLIC_ALGOLIA_ARTISTS_INDEX || ""
);
export const newsIndex = algoliaClient.initIndex(
  process.env.NEXT_PUBLIC_ALGOLIA_NEWS_INDEX || ""
);
export const musaicsIndex = algoliaClient.initIndex(
  process.env.NEXT_PUBLIC_ALGOLIA_MUSAICS_INDEX || ""
);
export const chartsIndex = algoliaClient.initIndex(
  process.env.NEXT_PUBLIC_ALGOLIA_CHARTS_INDEX || ""
);
export const citiesIndex = algoliaClient.initIndex(
  process.env.NEXT_PUBLIC_ALGOLIA_CITIES_INDEX || ""
);
export const genresIndex = algoliaClient.initIndex(
  process.env.NEXT_PUBLIC_ALGOLIA_GENRES_INDEX || ""
);
