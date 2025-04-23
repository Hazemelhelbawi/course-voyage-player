
import React, { useState, useEffect } from "react";
import { Book, MessageSquare, HelpCircle, Award } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface VideoNavigationProps {
  onScrollToSection: (sectionId: string) => void;
}

const VideoNavigation = ({ onScrollToSection }: VideoNavigationProps) => {
  const [isQuestionOpen, setIsQuestionOpen] = useState(false);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);
  const [question, setQuestion] = useState("");

  // Load saved question from sessionStorage
  useEffect(() => {
    const savedQuestion = sessionStorage.getItem("draftQuestion");
    if (savedQuestion) {
      setQuestion(savedQuestion);
    }
  }, []);

  // Save question to sessionStorage when changed
  useEffect(() => {
    sessionStorage.setItem("draftQuestion", question);
  }, [question]);

  return (
    <div className="flex items-center justify-center gap-6 py-4 border-b border-[#E5E7EB]">
      <button
        onClick={() => onScrollToSection("curriculum")}
        className="flex flex-col items-center gap-1 text-[#8E9196] hover:text-[#6366F1] transition-colors"
      >
        <Book className="w-5 h-5" />
        <span className="text-xs">Curriculum</span>
      </button>

      <button
        onClick={() => onScrollToSection("comments")}
        className="flex flex-col items-center gap-1 text-[#8E9196] hover:text-[#6366F1] transition-colors"
      >
        <MessageSquare className="w-5 h-5" />
        <span className="text-xs">Comments</span>
      </button>

      <button
        onClick={() => setIsQuestionOpen(true)}
        className="flex flex-col items-center gap-1 text-[#8E9196] hover:text-[#6366F1] transition-colors"
      >
        <HelpCircle className="w-5 h-5" />
        <span className="text-xs">Ask Question</span>
      </button>

      <button
        onClick={() => setIsLeaderboardOpen(true)}
        className="flex flex-col items-center gap-1 text-[#8E9196] hover:text-[#6366F1] transition-colors"
      >
        <Award className="w-5 h-5" />
        <span className="text-xs">Leaderboard</span>
      </button>

      {/* Ask Question Dialog */}
      <Dialog open={isQuestionOpen} onOpenChange={setIsQuestionOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Ask a Question</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <Textarea
              placeholder="Type your question here..."
              className="min-h-[150px] resize-none"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
            <div className="flex justify-end">
              <Button
                onClick={() => setIsQuestionOpen(false)}
                className="bg-[#6366F1] hover:bg-[#4F46E5] text-white"
              >
                Submit Question
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Leaderboard Dialog */}
      <Dialog open={isLeaderboardOpen} onOpenChange={setIsLeaderboardOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Course Leaderboard</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            {/* Placeholder leaderboard content */}
            <div className="text-center text-[#8E9196]">
              Leaderboard content will be displayed here
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VideoNavigation;
