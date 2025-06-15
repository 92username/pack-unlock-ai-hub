
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Benefit = {
  id: string;
  name: string;
  logo: string;
  description: string;
  category: string;
  value: number;
  unlocked?: boolean;
  onUnlock?: () => void;
};

export default function BenefitCard({
  name,
  logo,
  description,
  category,
  value,
  unlocked,
  onUnlock,
}: Benefit) {
  return (
    <Card className="flex flex-col items-start gap-4 h-full shadow-md hover:shadow-xl border border-border transition-shadow duration-200 animate-fade-in">
      <div className="flex items-center gap-3 pt-3 pl-4">
        <img src={logo} alt={`${name} logo`} className="w-10 h-10 object-contain rounded" />
        <span className="text-lg font-bold">{name}</span>
      </div>
      <p className="px-4 text-sm text-muted-foreground min-h-[56px]">{description}</p>
      <div className="px-4 pb-4 mt-auto flex flex-col gap-2 w-full">
        <div className="flex items-center justify-between text-xs">
          <span className="rounded-full px-2 py-0.5 bg-secondary text-secondary-foreground">
            {category}
          </span>
          <span className="text-green-600 font-semibold">${value} value</span>
        </div>
        {!unlocked ? (
          <Button className="w-full mt-1" onClick={onUnlock}>
            Unlock
          </Button>
        ) : (
          <span className="w-full text-center text-sm text-primary font-medium py-1">Unlocked!</span>
        )}
      </div>
    </Card>
  );
}
