
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { X, Timer } from "lucide-react";

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

  // Sample questions (replace with your actual questions)
  const questions: Question[] = [
    {
      id: 1,
      question: "Among the following status of India, which one has the oldest rock formations in the country?",
      options: ["Assam", "Bahar", "Karnataka", "Uttar Pradesh"],
      correctAnswer: 1,
    },
    // Add more questions as needed
  ];

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  const handleAnswer = (questionIndex: number, answerIndex: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionIndex]: answerIndex,
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] w-[95vw] h-[90vh]">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2 text-lg font-semibold">
            <Timer className="w-5 h-5" />
            <span>{formatTime(timeLeft)}</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-full"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex justify-center mb-8">
          {questions.map((_, index) => (
            <div
              key={index}
              className={`w-8 h-8 rounded-full flex items-center justify-center mx-1 ${
                index === currentQuestion
                  ? "bg-[#6366F1] text-white"
                  : answers[index] !== undefined
                  ? "bg-[#22C55E] text-white"
                  : "bg-gray-200"
              }`}
            >
              {index + 1}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl p-6 mb-6">
          <h2 className="text-lg font-semibold mb-6">
            {questions[currentQuestion].question}
          </h2>
          <div className="space-y-4">
            {questions[currentQuestion].options.map((option, index) => (
              <div
                key={index}
                className={`flex items-center space-x-3 p-4 rounded-lg cursor-pointer border ${
                  answers[currentQuestion] === index
                    ? "border-[#6366F1] bg-[#F1F5F9]"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
                onClick={() => handleAnswer(currentQuestion, index)}
              >
                <Checkbox
                  checked={answers[currentQuestion] === index}
                  onCheckedChange={() => handleAnswer(currentQuestion, index)}
                />
                <span className="text-sm">{option}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          <Button
            onClick={() => setCurrentQuestion((prev) => Math.max(0, prev - 1))}
            disabled={currentQuestion === 0}
          >
            Previous
          </Button>
          <Button
            onClick={() => setCurrentQuestion((prev) => Math.min(questions.length - 1, prev + 1))}
            disabled={currentQuestion === questions.length - 1}
          >
            Next
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExamDialog;
