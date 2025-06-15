import Navbar from "@/components/Navbar";
import OnboardingView from "@/components/OnboardingView";
import SuggestionsView from "@/components/SuggestionsView";
import useBenefitState from "@/hooks/useBenefitState";

export default function Index() {
  const {
    loading,
    showSuggestions,
    suggested,
    alreadyUnlocked,
    showAllBenefits,
    setShowAllBenefits,
    handleOnboardingSubmit,
    handleUnlock,
    handleRevert,
  } = useBenefitState();

  return (
    <div className="min-h-screen">
      <Navbar />
      {showSuggestions ? (
        <SuggestionsView
          suggested={suggested}
          alreadyUnlocked={alreadyUnlocked}
          onUnlock={handleUnlock}
          onRevert={handleRevert}
          showAllBenefits={showAllBenefits}
          setShowAllBenefits={setShowAllBenefits}
        />
      ) : (
        <OnboardingView loading={loading} onSubmit={handleOnboardingSubmit} />
      )}
    </div>
  );
}
