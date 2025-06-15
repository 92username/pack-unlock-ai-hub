
import BenefitCard from "./BenefitCard";

type Benefit = {
  id: string;
  name: string;
  provider: string;
  description: string;
  activationUrl: string;
  value: number;
  unlocked?: boolean;
  onUnlock?: () => void;
  onRevert?: () => void;
};

const relevantProviders = [
  "Design", 
  "Design Assets", 
  "Design Tools", 
  "Design & AI"
];

type Props = {
  benefits: Benefit[];
  unlocked: { [bid: string]: boolean };
  onUnlock?: (id: string) => void;
  onRevert?: (id: string) => void;
};

export default function DesignBenefits({ benefits, unlocked, onUnlock, onRevert }: Props) {
  const design = benefits.filter(b => relevantProviders.includes(b.provider));
  if (!design.length) return null;
  return (
    <section>
      <h3 className="text-xl font-bold mb-2 mt-6">Design & Creative Tools</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {design.map(b => (
          <BenefitCard
            key={b.id}
            {...b}
            unlocked={!!unlocked[b.id]}
            onUnlock={onUnlock ? () => onUnlock(b.id) : undefined}
            onRevert={onRevert ? () => onRevert(b.id) : undefined}
          />
        ))}
      </div>
    </section>
  );
}
