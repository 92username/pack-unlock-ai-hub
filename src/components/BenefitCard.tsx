
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
  const [unlockConfirm, setUnlockConfirm] = useState("");
  const [showRevert, setShowRevert] = useState(false);
  const [revertConfirm, setRevertConfirm] = useState("");
  const unlockPhrase = `confirm-unlock-${id}`;
  const revertPhrase = `revert-unlock-${id}`;

  // Unlock modal - must confirm phrase before unlocking
  const handleUnlock = () => {
    setUnlockConfirm("");
    setShowUnlock(true);
  };

  function confirmUnlock() {
    if (unlockConfirm === unlockPhrase) {
      onUnlock?.();
      setShowUnlock(false);
    }
  }

  const handleRevert = () => {
    setRevertConfirm("");
    setShowRevert(true);
  };

  function confirmRevert() {
    if (revertConfirm === revertPhrase) {
      onRevert?.();
      setShowRevert(false);
    }
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
              <DialogContent>
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
                    <div className="mt-5 text-left text-sm">
                      To confirm activation, type: <br />
                      <b className="font-mono bg-muted rounded px-2 py-0.5">{unlockPhrase}</b>
                    </div>
                  </DialogDescription>
                </DialogHeader>
                <input
                  className="border rounded px-2 py-2 w-full mt-4 font-mono"
                  type="text"
                  value={unlockConfirm}
                  onChange={e => setUnlockConfirm(e.target.value)}
                  placeholder={unlockPhrase}
                  autoFocus
                />
                <DialogFooter>
                  <Button
                    className="w-full"
                    disabled={unlockConfirm !== unlockPhrase}
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
                  value={revertConfirm}
                  onChange={e => setRevertConfirm(e.target.value)}
                  placeholder={revertPhrase}
                  autoFocus
                />
                <DialogFooter>
                  <Button
                    className="w-full"
                    variant="destructive"
                    disabled={revertConfirm !== revertPhrase}
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
