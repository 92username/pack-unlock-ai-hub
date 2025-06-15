import { BookOpen, LayoutDashboard } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
const navItems = [{
  to: "/explore",
  label: "Explore",
  icon: BookOpen
}, {
  to: "/dashboard",
  label: "Dashboard",
  icon: LayoutDashboard
}, {
  to: "/pricing",
  label: "Pricing",
  icon: null
}];
export default function Navbar() {
  const location = useLocation();
  return <nav className="flex items-center gap-8 border-b border-transparent bg-white/60 backdrop-blur-xl shadow-sm px-8 h-16 relative" style={{
    borderTop: '6px solid #EDEBFF',
    boxShadow: "0 0 24px 0 rgba(28,22,76,0.06)"
  }}>
      <Link to="/" className="flex items-center gap-2 text-2xl font-extrabold text-primary hover:text-[#9C6BFF] transition-colors">
        <img src="/lovable-uploads/fa7e8932-5d30-4650-a400-779a9be76572.png" alt="UnlockPack Logo" className="w-7 h-7" style={{
        display: "inline-block",
        marginRight: "0.1rem"
      }} />
        UnlockPack
        <span className="text-[#9C6BFF] text-2xl font-bold">.AI</span>
      </Link>
      <div className="flex items-center gap-6 ml-10">
        {navItems.map(({
        to,
        label,
        icon: Icon
      }) => <Link key={to} to={to} className={cn("flex items-center gap-2 text-lg font-medium px-2 py-1 rounded-md hover:bg-[#F3F6FF] hover:text-[#6A5AE0] transition-colors", location.pathname === to && "bg-[#F3F6FF] text-[#6A5AE0] font-bold shadow-sm")}>
            {Icon ? <Icon className="w-5 h-5" /> : null}
            {label}
          </Link>)}
      </div>
    </nav>;
}