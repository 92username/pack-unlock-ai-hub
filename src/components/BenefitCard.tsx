import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useState } from "react";

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

function requiresAcademicEmail(benefit: Benefit) {
  // Basic check for keywords/ids (customize as needed for real production)
  const idsNeedingEmail = [
    "github-student-pack",
    "jetbrains-student-pack",
    "azure-for-students",
    "notion-students",
    "1password-students",
    "mongodb-atlas-cert",
    "datadog-students",
    "blackfire-profiler",
    "github-foundations-cert",
    "dottech-domain",
  ];
  // This covers most academic benefits; extend as needed.
  return idsNeedingEmail.includes(benefit.id) ||
    (benefit.provider && /student|edu|academy|school|notion/i.test(benefit.provider)) ||
    /student|edu|academy|school|notion/.test(benefit.name);
}

export default function BenefitCard({
  name,
  id,
  provider,
  description,
  activationUrl,
  value,
  unlocked,
  onUnlock,
  onRevert,
}: Benefit) {
  const [showUnlock, setShowUnlock] = useState(false);
  const [showRevert, setShowRevert] = useState(false);

  // Unlock modal - opens with confirm/cancel buttons
  const handleUnlock = () => {
    setShowUnlock(true);
  };

  function confirmUnlock() {
    onUnlock?.();
    setShowUnlock(false);
  }

  const handleRevert = () => {
    setShowRevert(true);
  };

  function confirmRevert() {
    onRevert?.();
    setShowRevert(false);
  }

  return (
    <Card className="flex flex-col items-start gap-4 h-full shadow-md hover:shadow-xl border border-border transition-shadow duration-200 animate-fade-in">
      <div className="flex items-center gap-3 pt-3 pl-4 w-full">
        <div>
          <span className="text-lg font-bold block">{name}</span>
          <span className="text-xs font-medium text-muted-foreground">{provider}</span>
        </div>
      </div>
      <p className="px-4 text-sm text-muted-foreground min-h-[56px]">{description}</p>
      <div className="px-4 pb-4 mt-auto flex flex-col gap-2 w-full">
        <span className="text-green-600 font-semibold text-xs">${value} value</span>
        {!unlocked ? (
          <>
            <Button className="w-full mt-1" onClick={handleUnlock}>Unlock</Button>
            <Dialog open={showUnlock} onOpenChange={setShowUnlock}>
              <DialogContent className="bg-white text-gray-900 p-6 rounded-xl shadow-xl">
                <DialogHeader>
                  <DialogTitle>Unlock {name}</DialogTitle>
                  <DialogDescription>
                    {description}
                    <div className="mt-3">
                      <Button asChild>
                        <a href={activationUrl} target="_blank" rel="noopener noreferrer">
                          Go to activation site
                        </a>
                      </Button>
                    </div>
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  {requiresAcademicEmail({ id, name, provider, description, activationUrl, value }) && (
                    <div className="w-full text-sm text-orange-700 bg-orange-50 border border-orange-200 rounded-md p-3 mb-2 text-center">
                      Reminder: This benefit requires a valid academic email address (e.g., yourname@edu.com) to activate.
                    </div>
                  )}
                  <Button
                    className="w-full"
                    onClick={confirmUnlock}
                  >
                    Confirm Unlock
                  </Button>
                  <Button variant="outline" className="w-full mt-2" onClick={() => setShowUnlock(false)}>
                    Cancel
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </>
        ) : (
          <>
            <span className="w-full text-center text-sm text-primary font-medium py-1">Unlocked!</span>
            <Button variant="outline" className="w-full" onClick={handleRevert}>Revert</Button>
            <Dialog open={showRevert} onOpenChange={setShowRevert}>
              <DialogContent className="bg-white text-gray-900 p-6 rounded-xl shadow-xl">
                <DialogHeader>
                  <DialogTitle>Revert unlock for {name}?</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to revert and lock this benefit again?
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button
                    className="w-full"
                    variant="destructive"
                    onClick={confirmRevert}
                  >
                    Confirm Revert
                  </Button>
                  <Button variant="outline" className="w-full mt-2" onClick={() => setShowRevert(false)}>
                    Cancel
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </>
        )}
      </div>
    </Card>
  );
}
