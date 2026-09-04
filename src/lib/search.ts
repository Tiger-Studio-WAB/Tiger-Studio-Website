import { destinations, pointers, type Destination, type Pointer } from "@/lib/content";

export type SearchHit =
  | { type: "pointer"; item: Pointer }
  | { type: "destination"; item: Destination };

function haystack(hit: SearchHit) {
  if (hit.type === "pointer") {
    const p = hit.item;
    return `${p.title} ${p.excerpt} ${p.source} ${p.category} ${p.kind} ${p.url}`;
  }
  const d = hit.item;
  return `${d.name} ${d.description} ${d.category} ${d.url}`;
}

export function searchHub(query: string): SearchHit[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const pool: SearchHit[] = [
    ...pointers.map((item) => ({ type: "pointer" as const, item })),
    ...destinations.map((item) => ({ type: "destination" as const, item })),
  ];

  return pool.filter((hit) => haystack(hit).toLowerCase().includes(q));
}
