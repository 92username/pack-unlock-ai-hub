
import BenefitCard from "./BenefitCard";
import { Benefit } from "@/data/unlockPackBenefits";

type SuggestedBenefit = {
  benefit: Benefit | undefined;
  reason: string;
};

type Props = {
  suggestions: SuggestedBenefit[];
  alreadyUnlocked: { [id: string]: boolean };
  onUnlock: (id: string) => void;
  onRevert: (id: string) => void;
};

export default function SuggestedBenefits({
  suggestions,
  alreadyUnlocked,
  onUnlock,
  onRevert,
}: Props) {
  // Filter out any item without a defined benefit
  const validSuggestions = Array.isArray(suggestions)
    ? suggestions.filter((s) => s && s.benefit)
    : [];

  if (!Array.isArray(suggestions) || validSuggestions.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-8">
        No personalized perks could be found at this time. Please try again later.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 gap-y-8 mb-8">
      {validSuggestions.map((s) => (
        <div key={s.benefit!.id} className="flex flex-col gap-2 mb-2">
          <BenefitCard
            {...s.benefit!}
            unlocked={!!alreadyUnlocked[s.benefit!.id]}
            onUnlock={() => onUnlock(s.benefit!.id)}
            onRevert={() => onRevert(s.benefit!.id)}
          />
          <div className="text-[13px] rounded bg-blue-50/80 p-2 font-medium border border-slate-200 text-blue-900 mt-2">
            <span className="font-bold">Why:</span>{" "}
            {s.reason || "Highly relevant to this career path."}
          </div>
        </div>
      ))}
    </div>
  );
}
