
import BenefitCard from "./BenefitCard";
import { Benefit } from "@/data/unlockPackBenefits";

type Props = {
  allBenefits: Benefit[];
  alreadyUnlocked: { [id: string]: boolean };
  onUnlock: (id: string) => void;
  onRevert: (id: string) => void;
};

export default function AllBenefitsGrid({
  allBenefits,
  alreadyUnlocked,
  onUnlock,
  onRevert,
}: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-2">
      {allBenefits.map((b) => (
        <BenefitCard
          key={b.id}
          {...b}
          unlocked={!!alreadyUnlocked[b.id]}
          onUnlock={() => onUnlock(b.id)}
          onRevert={() => onRevert(b.id)}
        />
      ))}
    </div>
  );
}
