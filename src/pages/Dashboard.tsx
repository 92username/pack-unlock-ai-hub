
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import BenefitCard from "@/components/BenefitCard";
import { BookOpen } from "lucide-react";
import Gauge from "@/components/Gauge";

const GOAL = 5508;

const demoBenefits = [
  {
    id: "github-student-pack",
    name: "GitHub Student Pack",
    logo: "https://github.githubassets.com/images/modules/site/edu/github-pack/github-pack-logo.png",
    description:
      "Free premium developer tools, cloud hosting, and learning resources for students worldwide.",
    activationUrl: "https://education.github.com/pack",
    category: "Development",
    value: 4200,
  },
  {
    id: "figma-education",
    name: "Figma for Education",
    logo: "https://static.figma.com/app/icon/1/favicon.png",
    description:
      "Collaborative design and prototyping tools—free for students and educators.",
    activationUrl: "https://www.figma.com/education/",
    category: "Design",
    value: 540,
  },
  {
    id: "adobe-edu",
    name: "Adobe Creative Cloud",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Adobe_Creative_Cloud_rainbow_icon.svg/1024px-Adobe_Creative_Cloud_rainbow_icon.svg.png",
    description:
      "Discounted or free access to Photoshop, Illustrator, and more via your institution.",
    activationUrl: "https://www.adobe.com/creativecloud/buy/students.html",
    category: "Creative",
    value: 600,
  },
  {
    id: "canva-edu",
    name: "Canva for Education",
    logo: "https://static.canva.com/static/images/favicons/apple-touch-icon-152x152.png",
    description:
      "Easy-to-use design and publishing for classrooms, free for verified students/teachers.",
    activationUrl: "https://www.canva.com/education/",
    category: "Design",
    value: 120,
  },
  {
    id: "notion-edu",
    name: "Notion for Students",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png",
    description:
      "Collaborative workspace for notes and projects—free Personal Pro plan for students.",
    activationUrl: "https://www.notion.so/students",
    category: "Productivity",
    value: 48,
  },
];

export default function Dashboard() {
  const [unlocked, setUnlocked] = useState<{ [bid: string]: boolean }>({});
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    try {
      const unlockedData: { [bid: string]: boolean } = JSON.parse(
        localStorage.getItem("unlockpack_benefits") || "{}"
      );
      setUnlocked(unlockedData);
      const unlockedBenefits = demoBenefits.filter(b => unlockedData[b.id]);
      const sum = unlockedBenefits.reduce((acc, b) => acc + b.value, 0);
      setTotalValue(sum);
    } catch {
      setUnlocked({});
      setTotalValue(0);
    }
  }, []);

  // Add revert handling like in Explore, for completeness (optional UI)
  function handleRevert(id: string) {
    setUnlocked(u => {
      const next = { ...u };
      delete next[id];
      localStorage.setItem("unlockpack_benefits", JSON.stringify(next));
      // recalc value for gauge
      const unlockedBenefits = demoBenefits.filter(b => next[b.id]);
      setTotalValue(unlockedBenefits.reduce((acc, b) => acc + b.value, 0));
      return next;
    });
  }

  const unlockedBenefits = demoBenefits.filter(b => unlocked[b.id]);

  useEffect(() => {
    // Sync value if unlocked state changes (e.g. revisit page)
    const unlockedBenefits = demoBenefits.filter(b => unlocked[b.id]);
    setTotalValue(unlockedBenefits.reduce((acc, b) => acc + b.value, 0));
  }, [unlocked]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <Navbar />
      <main className="max-w-5xl mx-auto px-5 pb-20">
        <div className="flex flex-col md:flex-row gap-6 md:items-end my-8">
          <div className="flex-1 rounded-2xl bg-gradient-to-tr from-violet-500 to-violet-300 shadow-xl p-7 flex items-center gap-4 animate-fade-in">
            <BookOpen className="w-12 h-12 text-white flex-shrink-0" />
            <div>
              <div className="uppercase text-xs text-violet-100 font-bold tracking-widest mb-1">
                Total Value Unlocked
              </div>
              <div className="text-3xl md:text-4xl font-extrabold text-white drop-shadow">
                ${totalValue}
              </div>
              <div className="text-md text-violet-50 mt-1">
                {
                  totalValue > 0
                    ? `Amazing! You've unlocked ${unlockedBenefits.length} benefits.`
                    : "Start unlocking benefits to see them here!"
                }
              </div>
            </div>
          </div>
        </div>
        {/* Gauge Meter */}
        <Gauge value={totalValue} goal={GOAL} />

        <h2 className="text-2xl font-bold mb-5 text-primary mt-2">My Unlocked Benefits</h2>
        {unlockedBenefits.length === 0 ? (
          <div className="text-gray-500 mt-8 mb-10 text-lg text-center">
            No benefits unlocked yet.<br />Go to <a href="/explore" className="text-violet-600 underline">Explore</a> to add perks!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {unlockedBenefits.map(b => (
              <BenefitCard key={b.id} {...b} unlocked onRevert={() => handleRevert(b.id)} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
