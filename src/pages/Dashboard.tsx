
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
  {
    id: "gitpod-online-ide",
    name: "Gitpod Online IDE",
    provider: "Dev Tools",
    description: "Cloud-based development environment accessible anytime",
    activationUrl: "https://www.gitpod.io/github-student",
    value: 168,
  },
  {
    id: "scotch-virtual-labs",
    name: "Scotch Virtual Labs",
    provider: "Dev Training",
    description: "Access virtual development labs for practice and projects",
    activationUrl: "https://scotch.io/github-students",
    value: 99,
  },
  {
    id: "codeanywhere-cloud-editor",
    name: "Codeanywhere Cloud IDE",
    provider: "Dev Tools",
    description: "Collaborative cloud IDE for development on the go",
    activationUrl: "https://codeanywhere.com/github-students",
    value: 159,
  },
  {
    id: "cssscan-pro-inspector",
    name: "CSSScan Pro",
    provider: "Frontend Tools",
    description: "Inspect CSS with superpowers – Pro version for students",
    activationUrl: "https://getcssscan.com/github-students",
    value: 39,
  },
  {
    id: "pingdom-uptime-monitor",
    name: "Pingdom Uptime Monitor",
    provider: "Monitoring",
    description: "Website monitoring service with student access",
    activationUrl: "https://www.pingdom.com/github-students",
    value: 145,
  },
  // --- NEWLY ADDED BENEFITS ---
  {
    id: "1password-student-plan",
    name: "1Password for Students",
    provider: "Security",
    description: "Secure password manager, SSH key vault, and workflow tool — free for students",
    activationUrl: "https://1password.com/developers/students",
    value: 35.88,
  },
  {
    id: "browserstack-test-platform",
    name: "BrowserStack",
    provider: "Testing",
    description: "Run tests on real devices and browsers in the cloud",
    activationUrl: "https://www.browserstack.com/github-students",
    value: 2388,
  },
  {
    id: "bump-sh-api-docs",
    name: "Bump.sh",
    provider: "API Tools",
    description: "Auto-generated, versioned API documentation platform",
    activationUrl: "https://bump.sh/github-students",
    value: 5364,
  },
  {
    id: "codecov-coverage",
    name: "Codecov",
    provider: "CI/CD",
    description: "Code coverage and quality reporting tool",
    activationUrl: "https://about.codecov.io/github-students",
    value: 432,
  },
  {
    id: "codedex-gamified-coding",
    name: "Codédex",
    provider: "Learning Platforms",
    description: "Gamified programming courses and challenges",
    activationUrl: "https://www.codedex.io/github-students",
    value: 23.89,
  },
  {
    id: "codescene-analysis",
    name: "CodeScene",
    provider: "Code Analysis",
    description: "Code analysis and visualization platform",
    activationUrl: "#",
    value: 216,
  },
  {
    id: "configcat-feature-flags",
    name: "ConfigCat",
    provider: "DevOps Tools",
    description: "Feature flag service to control release rollouts",
    activationUrl: "#",
    value: 4320,
  },
  {
    id: "cryptolens-licensing",
    name: "CryptoLens",
    provider: "Software Licensing",
    description: "Tool to license and distribute your software",
    activationUrl: "https://cryptolens.io",
    value: 1782,
  },
  {
    id: "deepnote-notebooks",
    name: "Deepnote",
    provider: "Data Science",
    description: "Collaborative Jupyter notebooks in the cloud",
    activationUrl: "https://deepnote.com/education",
    value: 1782,
  },
  {
    id: "deepscan-js-analyzer",
    name: "DeepScan",
    provider: "Code Analysis",
    description: "JavaScript code analyzer for code quality and bug detection",
    activationUrl: "https://deepscan.io/github-students",
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
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
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
