
import Navbar from "@/components/Navbar";

const plans = [
  {
    name: "Free",
    icon: "💸",
    headline: "Always free",
    features: [
      "Full access to UnlockPack.AI",
      "Unlock & track student benefits",
      "Access to public GitHub repos with tutorials",
      "AI-assisted onboarding & benefit suggestions"
    ],
    button: {
      label: "Always Free",
      color: "bg-blue-100 text-blue-900 ring-1 ring-blue-200",
      disabled: true
    }
  },
  {
    name: "Pro",
    icon: "🚀",
    headline: "For students ready to go beyond activation",
    features: [
      "Everything in the Free plan",
      "Private GitHub repos with advanced dev tracks",
      "Real-world projects (Azure, front/backend)",
      "Plug-and-play learning environments (Codespaces-style)"
    ],
    button: {
      label: "Upgrade – Coming Soon",
      color: "bg-violet-200 text-violet-700",
      disabled: true
    }
  },
  {
    name: "Enterprise",
    icon: "🏢",
    headline: "For companies to engage with students",
    features: [
      "Everything in Pro",
      "Partner spotlight on UnlockPack",
      "Co-branded tutorials that distribute credits",
      "Strategic marketing via educational integration"
    ],
    button: {
      label: "Contact Us – Coming Soon",
      color: "bg-violet-100 text-violet-800",
      disabled: true
    }
  }
];

export default function Pricing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-2 md:px-0">
        <section className="w-full max-w-5xl py-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-8 text-primary">
            UnlockPack.AI Pricing
          </h1>
          <div className="grid sm:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className="flex flex-col border rounded-2xl bg-white/80 shadow-md p-6 items-center"
              >
                <div className="text-4xl mb-2">{plan.icon}</div>
                <h2 className="text-xl font-bold text-primary mb-1 text-center">{plan.name}</h2>
                <div className="text-muted-foreground mb-4 text-center font-medium text-sm">{plan.headline}</div>
                <ul className="mb-6 w-full flex-1 flex flex-col gap-3 text-sm text-muted-foreground">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1 h-2 w-2 rounded-full bg-blue-400" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-2 px-4 rounded-md font-semibold mt-auto ${plan.button.color} ${plan.button.disabled ? "cursor-not-allowed" : ""}`}
                  disabled={plan.button.disabled}
                >
                  {plan.button.label}
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
