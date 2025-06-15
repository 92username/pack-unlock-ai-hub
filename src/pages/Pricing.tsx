
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Basic",
    price: (
      <>
        <span className="text-3xl font-extrabold tracking-tight text-[#1A1831]">$0</span>
        <span className="ml-1 text-base font-medium text-[#7B82A0]">/ month</span>
      </>
    ),
    description: "Full access to UnlockPack.AI",
    features: [
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
        <span className="text-3xl font-extrabold tracking-tight text-black">$X</span>
        <span className="ml-1 text-base font-medium text-black/60">/ month</span>
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
    buttonVariant: "primary",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: (
      <span className="text-2xl font-extrabold tracking-tight text-[#1A1831]">Custom pricing</span>
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
              const isPro = plan.name === "Pro";
              const cardClasses = [
                "p-8 flex flex-col items-center text-center rounded-card border bg-white/70 shadow-glass transition-all",
                plan.highlight
                  ? "relative overflow-hidden bg-gradient-to-b from-[#F3F6FF] via-[#EDEBFF] to-[#B6A7F7] ring-2 ring-[#6A5AE0] md:scale-105 z-10"
                  : "bg-white/60 text-heading shadow-card"
              ].join(" ");
              return (
                <div key={plan.name} className={cardClasses}>
                  <h2
                    className={
                      "text-xl font-bold mb-2 " +
                      (plan.highlight
                        ? "text-[#6A5AE0]"
                        : "text-[#1A1831]")
                    }
                  >
                    {plan.name}
                  </h2>
                  <div className={"mb-2 " + (plan.highlight ? "text-black" : "text-[#1A1831]")}>{plan.price}</div>
                  <p
                    className={
                      "mb-6 font-medium text-base " +
                      (isPro ? "text-black/70" : plan.highlight ? "text-white/80" : "text-body")
                    }
                  >
                    {plan.description}
                  </p>
                  <ul
                    className={[
                      "mb-8 flex-1 flex flex-col gap-4 text-[15px] font-medium",
                      isPro ? "text-black" : plan.highlight ? "text-white" : "text-body",
                    ].join(" ")}
                  >
                    {plan.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-3 justify-center"
                      >
                        <span
                          className={
                            "block h-2.5 w-2.5 rounded-full " +
                            (isPro
                              ? "bg-black"
                              : plan.highlight
                              ? "bg-[#6A5AE0]"
                              : idx === 0
                              ? "bg-primary"
                              : "bg-accent")
                          }
                        />
                        <span className={isPro ? "text-black" : ""}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant={plan.buttonVariant as any}
                    className={[
                      "w-full h-12 font-semibold text-base rounded-xl mt-1 px-5 capitalize shadow-lg",
                      plan.highlight
                        ? "bg-[#6A5AE0] text-white hover:brightness-110"
                        : plan.buttonVariant === "outline"
                        ? "border-primary text-primary bg-white hover:bg-primary/10"
                        : ""
                    ].join(" ")}
                  >
                    {plan.buttonLabel}
                  </Button>
                  {/* Add faint border-radius like in Agent.AI for Pro */}
                  {plan.highlight && (
                    <div className="absolute inset-0 pointer-events-none rounded-card border border-[#BFBFF2]"></div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
