import React, { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, Timer } from "lucide-react";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface ExamDialogProps {
  isOpen: boolean;
  onClose: () => void;
  examId: string;
}

const ExamDialog = ({ isOpen, onClose, examId }: ExamDialogProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds

  // Load saved progress from sessionStorage
  useEffect(() => {
    const savedAnswers = sessionStorage.getItem(`exam-${examId}-answers`);
    const savedTime = sessionStorage.getItem(`exam-${examId}-time`);
    if (savedAnswers) {
      setAnswers(JSON.parse(savedAnswers));
    }
    if (savedTime) {
      setTimeLeft(parseInt(savedTime));
    }
  }, [examId]);

  // Save progress to sessionStorage
  useEffect(() => {
    sessionStorage.setItem(`exam-${examId}-answers`, JSON.stringify(answers));
    sessionStorage.setItem(`exam-${examId}-time`, timeLeft.toString());
  }, [answers, timeLeft, examId]);

  // Timer countdown
  useEffect(() => {
    if (isOpen && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isOpen, timeLeft]);

  const questions: Question[] = [
    {
      id: 1,
      question:
        "Among the following status of India, which one has the oldest rock formations in the country?",
      options: ["Assam", "Bahar", "Karnataka", "Uttar Pradesh"],
      correctAnswer: 1,
    },
    {
      id: 2,
      question:
        "Among the following status of India, which one has the oldest rock formations in the country?",
      options: ["Assam", "Bahar", "Karnataka", "Uttar Pradesh"],
      correctAnswer: 1,
    },
    {
      id: 3,
      question:
        "Among the following status of India, which one has the oldest rock formations in the country?",
      options: ["Assam", "Bahar", "Karnataka", "Uttar Pradesh"],
      correctAnswer: 1,
    },
  ];

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] w-[95vw] h-[90vh] p-0 bg-gradient-to-br from-[#9b87f5] to-[#6366F1]">
        <div className="h-full flex flex-col p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="rounded-full bg-white/20 hover:bg-white/30 text-white"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="bg-[#FFD700] text-[#1A1F2C] px-4 py-1.5 rounded-full font-medium flex items-center gap-2">
              <Timer className="h-4 w-4" />
              {formatTime(timeLeft)}
            </div>
          </div>

          {/* Question Navigation */}
          <div className="flex justify-center gap-3 mb-8">
            {questions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestion(index)}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all
                  ${
                    index === currentQuestion
                      ? "bg-white text-[#6366F1]"
                      : answers[index] !== undefined
                      ? "bg-white/90 text-[#6366F1]"
                      : "bg-white/20 text-white"
                  }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          {/* Question Container */}
          <div className="bg-white rounded-3xl p-8 flex-1">
            <h2 className="text-lg font-medium text-[#1A1F2C] mb-8">
              {currentQuestion + 1}. {questions[currentQuestion].question}
            </h2>

            <RadioGroup
              value={answers[currentQuestion]?.toString()}
              onValueChange={(value) =>
                setAnswers((prev) => ({
                  ...prev,
                  [currentQuestion]: parseInt(value),
                }))
              }
              className="space-y-3"
            >
              {questions[currentQuestion].options.map((option, index) => (
                <label
                  key={index}
                  className={`flex items-center p-4 rounded-xl cursor-pointer transition-all
                    ${
                      answers[currentQuestion] === index
                        ? "bg-[#6366F1] text-white"
                        : "bg-[#F8F9FE] hover:bg-[#F1F5F9]"
                    }`}
                >
                  <RadioGroupItem value={index.toString()} className="hidden" />
                  <span className="text-sm">{option}</span>
                </label>
              ))}
            </RadioGroup>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExamDialog;
