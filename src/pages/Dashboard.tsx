import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import BenefitCard from "@/components/BenefitCard";
import DashboardSummary from "@/components/DashboardSummary";
import DevToolsBenefits from "@/components/DevToolsBenefits";
import DesignBenefits from "@/components/DesignBenefits";
import CloudBenefits from "@/components/CloudBenefits";
import FrontendBenefits from "@/components/FrontendBenefits";
import MonitoringBenefits from "@/components/MonitoringBenefits";
import WordPressBenefits from "@/components/WordPressBenefits";
import { unlockPackBenefits } from "@/data/unlockPackBenefits";

const GOAL = 82584;

export default function Dashboard() {
  const [unlocked, setUnlocked] = useState<{ [bid: string]: boolean }>({});
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    try {
      const unlockedData: { [bid: string]: boolean } = JSON.parse(
        localStorage.getItem("unlockpack_benefits") || "{}"
      );
      setUnlocked(unlockedData);
    } catch {
      setUnlocked({});
    }
  }, []);

  useEffect(() => {
    const unlockedBenefits = unlockPackBenefits.filter(b => unlocked[b.id]);
    setTotalValue(unlockedBenefits.reduce((acc, b) => acc + b.value, 0));
  }, [unlocked]);

  function handleRevert(id: string) {
    setUnlocked(u => {
      const next = { ...u };
      delete next[id];
      localStorage.setItem("unlockpack_benefits", JSON.stringify(next));
      return next;
    });
  }

  const unlockedBenefits = unlockPackBenefits.filter(b => unlocked[b.id]);
  
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="max-w-5xl mx-auto px-5 pb-20">
        <DashboardSummary
          totalValue={totalValue}
          unlockedCount={unlockedBenefits.length}
          allCount={unlockPackBenefits.length}
          goal={GOAL}
        />

        <h2 className="text-2xl font-bold mb-5 text-primary mt-2">My Unlocked Benefits</h2>
        {unlockedBenefits.length === 0 ? (
          <div className="text-gray-500 mt-8 mb-10 text-lg text-center">
            No benefits unlocked yet.<br />Go to <a href="/explore" className="text-violet-600 underline">Explore</a> to add perks!
          </div>
        ) : (
          <>
            <DevToolsBenefits benefits={unlockedBenefits} unlocked={unlocked} onRevert={handleRevert} />
            <DesignBenefits benefits={unlockedBenefits} unlocked={unlocked} onRevert={handleRevert} />
            <CloudBenefits benefits={unlockedBenefits} unlocked={unlocked} onRevert={handleRevert} />
            <FrontendBenefits benefits={unlockedBenefits} unlocked={unlocked} onRevert={handleRevert} />
            <MonitoringBenefits benefits={unlockedBenefits} unlocked={unlocked} onRevert={handleRevert} />
            <WordPressBenefits benefits={unlockedBenefits} unlocked={unlocked} onRevert={handleRevert} />
            {/* Render any cards missed by category as fallback */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {unlockedBenefits.filter(b =>
                !["Dev Tools", "Design", "Design Assets", "Design Tools", "Design & AI", "Cloud", "Cloud Hosting", "Frontend Tools", "Monitoring", "WordPress"].includes(b.provider)
              ).map(b => (
                <BenefitCard key={b.id} {...b} unlocked onRevert={() => handleRevert(b.id)} />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
