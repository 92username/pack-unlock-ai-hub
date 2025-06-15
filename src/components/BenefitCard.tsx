
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
  logo: string;
  description: string;
  activationUrl: string;
  category: string;
  value: number;
  unlocked?: boolean;
  onUnlock?: () => void;
  onRevert?: () => void;
};

export default function BenefitCard({
  name,
  id,
  logo,
  description,
  activationUrl,
  category,
  value,
  unlocked,
  onUnlock,
  onRevert,
}: Benefit) {
  const [showUnlock, setShowUnlock] = useState(false);
  const [showRevert, setShowRevert] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const revertPhrase = `revert-unlock-${id}`;

  // Open unlock modal and trigger onUnlock immediately
  const handleUnlock = () => {
    setShowUnlock(true);
    onUnlock?.();
  };

  const handleRevert = () => {
    setConfirmText("");
    setShowRevert(true);
  };

  const confirmRevert = () => {
    if (confirmText === revertPhrase) {
      onRevert?.();
      setShowRevert(false);
    }
  };

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
          <>
            <Button className="w-full mt-1" onClick={handleUnlock}>Unlock</Button>
            <Dialog open={showUnlock} onOpenChange={setShowUnlock}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Unlock {name}</DialogTitle>
                  <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <Button asChild className="w-full" >
                  <a href={activationUrl} target="_blank" rel="noopener noreferrer">
                    Go to activation site
                  </a>
                </Button>
                <DialogFooter>
                  <Button variant="outline" className="w-full mt-2" onClick={() => setShowUnlock(false)}>
                    Close
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
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Revert unlock for {name}?</DialogTitle>
                  <DialogDescription>
                    To confirm this action, type: <br />
                    <b className="font-mono bg-muted rounded px-2 py-0.5">{revertPhrase}</b>
                  </DialogDescription>
                </DialogHeader>
                <input
                  className="border rounded px-2 py-2 w-full mt-4 font-mono"
                  type="text"
                  value={confirmText}
                  onChange={e => setConfirmText(e.target.value)}
                  placeholder={revertPhrase}
                  autoFocus
                />
                <DialogFooter>
                  <Button
                    className="w-full"
                    variant="destructive"
                    disabled={confirmText !== revertPhrase}
                    onClick={confirmRevert}
                  >
                    Confirm Revert
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
