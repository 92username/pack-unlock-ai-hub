
import OnboardingForm from "./OnboardingForm";
import { illustrationUrl, defaultCourseOptions, careerTracks } from "@/utils/constants";

type Props = {
  loading: boolean;
  onSubmit: (course: string, track: string) => void;
};

const OnboardingView = ({ loading, onSubmit }: Props) => (
  <OnboardingForm
    courseOptions={defaultCourseOptions}
    careerTracks={careerTracks}
    loading={loading}
    illustrationUrl={illustrationUrl}
    onSubmit={onSubmit}
  />
);

export default OnboardingView;
