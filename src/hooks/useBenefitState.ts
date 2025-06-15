
import { useState } from "react";
import useGptSuggestions from "@/hooks/useGptSuggestions";
import { unlockPackBenefits } from "@/data/unlockPackBenefits";
import { defaultCourseOptions, careerTracks } from "@/utils/constants";

interface BenefitMap { [bid: string]: boolean }

export default function useBenefitState() {
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showAllBenefits, setShowAllBenefits] = useState(false);
  const [suggested, setSuggested] = useState<any[]>([]);
  const [alreadyUnlocked, setAlreadyUnlocked] = useState<BenefitMap>(() => {
    try {
      return JSON.parse(localStorage.getItem("unlockpack_benefits") || "{}");
    } catch {
      return {};
    }
  });

  const { getSuggestions, gptLoading } = useGptSuggestions(unlockPackBenefits);

  const handleOnboardingSubmit = async (course: string, track: string) => {
    setLoading(true);
    setTimeout(async () => {
      localStorage.setItem("unlockpack_user", JSON.stringify({ course, track }));
      const res = await getSuggestions({ course, track });
      setSuggested(res);
      setLoading(false);
      setShowSuggestions(true);
    }, 700);
  };

  const handleUnlock = (id: string) => {
    setAlreadyUnlocked(prev => {
      const next = { ...prev, [id]: true };
      localStorage.setItem("unlockpack_benefits", JSON.stringify(next));
      return next;
    });
  };

  const handleRevert = (id: string) => {
    setAlreadyUnlocked(prev => {
      const next = { ...prev };
      delete next[id];
      localStorage.setItem("unlockpack_benefits", JSON.stringify(next));
      return next;
    });
  };

  return {
    loading,
    showSuggestions,
    suggested,
    alreadyUnlocked,
    showAllBenefits,
    setShowAllBenefits,
    handleOnboardingSubmit,
    handleUnlock,
    handleRevert,
  };
}
