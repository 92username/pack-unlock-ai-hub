
import Navbar from "@/components/Navbar";

const plans = [
  {
    name: "Free",
    description: "Always free",
    features: [
      "Full access to the UnlockPack.AI platform",
      "Ability to unlock and track student benefits",
      "Access to all public GitHub repositories with basic tutorials",
      "AI-assisted onboarding and benefit suggestions",
    ],
    badge: null,
    highlight: "bg-white border-blue-200 shadow-md",
  },
  {
    name: "Pro",
    description: "Ideal for students ready to go beyond activation and build real apps",
    features: [
      "Everything in the Free plan",
      "Early access to private GitHub repositories with advanced dev tracks",
      "Advanced career-oriented projects (e.g., real-world frontend/backend setups on Azure)",
      "Premium codebases with plug-and-play environments (Codespaces-style)",
      "Priority support and mentorship perks",
    ],
    badge: "Coming Soon",
    highlight: "bg-gradient-to-t from-blue-50 to-white border-blue-400 shadow-lg",
  },
  {
    name: "Enterprise",
    description: "Direct engagement and integration opportunities for partners",
    features: [
      "Everything in the Pro plan",
      "Custom onboarding and spotlight for partner companies",
      "Ability to feature your service (e.g. Hostinger, Vercel) inside UnlockPack",
      "Co-branded tutorials that give credits to students in exchange for visibility",
      "Strategic marketing through educational integration",
    ],
    badge: "Coming Soon",
    highlight: "bg-gradient-to-t from-violet-50 to-white border-violet-500 shadow-xl",
  },
];

export default function Pricing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-extrabold text-center mb-4 text-primary">Choose Your Plan</h1>
        <p className="text-muted-foreground text-center mb-12 text-lg">Unlock more opportunities for students, mentors, and partners.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <div
              key={plan.name}
              className={`relative border rounded-2xl p-8 flex flex-col items-center ${plan.highlight} transition-all`}
            >
              {plan.badge && (
                <span className="absolute top-5 right-5 bg-yellow-400 text-xs font-bold text-yellow-900 px-3 py-1 rounded-full">
                  {plan.badge}
                </span>
              )}
              <h2 className="text-2xl font-bold mb-2 text-primary">{plan.name}</h2>
              <p className="mb-4 text-muted-foreground font-medium">{plan.description}</p>
              <ul className="mb-6 flex-1 flex flex-col gap-3 text-sm text-start">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="inline-block w-3 h-3 rounded-full bg-blue-400 mr-2" />
                    {f}
                  </li>
                ))}
              </ul>
              {plan.name === "Free" && (
                <span className="inline-block py-2 px-5 rounded-md font-semibold bg-blue-100 text-blue-900 ring-1 ring-blue-200">
                  Always Free
                </span>
              )}
              {plan.name === "Pro" && (
                <button
                  className="py-2 px-5 rounded-md font-semibold bg-violet-200 text-violet-700 cursor-not-allowed"
                  disabled
                >
                  Upgrade (Coming Soon)
                </button>
              )}
              {plan.name === "Enterprise" && (
                <button
                  className="py-2 px-5 rounded-md font-semibold bg-violet-100 text-violet-800 cursor-not-allowed"
                  disabled
                >
                  Contact Us (Coming Soon)
                </button>
              )}
            </div>
          ))}
        </div>
        <div className="mt-12 text-center text-muted-foreground text-xs">
          Interested in partnership or early access?{" "}
          <a href="mailto:hello@unlockpack.ai" className="underline text-blue-800 font-medium">Contact us</a>
        </div>
      </div>
    </div>
  );
}
