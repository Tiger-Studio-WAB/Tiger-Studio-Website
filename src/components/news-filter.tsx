"use client";

import { useMemo, useState } from "react";
import { PointerCard } from "@/components/pointer-card";
import { newsCategories, newsPointers } from "@/lib/content";

export function NewsFilter() {
  const [category, setCategory] = useState("All");
  const items = useMemo(() => {
    const all = newsPointers();
    return category === "All" ? all : all.filter((item) => item.category === category);
  }, [category]);

  return (
    <div>
      <div className="mb-10 flex flex-wrap gap-2" role="tablist" aria-label="News categories">
        {newsCategories.map((item) => {
          const active = item === category;
          return (
            <button
              key={item}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setCategory(item)}
              className={`rounded-full border px-4 py-2 text-sm font-semibold ${
                active
                  ? "border-navy bg-navy text-white"
                  : "border-wab-line bg-white text-navy hover:border-navy"
              }`}
            >
              {item}
            </button>
          );
        })}
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {items.map((pointer) => (
          <PointerCard key={pointer.slug} pointer={pointer} />
        ))}
      </div>
    </div>
  );
}
