import { useState } from "react";
type OnboardingFormProps = {
  courseOptions: string[];
  careerTracks: string[];
  loading: boolean;
  illustrationUrl: string;
  onSubmit: (course: string, track: string) => void;
};
export default function OnboardingForm({
  courseOptions,
  careerTracks,
  loading,
  illustrationUrl,
  onSubmit
}: OnboardingFormProps) {
  const [course, setCourse] = useState(courseOptions[0]);
  const [track, setTrack] = useState(careerTracks[0]);
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit(course, track);
  }
  return <div className="flex flex-col md:flex-row items-center justify-center gap-14 py-12 md:py-20 mx-auto max-w-5xl">      
      <div className="flex-1 flex flex-col items-center md:items-start gap-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-primary tracking-tight mb-1">
          Unlock over <span className="text-violet-700 font-extrabold">$82,584</span> in student benefits for your career.
        </h1>
        <p className="text-lg text-muted-foreground md:max-w-md mb-3">
          All you need is an academic email. Instantly access software, certifications, and learning tools used by professionals — for free.
        </p>
        <form onSubmit={handleSubmit} className="w-full max-w-md bg-white/80 border border-border shadow-lg rounded-2xl flex flex-col gap-4 px-6 py-8 animate-fade-in">
          <label className="text-base font-medium mb-1" htmlFor="course">
            Your Course
          </label>
          <select id="course" className="border border-muted rounded px-3 py-2" value={course} onChange={e => setCourse(e.target.value)} required>
            {courseOptions.map(option => <option key={option}>{option}</option>)}
          </select>
          <label className="text-base font-medium mb-1" htmlFor="track">
            Career Track
          </label>
          <select id="track" className="border border-muted rounded px-3 py-2" value={track} onChange={e => setTrack(e.target.value)} required>
            {careerTracks.map(option => <option key={option}>{option}</option>)}
          </select>
          <button type="submit" disabled={loading} className="w-full bg-violet-600 text-white font-semibold rounded py-2 mt-3 hover:bg-violet-700 transition-colors text-lg hover-scale">
            {loading ? "Loading suggestions..." : "Show me the perks 🚀"}
          </button>
        </form>
      </div>
      <div className="flex-1 flex justify-center items-center">
        <img src={illustrationUrl} alt="Student with laptop" className="rounded-3xl shadow-2xl w-full max-w-[370px] object-cover animate-scale-in" width={370} height={370} />
      </div>
    </div>;
}