
import React from "react";
import { Check, CircleDot, Clock } from "lucide-react";

function videoStatusMark(isWatched: boolean) {
  return isWatched
    ? <span className="inline-flex items-center gap-1 text-[#22C55E] text-xs"><Check className="w-3 h-3" /> Completed</span>
    : <span className="inline-flex items-center gap-1 text-[#8E9196] text-xs"><CircleDot className="w-3 h-3" /> Not Started</span>;
}

const VideoListSidebar = ({
  course,
  watched,
  selectedId,
  onSelect,
  progressPercent,
}: {
  course: any;
  watched: Record<string, boolean>;
  selectedId: string;
  onSelect: (id: string) => void;
  progressPercent: number;
}) => (
  <div className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB]">
    <div className="p-6">
      <h3 className="text-lg font-bold text-[#1A1F2C] mb-2">Course Content</h3>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-full h-2 bg-[#F1F5F9] rounded-full overflow-hidden">
          <div
            className="h-full rounded-full bg-[#22C55E] transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <span className="text-xs font-medium text-[#22C55E]">{progressPercent}%</span>
      </div>
    </div>

    <div className="border-t border-[#E5E7EB]">
      {course.videos.map((week: any) => (
        <div key={week.week} className="border-b border-[#E5E7EB] last:border-b-0">
          <div className="px-6 py-4 font-semibold text-sm text-[#1A1F2C] bg-[#F8F8F9]">
            {week.week}
          </div>
          <ul className="p-4">
            {week.topics.map((t: any) => (
              <li
                key={t.id}
                onClick={() => onSelect(t.id)}
                className={`flex flex-col gap-2 p-3 rounded-xl cursor-pointer transition-colors
                  ${selectedId === t.id ? "bg-[#F1F5F9]" : "hover:bg-[#F8F8F9]"}`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className={`font-medium text-sm ${watched[t.id] ? "text-[#22C55E]" : "text-[#1A1F2C]"}`}>
                    {t.title}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-[#8E9196] whitespace-nowrap">
                    <Clock className="w-3 h-3" /> {t.duration} min
                  </span>
                </div>
                <div>{videoStatusMark(watched[t.id])}</div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </div>
);

export default VideoListSidebar;
