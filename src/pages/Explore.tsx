
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import BenefitCard from "@/components/BenefitCard";
// If you ever split out by Benefit type, you won't need category-components anymore.

import unlockPackBenefitsData from "@/data/unlockPackBenefits.json";

type Benefit = {
  id: string;
  name: string;
  description: string;
  category: string;
  value_usd: number;
  auto_access: boolean;
  activation_link: string | null;
};

// Helper: Get all unique categories in appearance order (can sort if prefer alpha)
const getOrderedCategories = (benefits: Benefit[]): string[] => {
  const seen = new Set<string>();
  benefits.forEach((b) => {
    if (b.category && !seen.has(b.category)) seen.add(b.category);
  });
  return Array.from(seen); // Or: [...seen].sort() for alpha sort
};

export default function Explore() {
  const [unlocked, setUnlocked] = useState<{ [bid: string]: boolean }>(() => {
    try {
      return JSON.parse(localStorage.getItem("unlockpack_benefits") || "{}");
    } catch {
      return {};
    }
  });

  useEffect(() => {
    setUnlocked((u) => {
      try {
        return { ...u, ...(JSON.parse(localStorage.getItem("unlockpack_benefits") || "{}")) };
      } catch {
        return u;
      }
    });
  }, []);

  function handleUnlock(id: string) {
    setUnlocked((u) => {
      const next = { ...u, [id]: true };
      localStorage.setItem("unlockpack_benefits", JSON.stringify(next));
      return next;
    });
  }
  function handleRevert(id: string) {
    setUnlocked((u) => {
      const next = { ...u };
      delete next[id];
      localStorage.setItem("unlockpack_benefits", JSON.stringify(next));
      return next;
    });
  }

  // Parse data from JSON and cast for TS
  const benefits: Benefit[] = unlockPackBenefitsData as any;

  // Get ordered list of categories
  const categories = getOrderedCategories(benefits);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <Navbar />
      <main className="max-w-6xl mx-auto px-5 py-12">
        <h1 className="text-4xl font-bold mb-4 text-primary">
          Explore Student Benefits
        </h1>
        <p className="mb-7 text-muted-foreground text-lg">
          Unlock top educational deals & software—become unstoppable. Confirm each unlock to track it on your dashboard!
        </p>

        {/* Category grouping by field */}
        {categories.map((category) => {
          const benefitsInCategory = benefits.filter((b) => b.category === category);
          if (!benefitsInCategory.length) return null;
          return (
            <section key={category} className="mb-12">
              <h3 className="text-2xl font-bold mb-4 mt-6">{category}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {benefitsInCategory.map((b) => (
                  <BenefitCard
                    key={b.id}
                    id={b.id}
                    name={b.name}
                    provider={b.category}
                    description={b.description}
                    activationUrl={b.activation_link || "#"}
                    value={b.value_usd}
                    unlocked={!!unlocked[b.id]}
                    onUnlock={() => handleUnlock(b.id)}
                    onRevert={() => handleRevert(b.id)}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </main>
    </div>
  );
}
