
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Basic",
    price: (
      <>
        <span className="text-3xl font-extrabold tracking-tight">$0</span>
        <span className="ml-1 text-base font-medium text-gray-500">/ month</span>
      </>
    ),
    description: "Full access for students to unlock benefits fast.",
    features: [
      "Full access to UnlockPack.AI",
      "Unlock & track student benefits",
      "Access to public GitHub repos with tutorials",
      "AI-assisted onboarding & benefit suggestions",
    ],
    buttonLabel: "Start for Free",
    buttonVariant: "default",
    highlight: true,
  },
  {
    name: "Pro",
    price: (
      <>
        <span className="text-3xl font-extrabold tracking-tight">$X</span>
        <span className="ml-1 text-base font-medium text-gray-500">/ month</span>
      </>
    ),
    description: "For students ready to go beyond activation.",
    features: [
      "Everything in Basic",
      "Private GitHub repos with advanced dev tracks",
      "Real-world projects (Azure, frontend/backend)",
      "Codespaces-style plug-and-play repos",
    ],
    buttonLabel: "Upgrade",
    buttonVariant: "secondary",
    highlight: false,
  },
  {
    name: "Enterprise",
    price: (
      <span className="text-2xl font-extrabold tracking-tight">Custom pricing</span>
    ),
    description: "For companies to unlock student engagement.",
    features: [
      "Everything in Pro",
      "Partner spotlight inside UnlockPack",
      "Co-branded tutorials with credit distribution",
      "Strategic marketing via education",
    ],
    buttonLabel: "Get a Demo",
    buttonVariant: "outline",
    highlight: false,
  },
];

export default function Pricing() {
  return (
    <div
      className="min-h-screen bg-hero-gradient bg-no-repeat bg-cover flex flex-col"
    >
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-2 md:px-0">
        <section className="w-full max-w-6xl py-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-heading text-center mb-4">
            Choose your plan
          </h1>
          <p className="text-lg text-body text-center mb-10 max-w-2xl mx-auto">
            Unlock more with Pro and Enterprise. All plans include unlimited use of UnlockPack.AI.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan, i) => (
              <div
                key={plan.name}
                className={`
                  relative flex flex-col bg-white rounded-xl border shadow-card px-8 py-10 transition-all
                  ${plan.highlight
                    ? "border-primary bg-gradient-to-br from-gradient-start via-gradient-middle to-white scale-105 ring-2 ring-primary"
                    : "border-gray-200 bg-white"}
                  hover:shadow-lg
                `}
              >
                <h2 className="text-xl font-bold text-heading mb-2 text-center">{plan.name}</h2>
                <div className="mb-2 text-center">{plan.price}</div>
                <p className="mb-6 text-body text-center font-medium">{plan.description}</p>
                <ul className="mb-8 flex-1 flex flex-col gap-4 text-body text-[15px]">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  variant={plan.buttonVariant as any}
                  className={`
                    w-full h-12 font-semibold text-base rounded-lg 
                    ${plan.highlight ? "bg-primary text-white hover:bg-primary/90" : ""}
                  `}
                  disabled={plan.buttonLabel === "Upgrade" || plan.buttonLabel === "Get a Demo"}
                >
                  {plan.buttonLabel}
                </Button>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
