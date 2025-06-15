import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import useGptSuggestions from "@/hooks/useGptSuggestions";
import BenefitCard from "@/components/BenefitCard";
import { ChevronDown, ChevronUp } from "lucide-react";

// NEW total
const TOTAL_BENEFITS_VALUE = 82584;

const illustrationUrl =
  "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=cover&w=600&q=80";

const defaultCourseOptions = [
  "Computer Science",
  "Engineering",
  "Art & Design",
  "Business",
  "Medicine",
  "Other",
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
    id: "nuvem-digital-ocean",
    name: "Nuvem",
    provider: "Digital Ocean",
    description: "Créditos",
    activationUrl: "", // activation_link: null
    value: 200,
  },
  {
    id: "nuvem-azure",
    name: "Nuvem",
    provider: "Azure",
    description: "Cŕeditos",
    activationUrl: "https://azure.microsoft.com/en-us/free/students/",
    value: 200,
  },
  {
    id: "hospedagem-de-aplicacoes",
    name: "Hospedagem de aplicaçoes",
    provider: "Heroku",
    description: "Cŕeditos",
    activationUrl: "", // activation_link: null
    value: 312,
  },
  {
    id: "ferramentas-e-servicos-microsoft",
    name: "Ferramentas e serviços Microsoft",
    provider: "Visual Studio",
    description: "Desconto 100%",
    activationUrl: "", // activation_link: null
    value: 8757,
  },
  {
    id: "monitoramento-em-nuvem",
    name: "Monitoramento em nuvem",
    provider: "New Relic",
    description: "Desconto 100%",
    activationUrl: "", // activation_link: null
    value: 3816,
  },
];

export default function Index() {
  const [course, setCourse] = useState(defaultCourseOptions[0]);
  const [track, setTrack] = useState(careerTracks[0]);
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

  // After onboarding, trigger suggestions
  async function handleStart(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(async () => {
      localStorage.setItem("unlockpack_user", JSON.stringify({ course, track }));
      // Fetch GPT suggestions
      const res = await getSuggestions({ course, track });
      setSuggested(res);
      setLoading(false);
      setShowSuggestions(true);
    }, 700);
  }

  function handleUnlock(id: string) {
    setAlreadyUnlocked(u => {
      const next = { ...u, [id]: true };
      localStorage.setItem("unlockpack_benefits", JSON.stringify(next));
      return next;
    });
  }
  function handleRevert(id: string) {
    setAlreadyUnlocked(u => {
      const next = { ...u };
      delete next[id];
      localStorage.setItem("unlockpack_benefits", JSON.stringify(next));
      return next;
    });
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
            Based on your path: <span className="font-semibold text-primary">{track}</span>
            {gptLoading && <span className="ml-2">Loading recommendations...</span>}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
            {suggested.map(s => (
              <div key={s.benefit.id}>
                <BenefitCard
                  {...s.benefit}
                  unlocked={!!alreadyUnlocked[s.benefit.id]}
                  onUnlock={() => handleUnlock(s.benefit.id)}
                  onRevert={() => handleRevert(s.benefit.id)}
                />
                <div className="text-[13px] mt-2 mb-6 rounded bg-blue-50/80 p-2 font-medium border border-slate-200 text-blue-900">
                  <span className="font-bold">Why:</span> {s.reason}
                </div>
              </div>
            ))}
          </div>
          <div className="mb-9">
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
  return (
    <div className="bg-gradient-to-br from-white to-blue-50 min-h-screen h-full">
      <Navbar />
      <div className="flex flex-col md:flex-row items-center justify-center gap-14 py-12 md:py-20 mx-auto max-w-5xl">
        <div className="flex-1 flex flex-col items-center md:items-start gap-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-primary tracking-tight mb-1">
            Unlock over <span className="text-violet-700">${TOTAL_BENEFITS_VALUE.toLocaleString()}</span> in student benefits for your career.
          </h1>
          <p className="text-lg text-muted-foreground md:max-w-md mb-3">
            All you need is an academic email. Instantly access software, certifications, and learning tools used by professionals — for free.
          </p>
          <form
            onSubmit={handleStart}
            className="w-full max-w-md bg-white/80 border border-border shadow-lg rounded-2xl flex flex-col gap-4 px-6 py-8 animate-fade-in"
          >
            <label className="text-base font-medium mb-1" htmlFor="course">
              Your Course
            </label>
            <select
              id="course"
              className="border border-muted rounded px-3 py-2"
              value={course}
              onChange={e => setCourse(e.target.value)}
              required
            >
              {defaultCourseOptions.map(option => (
                <option key={option}>{option}</option>
              ))}
            </select>
            <label className="text-base font-medium mb-1" htmlFor="track">
              Career Track
            </label>
            <select
              id="track"
              className="border border-muted rounded px-3 py-2"
              value={track}
              onChange={e => setTrack(e.target.value)}
              required
            >
              {careerTracks.map(option => (
                <option key={option}>{option}</option>
              ))}
            </select>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-violet-600 text-white font-semibold rounded py-2 mt-3 hover:bg-violet-700 transition-colors text-lg hover-scale"
            >
              {loading ? "Loading suggestions..." : "Show me the perks 🚀"}
            </button>
          </form>
        </div>
        <div className="flex-1 flex justify-center items-center">
          <img
            src={illustrationUrl}
            alt="Student with laptop"
            className="rounded-3xl shadow-2xl w-full max-w-[370px] object-cover animate-scale-in"
            width={370}
            height={370}
          />
        </div>
      </div>
    </div>
  );
}
