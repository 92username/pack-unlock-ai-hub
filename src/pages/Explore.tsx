import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import BenefitCard from "@/components/BenefitCard";
import DevToolsBenefits from "@/components/DevToolsBenefits";
import DesignBenefits from "@/components/DesignBenefits";
import CloudBenefits from "@/components/CloudBenefits";
import FrontendBenefits from "@/components/FrontendBenefits";
import MonitoringBenefits from "@/components/MonitoringBenefits";
import WordPressBenefits from "@/components/WordPressBenefits";
import { unlockPackBenefits } from "@/data/unlockPackBenefits";

export default function Explore() {
  const [unlocked, setUnlocked] = useState<{ [bid: string]: boolean }>(() => {
    try {
      return JSON.parse(localStorage.getItem("unlockpack_benefits") || "{}");
    } catch {
      return {};
    }
  });

  useEffect(() => {
    setUnlocked(u => {
      try {
        return { ...u, ...(JSON.parse(localStorage.getItem("unlockpack_benefits") || "{}")) };
      } catch {
        return u;
      }
    });
  }, []);

  function handleUnlock(id: string) {
    setUnlocked(u => {
      const next = { ...u, [id]: true };
      localStorage.setItem("unlockpack_benefits", JSON.stringify(next));
      return next;
    });
  }
  function handleRevert(id: string) {
    setUnlocked(u => {
      const next = { ...u };
      delete next[id];
      localStorage.setItem("unlockpack_benefits", JSON.stringify(next));
      return next;
    });
  }

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

        {/* Render benefit cards grouped by category */}
        <DevToolsBenefits benefits={unlockPackBenefits} unlocked={unlocked} onUnlock={handleUnlock} onRevert={handleRevert} />
        <DesignBenefits benefits={unlockPackBenefits} unlocked={unlocked} onUnlock={handleUnlock} onRevert={handleRevert} />
        <CloudBenefits benefits={unlockPackBenefits} unlocked={unlocked} onUnlock={handleUnlock} onRevert={handleRevert} />
        <FrontendBenefits benefits={unlockPackBenefits} unlocked={unlocked} onUnlock={handleUnlock} onRevert={handleRevert} />
        <MonitoringBenefits benefits={unlockPackBenefits} unlocked={unlocked} onUnlock={handleUnlock} onRevert={handleRevert} />
        <WordPressBenefits benefits={unlockPackBenefits} unlocked={unlocked} onUnlock={handleUnlock} onRevert={handleRevert} />

        {/* Fallback for any benefit not matched by above categories */}
        <section>
          <h3 className="text-xl font-bold mb-2 mt-6">Other</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {unlockPackBenefits.filter(b =>
              !["Dev Tools", "Design", "Design Assets", "Design Tools", "Design & AI", "Cloud", "Cloud Hosting", "Frontend Tools", "Monitoring", "WordPress"].includes(b.provider)
            ).map(b => (
              <BenefitCard
                key={b.id}
                {...b}
                unlocked={!!unlocked[b.id]}
                onUnlock={() => handleUnlock(b.id)}
                onRevert={() => handleRevert(b.id)}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
