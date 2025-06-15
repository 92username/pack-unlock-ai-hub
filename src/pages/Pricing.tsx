
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Basic",
    price: (
      <>
        <span className="text-3xl font-extrabold tracking-tight">$0</span>
        <span className="ml-1 text-base font-medium text-[#B0B1CD]">/ month</span>
      </>
    ),
    description: "For students just starting out.",
    features: [
      "Full access to UnlockPack.AI",
      "Unlock & track student benefits",
      "Access to public GitHub repos with tutorials",
      "AI-assisted onboarding & benefit suggestions",
    ],
    buttonLabel: "Start for Free",
    buttonVariant: "default",
    highlight: false,
  },
  {
    name: "Pro",
    price: (
      <>
        <span className="text-3xl font-extrabold tracking-tight">$X</span>
        <span className="ml-1 text-base font-medium text-[#B0B1CD]">/ month</span>
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
    highlight: true,
  },
  {
    name: "Enterprise",
    price: (
      <span className="text-2xl font-extrabold tracking-tight">Custom pricing</span>
    ),
    description: "For companies to engage and support students.",
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
    <div className="min-h-screen bg-vertical-gradient flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-2 md:px-0">
        <section className="w-full max-w-6xl py-14">
          <h1 className="text-5xl md:text-6xl font-extrabold text-heading text-center mb-4 tracking-tight">Pricing</h1>
          <p className="text-lg text-subtle text-center mb-10 max-w-xl mx-auto font-normal">
            Free to launch, built to grow.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {plans.map((plan, i) => {
              const cardClasses = [
                "p-8 flex flex-col items-center text-center rounded-card border bg-white/70 shadow-glass transition-all",
                plan.highlight
                  ? "bg-gradient-to-b from-[#EDEBFF] via-[#D6CFFD] to-[#6A5AE0] text-white shadow-xl ring-2 ring-primary" +
                    " md:scale-105 z-10 pricing-card-shadow"
                  : "bg-white/60 text-heading shadow-card"
              ].join(" ");
              return (
                <div key={plan.name} className={cardClasses}>
                  <h2 className={"text-xl font-bold mb-2 " + (plan.highlight ? "text-primary" : "text-heading")}>
                    {plan.name}
                  </h2>
                  <div className={"mb-2 " + (plan.highlight ? "text-white" : "text-heading")}>{plan.price}</div>
                  <p className={"mb-6 font-medium " + (plan.highlight ? "text-white/80" : "text-body")}>{plan.description}</p>
                  <ul className={"mb-8 flex-1 flex flex-col gap-4 text-[15px] " + (plan.highlight ? "text-white" : "text-body")}>
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3 justify-center">
                        <span
                          className={
                            "block h-2.5 w-2.5 rounded-full " +
                            (plan.highlight
                              ? "bg-white/80"
                              : idx === 0
                              ? "bg-primary"
                              : "bg-accent")
                          }
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant={plan.buttonVariant as any}
                    className={[
                      "w-full h-12 font-semibold text-base rounded-lg mt-1 px-5 capitalize",
                      plan.highlight
                        ? "bg-primary text-white hover:brightness-110 shadow-lg"
                        : plan.buttonVariant === "outline"
                        ? "border-primary text-primary bg-white hover:bg-primary/10"
                        : ""
                    ].join(" ")}
                  >
                    {plan.buttonLabel}
                  </Button>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
