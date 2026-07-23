import data from "./reviews.json";

export type Review = {
  author: string;
  rating: number;
  text: string;
  when: string;
  url?: string;
};

export type ReviewData = {
  rating: number | null;
  total: number | null;
  updatedAt: string | null;
  items: Review[];
};

// Populated at build time by scripts/fetch-reviews.mjs (real Google reviews).
// Empty until a GOOGLE_PLACES_API_KEY is supplied — nothing here is invented.
export const reviews = data as ReviewData;

// Live Google review count when available, else the number the client gave us.
export const reviewCount = reviews.total
  ? reviews.total.toLocaleString("pt-BR")
  : "4.552";
