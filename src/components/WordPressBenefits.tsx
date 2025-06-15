
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

type Props = {
  benefits: Benefit[];
  unlocked: { [bid: string]: boolean };
  onUnlock?: (id: string) => void;
  onRevert?: (id: string) => void;
};

export default function WordPressBenefits({ benefits, unlocked, onUnlock, onRevert }: Props) {
  const wordpress = benefits.filter(b => b.provider === "WordPress");
  if (!wordpress.length) return null;
  return (
    <section>
      <h3 className="text-xl font-bold mb-2 mt-6">WordPress</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {wordpress.map(b => (
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
