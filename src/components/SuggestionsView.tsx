
import SuggestedBenefits from "./SuggestedBenefits";
import AllBenefitsGrid from "./AllBenefitsGrid";
import { unlockPackBenefits } from "@/data/unlockPackBenefits";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Props = {
  suggested: any[];
  alreadyUnlocked: { [id: string]: boolean };
  onUnlock: (id: string) => void;
  onRevert: (id: string) => void;
  showAllBenefits: boolean;
  setShowAllBenefits: (v: boolean) => void;
};

const SuggestionsView = ({
  suggested,
  alreadyUnlocked,
  onUnlock,
  onRevert,
  showAllBenefits,
  setShowAllBenefits,
}: Props) => {
  const navigate = useNavigate();
  const userTrack = JSON.parse(localStorage.getItem("unlockpack_user") || "{}")?.track || "Career Track";
  return (
    <div className="max-w-4xl mx-auto px-4 pt-10 pb-20">
      <h1 className="text-3xl font-bold mb-3 text-primary text-center">
        Your tailored benefit picks
      </h1>
      <p className="mb-8 text-muted-foreground text-lg text-center">
        Based on your path: <span className="font-semibold text-primary">{userTrack}</span>
      </p>
      <SuggestedBenefits
        suggestions={suggested}
        alreadyUnlocked={alreadyUnlocked}
        onUnlock={onUnlock}
        onRevert={onRevert}
      />
      {/* Add spacing above the next prompt */}
      <div className="mb-9 mt-8">
        <h3 className="font-semibold text-lg mb-2 mt-4">
          Want to explore everything you can unlock?
        </h3>
        <button
          className="flex items-center gap-2 bg-violet-100 hover:bg-violet-200 px-5 py-2 rounded-lg font-semibold text-violet-800 text-base mt-2 shadow transition"
          onClick={() => setShowAllBenefits(!showAllBenefits)}
        >
          {showAllBenefits ? (
            <>
              Hide all benefits <ChevronUp className="w-4 h-4" />
            </>
          ) : (
            <>
              Browse all 30+ available benefits <ChevronDown className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
      {showAllBenefits && (
        <div className="border rounded-2xl bg-white/90 p-3 md:p-5 mt-4">
          <h4 className="font-bold text-[19px] mb-4">All Student Benefits</h4>
          <AllBenefitsGrid
            allBenefits={unlockPackBenefits}
            alreadyUnlocked={alreadyUnlocked}
            onUnlock={onUnlock}
            onRevert={onRevert}
          />
        </div>
      )}
      <div className="max-w-xl mx-auto mt-7 text-center">
        <button
          className="bg-slate-900 text-white font-semibold px-7 py-2 rounded-md hover:bg-slate-800 transition"
          onClick={() => navigate("/dashboard")}
        >
          Go to My Dashboard
        </button>
      </div>
    </div>
  );
};

export default SuggestionsView;
