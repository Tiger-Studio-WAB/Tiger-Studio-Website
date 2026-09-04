"use client";

import { useMemo, useState } from "react";
import { DestinationCard } from "@/components/destination-card";
import { EmptyState } from "@/components/empty-state";
import type { Destination } from "@/lib/types";

export function DestinationFilter({ items }: { items: Destination[] }) {
  const categories = ["All", ...Array.from(new Set(items.map((item) => item.category)))];
  const [category, setCategory] = useState("All");
  const visible = useMemo(
    () => (category === "All" ? items : items.filter((item) => item.category === category)),
    [category, items],
  );

  if (!items.length) {
    return (
      <EmptyState
        title="No destinations yet"
        body="Public GitHub repositories will appear here automatically, along with the tools the studio ships with."
      />
    );
  }

  return (
    <div>
      <div className="mb-10 flex flex-wrap gap-2">
        {categories.map((item) => {
          const active = item === category;
          return (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={`rounded-full border px-4 py-2 text-sm font-semibold ${
                active
                  ? "border-navy bg-navy text-white"
                  : "border-studio-line bg-white text-navy hover:border-navy"
              }`}
            >
              {item}
            </button>
          );
        })}
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {visible.map((destination) => (
          <DestinationCard key={destination.slug} destination={destination} />
        ))}
      </div>
    </div>
  );
}
