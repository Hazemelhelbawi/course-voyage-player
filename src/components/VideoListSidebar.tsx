
import React, { useState } from "react";
import { Check, CircleDot, Clock, FileText, FilePen } from "lucide-react";
import PDFViewer from "./PDFViewer";
import ExamDialog from "./ExamDialog";

function videoStatusMark(isWatched: boolean) {
  return isWatched ? (
    <span className="inline-flex items-center gap-1 text-[#22C55E] text-xs">
      <Check className="w-3 h-3" /> Completed
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 text-[#8E9196] text-xs">
      <CircleDot className="w-3 h-3" /> Not Started
    </span>
  );
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
        <h3 className="text-lg font-bold text-[#1A1F2C] mb-4">
          Topics for This Course
        </h3>
        <div className="flex flex-col gap-2">
          <div className="relative h-2">
            <div className="w-full h-full bg-[#F1F0FB] rounded-full">
              <div
                className="h-full rounded-full bg-[#E5E0FC] transition-all duration-300 ease-in-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div 
              className="absolute"
              style={{ 
                left: `${progressPercent}%`, 
                transform: 'translateX(-50%)',
                top: '-20px'
              }}
            >
              <div className="flex flex-col items-center">
                <div className="bg-white rounded-full p-1 shadow-sm border border-[#E5E7EB]">
                  <div className="w-5 h-5 rounded-full bg-[#9B87F5] text-white flex items-center justify-center text-[10px] font-medium">
                    You
                  </div>
                </div>
                <div className="w-0.5 h-2 bg-[#E5E7EB] mt-1" />
              </div>
            </div>
            <div 
              className="absolute text-xs font-medium text-[#6B7280]"
              style={{ 
                left: `${progressPercent}%`, 
                transform: 'translateX(-50%)',
                top: '12px'
              }}
            >
              {progressPercent}%
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-[#E5E7EB]">
        {course.videos.map((week: any, weekIndex: number) => (
          <div
            key={week.week}
            className="border-b border-[#E5E7EB] last:border-b-0"
          >
            <div className="px-6 py-4 font-semibold text-sm text-[#1A1F2C] bg-[#F8F8F9]">
              {week.week}
              <p className="mt-1 text-xs text-[#6B7280] font-normal">
                Advanced story telling techniques for writers: Personas, Characters & Plots
              </p>
            </div>
            <div className="px-6 py-4">
              <div className="space-y-4">
                {weekIndex === 0 && (
                  <>
                    <button
                      onClick={() => handlePDFClick("/pdfs/week-overview.pdf")}
                      className="flex items-center justify-between w-full text-sm text-[#1A1F2C] hover:text-[#4F46E5] transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-[#6B7280]" />
                        Course Overview
                      </span>
                      <CircleDot className="w-4 h-4 text-[#6B7280]" />
                    </button>
                    <button
                      onClick={() => handleExamClick(`week-${weekIndex + 1}`)}
                      className="flex items-center justify-between w-full text-sm text-[#1A1F2C]"
                    >
                      <span className="flex items-center gap-2">
                        <FilePen className="w-4 h-4 text-[#6B7280]" />
                        Course Exercise
                      </span>
                      <span className="flex items-center gap-2 text-xs text-[#4F46E5]">
                        <span className="text-[#22C55E]">2 QUESTIONS</span>
                        <span className="text-[#EF4444]">10 MINUTES</span>
                      </span>
                    </button>
                  </>
                )}
              </div>
              <ul className="space-y-4 mt-4">
                {week.topics.map((t: any) => (
                  <li
                    key={t.id}
                    onClick={() => onSelect(t.id)}
                    className="flex items-center justify-between cursor-pointer group"
                  >
                    <div className="flex items-center gap-2">
                      <CircleDot className="w-4 h-4 text-[#6B7280] group-hover:text-[#4F46E5]" />
                      <span className="text-sm text-[#1A1F2C] group-hover:text-[#4F46E5]">
                        {t.title}
                      </span>
                    </div>
                    {t.duration && (
                      <span className="flex items-center gap-1 text-xs text-[#6B7280]">
                        <Clock className="w-3 h-3" /> {t.duration} min
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
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
