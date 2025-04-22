
import React from "react";
import { Check, CircleDot, Clock } from "lucide-react";

function videoStatusMark(isWatched: boolean) {
  return isWatched
    ? <span className="inline-flex items-center gap-1 text-green-600"><Check className="w-4 h-4" /> Watched</span>
    : <span className="inline-flex items-center gap-1 text-gray-400"><CircleDot className="w-4 h-4" /> Not Watched</span>;
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
  <div className="bg-white rounded-xl shadow p-6 sticky top-6">
    <h3 className="text-lg font-bold mb-2">Topics for This Course</h3>
    <div className="flex items-center gap-3 mb-6">
      <div className="w-full h-2 bg-gray-100 rounded-full">
        <div
          className="h-2 rounded-full"
          style={{
            width: `${progressPercent}%`,
            background: "linear-gradient(90deg, #9b87f5 40%, #7E69AB 100%)",
            transition: "width 0.4s"
          }}
        />
      </div>
      <span className="text-xs font-semibold text-[#9b87f5]">{progressPercent}%</span>
    </div>
    {course.videos.map((week: any) => (
      <div key={week.week} className="mb-6">
        <div className="font-bold text-md mb-2 text-gray-800">{week.week}</div>
        <ul className="space-y-2">
          {week.topics.map((t: any) => (
            <li
              key={t.id}
              className={`flex items-center justify-between px-2 py-1.5 rounded cursor-pointer 
                 ${selectedId === t.id ? "bg-[#f1f0fb]" : "hover:bg-gray-50"} transition`}
              onClick={() => onSelect(t.id)}
            >
              <div className="flex items-center gap-2">
                <span className={`font-medium text-gray-900 ${watched[t.id] ? "line-through text-green-600" : ""}`}>
                  {t.title}
                </span>
                {watched[t.id] &&
                  <Check className="w-4 h-4 text-green-500 ml-1" />}
              </div>
              <span className="flex items-center gap-1 text-xs text-pink-400">
                <Clock className="w-4 h-4" /> {t.duration} MINUTES
              </span>
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
);

export default VideoListSidebar;

