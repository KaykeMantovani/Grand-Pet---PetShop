#!/usr/bin/env node
// Fetches Grand Pet's real Google reviews at build time and writes them to
// src/reviews.json, so they ship baked into the static bundle (SSG-friendly,
// no API key exposed to the browser).
//
//   GOOGLE_PLACES_API_KEY=xxxx npm run reviews
//   # optional: GOOGLE_PLACE_ID=ChIJ... to skip the text search
//
// Fails soft on purpose: with no key, no network, or any API error it leaves
// the existing src/reviews.json untouched and exits 0, so `npm run build`
// never breaks for lack of a key. Nothing is ever invented.

import { writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = join(HERE, "..", "src", "reviews.json");

const KEY = process.env.GOOGLE_PLACES_API_KEY;
const SEARCH =
  "Grand Pet, Av. Antônio Gil Veloso 646, Praia da Costa, Vila Velha - ES";
const LANG = "pt-BR";

function bail(msg) {
  const state = existsSync(OUT) ? "reviews.json atual mantido" : "sem dados";
  console.warn(`[reviews] ${msg} — ${state}.`);
  process.exit(0);
}

if (!KEY) bail("GOOGLE_PLACES_API_KEY não definida");

async function findPlaceId() {
  if (process.env.GOOGLE_PLACE_ID) return process.env.GOOGLE_PLACE_ID;
  const res = await fetch("https://places.googleapis.com/v1/places:searchText", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": KEY,
      "X-Goog-FieldMask": "places.id,places.displayName,places.formattedAddress",
    },
    body: JSON.stringify({ textQuery: SEARCH, languageCode: LANG, regionCode: "BR" }),
  });
  if (!res.ok) throw new Error(`searchText ${res.status}: ${await res.text()}`);
  const data = await res.json();
  const id = data.places?.[0]?.id;
  if (!id) throw new Error("nenhum place encontrado para a busca");
  return id;
}

async function getDetails(id) {
  const url = `https://places.googleapis.com/v1/places/${encodeURIComponent(
    id
  )}?languageCode=${LANG}&regionCode=BR`;
  const res = await fetch(url, {
    headers: {
      "X-Goog-Api-Key": KEY,
      "X-Goog-FieldMask": "id,rating,userRatingCount,googleMapsUri,reviews",
    },
  });
  if (!res.ok) throw new Error(`details ${res.status}: ${await res.text()}`);
  return res.json();
}

try {
  const id = await findPlaceId();
  const d = await getDetails(id);

  const items = (d.reviews ?? [])
    .map((r) => ({
      author: r.authorAttribution?.displayName?.trim() || "Cliente Google",
      rating: r.rating ?? 0,
      text: (r.text?.text ?? r.originalText?.text ?? "").trim(),
      when: r.relativePublishTimeDescription ?? "",
      url: r.authorAttribution?.uri || d.googleMapsUri || "",
    }))
    // Only strong, substantive reviews — no 1-liners, no low ratings.
    .filter((r) => r.rating >= 4 && r.text.length >= 20)
    .slice(0, 6);

  const out = {
    rating: d.rating ?? null,
    total: d.userRatingCount ?? null,
    updatedAt: new Date().toISOString().slice(0, 10),
    items,
  };

  writeFileSync(OUT, JSON.stringify(out, null, 2) + "\n");
  console.log(
    `[reviews] ${items.length} avaliação(ões) salvas · nota ${out.rating ?? "?"} · ${
      out.total ?? "?"
    } no total.`
  );
} catch (e) {
  bail(String(e?.message ?? e));
}
