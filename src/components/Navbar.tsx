
import { Book, BookOpen, LayoutDashboard } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/explore", label: "Explore", icon: BookOpen },
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
];

export default function Navbar() {
  const location = useLocation();
  return (
    <nav className="flex items-center gap-8 border-b border-border bg-background/80 px-8 h-16">
      <Link
        to="/"
        className="flex items-center gap-2 text-2xl font-extrabold text-primary hover:text-violet-600 transition-colors"
      >
        <Book className="w-7 h-7 text-violet-600" />
        UnlockPack
        <span className="text-lg text-violet-400">.AI</span>
      </Link>
      <div className="flex items-center gap-6 ml-10">
        {navItems.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            className={cn(
              "flex items-center gap-2 text-lg font-medium px-2 py-1 rounded-md hover:bg-muted hover:text-primary transition-colors",
              location.pathname === to && "bg-muted text-primary"
            )}
          >
            <Icon className="w-5 h-5" />
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
