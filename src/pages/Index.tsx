
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";

const illustrationUrl =
  "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=cover&w=600&q=80";

const defaultCourseOptions = [
  "Computer Science",
  "Engineering",
  "Art & Design",
  "Business",
  "Medicine",
  "Other",
];

const defaultCountries = [
  "United States",
  "United Kingdom",
  "India",
  "Canada",
  "Australia",
  "Other",
];

export default function Index() {
  const [course, setCourse] = useState(defaultCourseOptions[0]);
  const [country, setCountry] = useState(defaultCountries[0]);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleStart(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast({ title: "Please enter a valid email.", description: "We need your school email address to verify your student status.", });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      localStorage.setItem("unlockpack_user", JSON.stringify({ course, country, email }));
      navigate("/explore");
    }, 700);
  }
  return (
    <div className="bg-gradient-to-br from-white to-blue-50 min-h-screen h-full">
      <Navbar />
      <div className="flex flex-col md:flex-row items-center justify-center gap-14 py-12 md:py-20 mx-auto max-w-5xl">
        <div className="flex-1 flex flex-col items-center md:items-start gap-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-primary tracking-tight mb-1">
            Unlock free tech tools & software with <span className="text-violet-600">UnlockPack.AI</span>
          </h1>
          <p className="text-lg text-muted-foreground md:max-w-md mb-3">
            Discover and activate over $20,000+ in student benefits—from industry software and cloud credits to design tools and more. Eligibility made easy!
          </p>
          <form
            onSubmit={handleStart}
            className="w-full max-w-md bg-white/80 border border-border shadow-lg rounded-2xl flex flex-col gap-4 px-6 py-8 animate-fade-in"
          >
            <label className="text-base font-medium mb-1" htmlFor="course">
              Your Course
            </label>
            <select
              id="course"
              className="border border-muted rounded px-3 py-2"
              value={course}
              onChange={e => setCourse(e.target.value)}
              required
            >
              {defaultCourseOptions.map(option => (
                <option key={option}>{option}</option>
              ))}
            </select>
            <label className="text-base font-medium mb-1" htmlFor="country">
              Country
            </label>
            <select
              id="country"
              className="border border-muted rounded px-3 py-2"
              value={country}
              onChange={e => setCountry(e.target.value)}
              required
            >
              {defaultCountries.map(option => (
                <option key={option}>{option}</option>
              ))}
            </select>
            <label className="text-base font-medium mb-1" htmlFor="email">
              School Email
            </label>
            <input
              id="email"
              className="border border-muted rounded px-3 py-2"
              type="email"
              placeholder="you@student.edu"
              autoComplete="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-violet-600 text-white font-semibold rounded py-2 mt-3 hover:bg-violet-700 transition-colors text-lg hover-scale"
            >
              {loading ? "Loading..." : "Show me the perks 🚀"}
            </button>
          </form>
        </div>
        <div className="flex-1 flex justify-center items-center">
          <img
            src={illustrationUrl}
            alt="Student with laptop"
            className="rounded-3xl shadow-2xl w-full max-w-[370px] object-cover animate-scale-in"
            width={370}
            height={370}
          />
        </div>
      </div>
    </div>
  );
}
