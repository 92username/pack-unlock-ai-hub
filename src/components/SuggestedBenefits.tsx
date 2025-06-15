
import BenefitCard from "./BenefitCard";

type SuggestedBenefit = {
  benefit: {
    id: string;
    name: string;
    provider: string;
    description: string;
    activationUrl: string;
    value: number;
  };
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
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 gap-y-8 mb-8">
      {suggestions.map((s) => (
        <div key={s.benefit.id} className="flex flex-col gap-2 mb-2">
          <BenefitCard
            {...s.benefit}
            unlocked={!!alreadyUnlocked[s.benefit.id]}
            onUnlock={() => onUnlock(s.benefit.id)}
            onRevert={() => onRevert(s.benefit.id)}
          />
          <div className="text-[13px] rounded bg-blue-50/80 p-2 font-medium border border-slate-200 text-blue-900 mt-2">
            <span className="font-bold">Why:</span> {s.reason}
          </div>
        </div>
      ))}
    </div>
  );
}
