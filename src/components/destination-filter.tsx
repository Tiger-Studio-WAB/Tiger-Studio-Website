"use client";

import { useMemo, useState } from "react";
import { DestinationCard } from "@/components/destination-card";
import { destinationCategories, destinations } from "@/lib/content";

export function DestinationFilter() {
  const [category, setCategory] = useState("All");
  const items = useMemo(
    () => (category === "All" ? destinations : destinations.filter((item) => item.category === category)),
    [category],
  );

  return (
    <div>
      <div className="mb-10 flex flex-wrap gap-2">
        {destinationCategories.map((item) => {
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
        {items.map((destination) => (
          <DestinationCard key={destination.slug} destination={destination} />
        ))}
      </div>
    </div>
  );
}
