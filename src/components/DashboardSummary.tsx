
import { BookOpen } from "lucide-react";
import Gauge from "./Gauge";

type Props = {
  totalValue: number;
  unlockedCount: number;
  allCount: number;
  goal: number;
};

export default function DashboardSummary({ totalValue, unlockedCount, allCount, goal }: Props) {
  return (
    <>
      <div className="flex flex-col md:flex-row gap-6 md:items-end my-8">
        <div className="flex-1 rounded-2xl bg-gradient-to-tr from-violet-500 to-violet-300 shadow-xl p-7 flex items-center gap-4 animate-fade-in">
          <BookOpen className="w-12 h-12 text-white flex-shrink-0" />
          <div>
            <div className="uppercase text-xs text-violet-100 font-bold tracking-widest mb-1">
              Total Value Unlocked
            </div>
            <div className="text-3xl md:text-4xl font-extrabold text-white drop-shadow">
              ${totalValue}
            </div>
            <div className="text-md text-violet-50 mt-1">
              {unlockedCount > 0
                ? `You've unlocked ${unlockedCount} / ${allCount} benefits!`
                : "Start unlocking benefits to see them here!"
              }
            </div>
          </div>
        </div>
      </div>
      <Gauge value={totalValue} goal={goal} />
    </>
  );
}
