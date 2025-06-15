
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import BenefitCard from "@/components/BenefitCard";

const demoBenefits = [
  {
    id: "github-student-pack",
    name: "GitHub Student Pack",
    logo: "https://github.githubassets.com/images/modules/site/edu/github-pack/github-pack-logo.png",
    description:
      "Free premium developer tools, cloud hosting, and learning resources for students worldwide.",
    category: "Development",
    value: 4200,
  },
  {
    id: "figma-education",
    name: "Figma for Education",
    logo: "https://static.figma.com/app/icon/1/favicon.png",
    description:
      "Collaborative design and prototyping tools—free for students and educators.",
    category: "Design",
    value: 540,
  },
  {
    id: "adobe-edu",
    name: "Adobe Creative Cloud",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Adobe_Creative_Cloud_rainbow_icon.svg/1024px-Adobe_Creative_Cloud_rainbow_icon.svg.png",
    description:
      "Discounted or free access to Photoshop, Illustrator, and more via your institution.",
    category: "Creative",
    value: 600,
  },
  {
    id: "canva-edu",
    name: "Canva for Education",
    logo: "https://static.canva.com/static/images/favicons/apple-touch-icon-152x152.png",
    description:
      "Easy-to-use design and publishing for classrooms, free for verified students/teachers.",
    category: "Design",
    value: 120,
  },
  {
    id: "notion-edu",
    name: "Notion for Students",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png",
    description:
      "Collaborative workspace for notes and projects—free Personal Pro plan for students.",
    category: "Productivity",
    value: 48,
  },
];

export default function Explore() {
  const [unlocked, setUnlocked] = useState<{ [bid: string]: boolean }>(() => {
    try {
      return JSON.parse(localStorage.getItem("unlockpack_benefits") || "{}");
    } catch {
      return {};
    }
  });

  function handleUnlock(id: string) {
    setUnlocked(u => {
      const next = { ...u, [id]: true };
      localStorage.setItem("unlockpack_benefits", JSON.stringify(next));
      return next;
    });
  }

  useEffect(() => {
    // Ensure unlocked states match localStorage on mount
    setUnlocked(u => {
      try {
        return { ...u, ...(JSON.parse(localStorage.getItem("unlockpack_benefits") || "{}")) };
      } catch {
        return u;
      }
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <Navbar />
      <main className="max-w-6xl mx-auto px-5 py-12">
        <h1 className="text-4xl font-bold mb-4 text-primary">
          Explore Student Benefits
        </h1>
        <p className="mb-7 text-muted-foreground text-lg">
          Browse top educational deals and software—click unlock to add benefits to your dashboard!
        </p>
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {demoBenefits.map(b => (
            <BenefitCard
              key={b.id}
              {...b}
              unlocked={!!unlocked[b.id]}
              onUnlock={() => handleUnlock(b.id)}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
