"use client";

import { useMemo, useState } from "react";
import { EmptyState } from "@/components/empty-state";
import { PointerCard } from "@/components/pointer-card";
import type { Pointer } from "@/lib/types";

export function NewsFilter({ items }: { items: Pointer[] }) {
  const categories = ["All", ...Array.from(new Set(items.map((item) => item.category)))];
  const [category, setCategory] = useState("All");
  const visible = useMemo(
    () => (category === "All" ? items : items.filter((item) => item.category === category)),
    [category, items],
  );

  if (!items.length) {
    return (
      <EmptyState
        title="No news yet"
        body="When the studio publishes a repository, issue, or public project on GitHub, it will show up here."
      />
    );
  }

  return (
    <div>
      <div className="mb-10 flex flex-wrap gap-2" role="tablist" aria-label="News categories">
        {categories.map((item) => {
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
                  : "border-studio-line bg-white text-navy hover:border-navy"
              }`}
            >
              {item}
            </button>
          );
        })}
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {visible.map((pointer) => (
          <PointerCard key={pointer.slug} pointer={pointer} />
        ))}
      </div>
    </div>
  );
}
