import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import useGptSuggestions from "@/hooks/useGptSuggestions";
import BenefitCard from "@/components/BenefitCard";
import { ChevronDown, ChevronUp } from "lucide-react";
import { unlockPackBenefits } from "@/data/unlockPackBenefits";
import OnboardingForm from "@/components/OnboardingForm";

// NEW total
const TOTAL_BENEFITS_VALUE = 82584;

const illustrationUrl =
  "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=cover&w=600&q=80";

// Replace defaultCourseOptions with just 3 options
const defaultCourseOptions = [
  "Tech",
  "Marketing",
  "Design",
];

const defaultCountries = [
  "United States",
  "United Kingdom",
  "India",
  "Canada",
  "Australia",
  "Other",
];

// Example tracks
const careerTracks = [
  "Frontend Developer",
  "Backend Developer",
  "DevOps Engineer",
  "UX Designer",
  "Data Analyst",
  "Product Manager",
  "Marketing",
  "Other",
];

// We'll use the full set of benefits for both suggestion and full grid
const unlockPackBenefitsOld = [
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

export default function Index() {
  // Remove onboarding-only state from here.
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showAllBenefits, setShowAllBenefits] = useState(false);
  const [suggested, setSuggested] = useState<any[]>([]);
  const [alreadyUnlocked, setAlreadyUnlocked] = useState<{ [bid: string]: boolean }>(() => {
    try {
      return JSON.parse(localStorage.getItem("unlockpack_benefits") || "{}");
    } catch {
      return {};
    }
  });
  const navigate = useNavigate();

  // GPT suggestions hook (returns array of {benefit, reason} from selection)
  const { getSuggestions, gptLoading } = useGptSuggestions(unlockPackBenefits);

  // New handler for onboarding form submission
  async function handleOnboardingSubmit(course: string, track: string) {
    setLoading(true);
    setTimeout(async () => {
      localStorage.setItem("unlockpack_user", JSON.stringify({ course, track }));
      const res = await getSuggestions({ course, track });
      setSuggested(res);
      setLoading(false);
      setShowSuggestions(true);
    }, 700);
  }

  // Handlers now update state and persist to localStorage
  function handleUnlock(id: string) {
    setAlreadyUnlocked(prev => {
      const next = { ...prev, [id]: true };
      localStorage.setItem("unlockpack_benefits", JSON.stringify(next));
      return next;
    });
    // Optionally, you could add a toast or analytics/track here
    // toast({title:"Benefit unlocked!"});
    // track("benefit_unlock", id);
  }

  function handleRevert(id: string) {
    setAlreadyUnlocked(prev => {
      const next = { ...prev };
      delete next[id];
      localStorage.setItem("unlockpack_benefits", JSON.stringify(next));
      return next;
    });
    // Optionally, also track here
    // track("benefit_revert", id);
  }

  // --- SUGGESTION VIEW: After onboarding ---
  if (showSuggestions) {
    return (
      <div className="bg-gradient-to-br from-white to-blue-50 min-h-screen h-full">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 pt-10 pb-20">
          <h1 className="text-3xl font-bold mb-3 text-primary text-center">
            Your tailored benefit picks
          </h1>
          <p className="mb-8 text-muted-foreground text-lg text-center">
            Based on your path: <span className="font-semibold text-primary">{JSON.parse(localStorage.getItem("unlockpack_user") || "{}")?.track || "Career Track"}</span>
            {gptLoading && <span className="ml-2">Loading recommendations...</span>}
          </p>
          {/* Suggestion cards & "Why" label grouped together */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 gap-y-8 mb-8">
            {suggested.map(s => (
              <div key={s.benefit.id} className="flex flex-col gap-2 mb-2">
                <BenefitCard
                  {...s.benefit}
                  unlocked={!!alreadyUnlocked[s.benefit.id]}
                  onUnlock={() => handleUnlock(s.benefit.id)}
                  onRevert={() => handleRevert(s.benefit.id)}
                />
                <div className="text-[13px] rounded bg-blue-50/80 p-2 font-medium border border-slate-200 text-blue-900 mt-2">
                  <span className="font-bold">Why:</span> {s.reason}
                </div>
              </div>
            ))}
          </div>
          {/* Add spacing above the next prompt */}
          <div className="mb-9 mt-8">
            <h3 className="font-semibold text-lg mb-2 mt-4">
              Want to explore everything you can unlock?
            </h3>
            <button
              className="flex items-center gap-2 bg-violet-100 hover:bg-violet-200 px-5 py-2 rounded-lg font-semibold text-violet-800 text-base mt-2 shadow transition"
              onClick={() => setShowAllBenefits(s => !s)}
            >
              {showAllBenefits ? <>Hide all benefits <ChevronUp className="w-4 h-4" /></>
                : <>Browse all 30+ available benefits <ChevronDown className="w-4 h-4" /></>
              }
            </button>
          </div>
          {showAllBenefits && (
            <div className="border rounded-2xl bg-white/90 p-3 md:p-5 mt-4">
              <h4 className="font-bold text-[19px] mb-4">All Student Benefits</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-2">
                {unlockPackBenefits.map(b => (
                  <BenefitCard
                    key={b.id}
                    {...b}
                    unlocked={!!alreadyUnlocked[b.id]}
                    onUnlock={() => handleUnlock(b.id)}
                    onRevert={() => handleRevert(b.id)}
                  />
                ))}
              </div>
            </div>
          )}
          <div className="max-w-xl mx-auto mt-7 text-center">
            <button
              className="bg-slate-900 text-white font-semibold px-7 py-2 rounded-md hover:bg-slate-800 transition"
              onClick={() => navigate("/dashboard")}
            >
              Go to My Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- ONBOARDING VIEW: First load ---
  if (!showSuggestions) {
    return (
      <div className="bg-gradient-to-br from-white to-blue-50 min-h-screen h-full">
        <Navbar />
        <OnboardingForm
          courseOptions={defaultCourseOptions}
          careerTracks={careerTracks}
          loading={loading}
          illustrationUrl={illustrationUrl}
          onSubmit={handleOnboardingSubmit}
        />
      </div>
    );
  }

  return null;
}
