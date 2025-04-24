import React, { useState } from "react";
import {
  Check,
  Lock,
  Clock,
  FileText,
  FilePen,
  ChevronDown,
} from "lucide-react";
import PDFViewer from "./PDFViewer";
import ExamDialog from "./ExamDialog";

interface Topic {
  id: string;
  title: string;
  duration?: number;
}

interface Week {
  week: string;
  topics: Topic[];
}

interface Course {
  videos: Week[];
}

function videoStatusMark(isWatched: boolean) {
  return isWatched ? (
    <span className="inline-flex items-center gap-1 text-[#22C55E] text-xs">
      <Check className="w-3 h-3" /> Completed
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 text-[#8E9196] text-xs">
      <Lock className="w-3 h-3" /> Not Started
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
  course: Course;
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
        <h3 className="text-lg font-bold text-[#1A1F2C] mb-10">
          Topics for This Course
        </h3>
        <div className="flex flex-col gap-4">
          <div className="relative">
            {/* Progress bar background */}
            <div className="w-full h-1.5 bg-[#E6E6E6] rounded-full">
              {/* Progress bar fill */}
              <div
                className="h-full rounded-full bg-[#6ABD8A] transition-all duration-300 ease-in-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            {/* Progress indicator */}
            <div
              className="absolute"
              style={{
                left: `${progressPercent}%`,
                transform: "translateX(-50%)",
                top: "-35px",
              }}
            >
              <div className="flex flex-col items-center">
                <div className="bg-white rounded-full p-1 shadow-sm border-2 border-[#C8C8C8]">
                  <div className="w-4 h-4 rounded-full bg-white text-[#485293] flex items-center justify-center text-[11px] font-medium">
                    You
                  </div>
                </div>
                <ChevronDown className="w-3 h-3 text-[#C8C8C8] -mt-0.5" />
              </div>
            </div>
            {/* Percentage text */}
            <div
              className="absolute text-xs font-medium text-[#485293]"
              style={{
                left: `${progressPercent}%`,
                transform: "translateX(-50%)",
                top: "calc(100% + 8px)",
              }}
            >
              {progressPercent}%
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-[#E5E7EB]">
        {course.videos.map((week: Week, weekIndex: number) => (
          <div
            key={week.week}
            className="border-b border-[#E5E7EB] last:border-b-0"
          >
            <div className="px-6 py-4">
              <h4 className="font-semibold text-sm text-[#1A1F2C]">
                {week.week}
              </h4>
              <p className="mt-1 text-xs text-[#6B7280] font-normal">
                Advanced story telling techniques for writers: Personas,
                Characters & Plots
              </p>
            </div>
            <div className="px-6 pb-4">
              <div className="divide-y divide-[#E5E7EB]">
                <button
                  onClick={() => handlePDFClick("/pdfs/introduction.pdf")}
                  className="flex items-center justify-between w-full text-sm text-[#1A1F2C] hover:text-[#4F46E5] transition-colors py-4"
                >
                  <span className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#6B7280]" />
                    Introduction
                  </span>
                  <Lock className="w-4 h-4 text-[#6B7280]" />
                </button>
                <button
                  onClick={() => handlePDFClick("/pdfs/course-overview.pdf")}
                  className="flex items-center justify-between w-full text-sm text-[#1A1F2C] hover:text-[#4F46E5] transition-colors py-4"
                >
                  <span className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#6B7280]" />
                    Course Overview
                  </span>
                  <Lock className="w-4 h-4 text-[#6B7280]" />
                </button>
                <button
                  onClick={() => handleExamClick(`week-${weekIndex + 1}`)}
                  className="flex items-center justify-between w-full text-sm text-[#1A1F2C] py-4"
                >
                  <span className="flex items-center gap-2">
                    <FilePen className="w-4 h-4 text-[#6B7280]" />
                    Course Overview
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="text-xs text-[#22C55E] bg-[#F0FDF4] px-2 py-0.5 rounded">
                      0 QUESTION
                    </span>
                    <span className="text-xs text-[#EF4444] bg-[#FEF2F2] px-2 py-0.5 rounded">
                      10 MINUTES
                    </span>
                  </span>
                </button>
                <button
                  onClick={() => handlePDFClick("/pdfs/reference-files.pdf")}
                  className="flex items-center justify-between w-full text-sm text-[#1A1F2C] hover:text-[#4F46E5] transition-colors py-4"
                >
                  <span className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#6B7280]" />
                    Course Exercise / Reference Files
                  </span>
                  <Lock className="w-4 h-4 text-[#6B7280]" />
                </button>
                <button
                  onClick={() => handlePDFClick("/pdfs/code-editor.pdf")}
                  className="flex items-center justify-between w-full text-sm text-[#1A1F2C] hover:text-[#4F46E5] transition-colors py-4"
                >
                  <span className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#6B7280]" />
                    Code Editor Installation (Optional if you have one)
                  </span>
                  <Lock className="w-4 h-4 text-[#6B7280]" />
                </button>
                <button
                  onClick={() => handlePDFClick("/pdfs/embedding-php.pdf")}
                  className="flex items-center justify-between w-full text-sm text-[#1A1F2C] hover:text-[#4F46E5] transition-colors py-4"
                >
                  <span className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#6B7280]" />
                    Embedding PHP in HTML
                  </span>
                  <Lock className="w-4 h-4 text-[#6B7280]" />
                </button>
              </div>
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
