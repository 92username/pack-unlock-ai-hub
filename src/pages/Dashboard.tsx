import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import BenefitCard from "@/components/BenefitCard";
import { BookOpen } from "lucide-react";
import Gauge from "@/components/Gauge";

const GOAL = 14587;

// Same list as Explore for data consistency
const unlockPackBenefits = [
  {
    id: "github-student-pack",
    name: "GitHub Student Pack",
    provider: "GitHub",
    description:
      "Premium developer tools, hosting, and learning resources for students.",
    activationUrl: "https://education.github.com/pack",
    value: 288,
  },
  {
    id: "jetbrains-student-pack",
    name: "JetBrains Student Pack",
    provider: "JetBrains",
    description:
      "Professional developer tools including IntelliJ IDEA and PyCharm, free with a student account.",
    activationUrl: "https://www.jetbrains.com/academy/student-pack/",
    value: 693,
  },
  {
    id: "azure-for-students",
    name: "Microsoft Azure for Students",
    provider: "Microsoft",
    description:
      "$100 in Azure credits, no credit card required, plus free select cloud and AI products.",
    activationUrl: "https://azure.microsoft.com/en-us/free/students/",
    value: 100,
  },
  {
    id: "1password-students",
    name: "1Password for Developers",
    provider: "1Password",
    description:
      "Unlimited password manager for student developers, free with school verification.",
    activationUrl: "https://1password.com/developers/students",
    value: 35,
  },
  {
    id: "dottech-domain",
    name: ".TECH Domain via GitHub Pack",
    provider: ".TECH",
    description:
      "One-year .TECH domain registration for free via GitHub Student Pack.",
    activationUrl: "https://get.tech",
    value: 9,
  },
  {
    id: "mongodb-atlas-cert",
    name: "MongoDB Atlas + Certification",
    provider: "MongoDB",
    description:
      "Cloud database and student access to MongoDB Associate Developer Certification.",
    activationUrl: "https://www.mongodb.com/students",
    value: 200,
  },
  {
    id: "notion-students",
    name: "Notion for Students",
    provider: "Notion",
    description: "Notion’s Plus Plan for free, with a verified student email.",
    activationUrl: "https://www.notion.com/product/notion-for-education",
    value: 360,
  },
  {
    id: "datadog-students",
    name: "Datadog for Students",
    provider: "Datadog",
    description:
      "Cloud monitoring and security platform — free student tier (inside GitHub Student Pack).",
    activationUrl: "https://education.github.com/pack",
    value: 360,
  },
  {
    id: "blackfire-profiler",
    name: "Blackfire.io Profiler",
    provider: "Blackfire.io",
    description:
      "Performance profiling for web apps; one year free for students.",
    activationUrl: "https://www.blackfire.io/students/",
    value: 12528,
  },
  {
    id: "github-foundations-cert",
    name: "GitHub Foundations Certification",
    provider: "GitHub",
    description:
      "Official certification exam access via MongoDB for student developers.",
    activationUrl: "https://www.mongodb.com/students",
    value: 49,
  },
  {
    id: "nuvem-digitalocean",
    name: "DigitalOcean Credits",
    provider: "Cloud",
    description: "Créditos para infraestrutura em nuvem",
    activationUrl: "https://www.digitalocean.com/github-students",
    value: 200,
  },
  {
    id: "nuvem-azure",
    name: "Microsoft Azure for Students",
    provider: "Cloud",
    description: "Créditos em serviços de nuvem Microsoft",
    activationUrl: "https://azure.microsoft.com/en-us/free/students/",
    value: 200,
  },
  {
    id: "heroku-hosting",
    name: "Heroku Hosting",
    provider: "Cloud Hosting",
    description: "Hospedagem de aplicações na nuvem",
    activationUrl: "https://www.heroku.com",
    value: 312,
  },
  {
    id: "visual-studio-devtools",
    name: "Visual Studio Tools (Microsoft Dev Essentials)",
    provider: "Dev Tools",
    description: "Acesso gratuito a ferramentas e IDEs da Microsoft",
    activationUrl: "https://visualstudio.microsoft.com/dev-essentials/",
    value: 8757,
  },
  {
    id: "new-relic-observability",
    name: "New Relic Observability Suite",
    provider: "Monitoring",
    description: "Ferramentas de monitoramento de aplicações",
    activationUrl: "https://newrelic.com/github-students",
    value: 3816,
  },
  {
    id: "bootstrap-studio-visual-site-builder",
    name: "Bootstrap Studio",
    provider: "Design",
    description: "Criação visual de sites com 100% de desconto para estudantes",
    activationUrl: "https://bootstrapstudio.io/student-discount",
    value: 29,
  },
  {
    id: "polypane-browser",
    name: "Polypane Browser",
    provider: "Frontend Tools",
    description: "Responsive development browser for modern frontend workflows",
    activationUrl: "https://polypane.app/education/",
    value: 144,
  },
  {
    id: "iconscout-library",
    name: "IconScout",
    provider: "Design Assets",
    description: "Access premium icons and illustrations 100% free",
    activationUrl: "https://iconscout.com/github-students",
    value: 179.88,
  },
  {
    id: "icons8-ai-tools",
    name: "Icons8",
    provider: "Design & AI",
    description: "Graphics, icons, and AI-powered tools for creatives",
    activationUrl: "https://icons8.com/github-students",
    value: 135,
  },
  {
    id: "visme-presentations",
    name: "Visme",
    provider: "Design Tools",
    description: "Design professional presentations with premium access",
    activationUrl: "https://www.visme.co/github-students/",
    value: 36.75,
  },
  {
    id: "themeisle-wp-themes",
    name: "Themeisle",
    provider: "WordPress",
    description: "Premium WordPress themes free for students",
    activationUrl: "https://themeisle.com/github-students/",
    value: 259,
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
    } catch {
      setUnlocked({});
    }
  }, []);

  // Add/Remove value when (re)calculating
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
                  unlockedBenefits.length > 0
                    ? `You've unlocked ${unlockedBenefits.length} / ${unlockPackBenefits.length} benefits!`
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
