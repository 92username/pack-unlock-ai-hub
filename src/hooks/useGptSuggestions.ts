
import { useState } from "react";

// Types
type UserInputs = {
  course: string;
  country: string;
  track: string;
};

type Benefit = {
  id: string;
  name: string;
  provider: string;
  description: string;
  activationUrl: string;
  value: number;
};

type GptSuggestionResult = Array<{ benefit: Benefit; reason: string }>;

// -- MOCK implementation for GPT-4o suggestion; replace with real API as needed
function useGptSuggestions(allBenefits: Benefit[]) {
  const [gptLoading, setGptLoading] = useState(false);

  async function getSuggestions({ course, country, track }: UserInputs): Promise<GptSuggestionResult> {
    setGptLoading(true);

    // For now, a static mapping; simulate real GPT selection
    let picks: string[] = [];

    if (track.toLowerCase().includes("frontend")) {
      picks = ["github-student-pack", "jetbrains-student-pack", "notion-students", "dottech-domain", "1password-students", "datadog-students"];
    } else if (track.toLowerCase().includes("devops")) {
      picks = ["github-student-pack", "datadog-students", "jetbrains-student-pack", "mongodb-atlas-cert", "azure-for-students", "blackfire-profiler"];
    } else if (track.toLowerCase().includes("ux")) {
      picks = ["github-student-pack", "notion-students", "dottech-domain", "jetbrains-student-pack", "1password-students", "github-foundations-cert"];
    } else if (track.toLowerCase().includes("data")) {
      picks = ["mongodb-atlas-cert", "github-student-pack", "azure-for-students", "datadog-students", "notion-students", "github-foundations-cert"];
    } else if (track.toLowerCase().includes("marketing")) {
      picks = ["github-student-pack", "notion-students", "dottech-domain", "jetbrains-student-pack", "github-foundations-cert", "azure-for-students"];
    } else {
      picks = allBenefits.slice(0, 6).map(x => x.id);
    }
    // Attach reasons (could be from GPT, but for now, example text)
    const REASONS: Record<string, string> = {
      "github-student-pack": "A must-have for devs: unlock premium GitHub features, hosting, and tools.",
      "jetbrains-student-pack": "Industry-best code editors like IntelliJ & PyCharm for deep learning and real projects.",
      "notion-students": "Plan, track, and manage your coursework and projects like a pro.",
      "dottech-domain": "Establish your public profile — get a free .TECH domain to showcase your portfolio.",
      "1password-students": "Safeguard all your passwords and secrets as you build professional skills.",
      "datadog-students": "Essential for modern monitoring and debugging in cloud/devops work.",
      "mongodb-atlas-cert": "Work with the most popular database in tech, plus certify your skills early.",
      "azure-for-students": "Experiment and deploy with free cloud credits — put your apps online.",
      "blackfire-profiler": "Advanced performance profiling for backend/devops on professional-grade tools.",
      "github-foundations-cert": "Prove your understanding of git, GitHub, and collaborative workflows.",
    }

    const results = picks.slice(0, 7).map(id => {
      const benefit = allBenefits.find(b => b.id === id)!;
      return {
        benefit,
        reason: REASONS[id] || "Highly relevant to this career path.",
      };
    });

    // Simulate latency
    await new Promise(res => setTimeout(res, 900));
    setGptLoading(false);
    return results;
  }

  return { getSuggestions, gptLoading };
}
export default useGptSuggestions;
