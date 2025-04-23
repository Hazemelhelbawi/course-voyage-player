import React, { useState } from "react";
import { Check, CircleDot, Clock, FileText, FilePen } from "lucide-react";
import PDFViewer from "./PDFViewer";
import ExamDialog from "./ExamDialog";

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
}) => {
  const [isPDFOpen, setIsPDFOpen] = useState(false);
  const [isExamOpen, setIsExamOpen] = useState(false);
  const [currentPDFUrl, setCurrentPDFUrl] = useState("");
  const [currentExamId, setCurrentExamId] = useState("");

  const handlePDFClick = (url: string) => {
    setCurrentPDFUrl(url);
    setIsPDFOpen(true);
  };

  const handleExamClick = (examId: string) => {
    setCurrentExamId(examId);
    setIsExamOpen(true);
  };

  return (
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
        {course.videos.map((week: any, weekIndex: number) => (
          <div key={week.week} className="border-b border-[#E5E7EB] last:border-b-0">
            <div className="px-6 py-4 font-semibold text-sm text-[#1A1F2C] bg-[#F8F8F9]">
              {week.week}
              <div className="mt-2 space-y-2">
                {weekIndex === 0 && (
                  <>
                    <button
                      onClick={() => handlePDFClick("/path-to-your-overview.pdf")}
                      className="flex items-center gap-2 text-sm text-[#6366F1] hover:text-[#4F46E5] transition-colors"
                    >
                      <FileText className="w-4 h-4" />
                      Week Overview PDF
                    </button>
                    <button
                      onClick={() => handleExamClick(`week-${weekIndex + 1}`)}
                      className="flex items-center gap-2 text-sm text-[#6366F1] hover:text-[#4F46E5] transition-colors"
                    >
                      <FilePen className="w-4 h-4" />
                      Week Assessment
                    </button>
                  </>
                )}
              </div>
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

      <PDFViewer
        isOpen={isPDFOpen}
        onClose={() => setIsPDFOpen(false)}
        url={currentPDFUrl}
      />

      <ExamDialog
        isOpen={isExamOpen}
        onClose={() => setIsExamOpen(false)}
        examId={currentExamId}
      />
    </div>
  );
};

export default VideoListSidebar;
