"use client";
import { useSingelGetQuze } from "@/hooks/Apicalling";
import React, { useState, useEffect } from "react";
import TimeoutModal from "./Timeout-modal";
import { useRouter } from "next/navigation";

interface Option {
  text: string;
  _id: string;
}

interface Question {
  _id: string;
  question: string;
  type: "radio" | "checkbox" | "text";
  options: Option[];
}

type AnswerValue = string | string[];

const QuizApp = ({ id }: { id: string }) => {
  const { data: apiResponse, isLoading } = useSingelGetQuze(id);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, AnswerValue>>({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [timerStarted, setTimerStarted] = useState(false);
  const router = useRouter();

  const quizData = apiResponse?.data;
  const questions: Question[] = quizData?.questions || [];
  const currentQuestion = questions[currentIndex];

  useEffect(() => {
    if (!quizData?.duration) return;

    const storageKey = `quiz_${id}_endTime`;
    const storedEndTime = localStorage.getItem(storageKey);

    if (storedEndTime) {
      const remaining = Math.floor((Number(storedEndTime) - Date.now()) / 1000);
      setTimeLeft(remaining > 0 ? remaining : 0);
    } else {
      const endTime = Date.now() + quizData.duration * 60 * 1000;
      localStorage.setItem(storageKey, endTime.toString());
      setTimeLeft(quizData.duration * 60);
    }
    setTimerStarted(true);
  }, [quizData, id]);

  useEffect(() => {
    const storageKey = `quiz_${id}_endTime`;

    const timer = setInterval(() => {
      const storedEndTime = localStorage.getItem(storageKey);

      if (!storedEndTime) return;

      const remaining = Math.floor((Number(storedEndTime) - Date.now()) / 1000);

      if (remaining <= 0) {
        setTimeLeft(0);
        clearInterval(timer);
      } else {
        setTimeLeft(remaining);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [id]);

  useEffect(() => {
    if (timerStarted && timeLeft === 0) {
      setOpen(true);
    }
  }, [timeLeft, timerStarted]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs} left`;
  };

  const handleInputChange = (value: string) => {
    const qId = currentQuestion._id;

    if (currentQuestion.type === "checkbox") {
      const currentSelection = (answers[qId] as string[]) || [];

      const newSelection = currentSelection.includes(value)
        ? currentSelection.filter((id) => id !== value)
        : [...currentSelection, value];

      setAnswers({ ...answers, [qId]: newSelection });
    } else {
      setAnswers({ ...answers, [qId]: value });
    }
  };

  const validateAnswer = () => {
    const qId = currentQuestion._id;
    const answer = answers[qId];

    if (currentQuestion.type === "radio") {
      if (!answer) return "Please select an option.";
    }

    if (currentQuestion.type === "checkbox") {
      if (!answer || (answer as string[]).length === 0) {
        return "Please select at least one option.";
      }
    }

    if (currentQuestion.type === "text") {
      if (!answer || (answer as string).trim() === "") {
        return "Answer cannot be empty.";
      }
    }

    return "";
  };

  const handleNext = () => {
    const validationError = validateAnswer();

    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      console.log("Final Submitted Data:", answers);
      router.push("/test-completed");
    }
  };

  if (isLoading || !quizData)
    return <div className="text-center p-10">Loading Quiz...</div>;

  return (
    <div className="min-h-screen flex  justify-center p-2 sm:p-4 bg-gray-50">
      <div className="w-full max-w-5xl mt-14">
        <div className="bg-white rounded-2xl border border-[#E5E7EB] p-4 sm:p-6 mb-4 sm:mb-6 flex flex-row justify-between items-center ">
          <h2 className="text-[#334155] sm:text-[20px] font-medium">
            Question ({currentIndex + 1}/{questions.length})
          </h2>

          <div className="bg-gray-100 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg font-bold text-gray-700 tabular-nums text-sm sm:text-base">
            {formatTime(timeLeft)}
          </div>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-t-lg border-t border-r border-l border-[#E5E7EB] min-h-[300px] sm:min-h-[350px]">
          <h1 className="text-[20px] font-semibold text-[#334155] mb-6">
            Q{currentIndex + 1}. {currentQuestion.question}
          </h1>

          <div className="space-y-3 sm:space-y-4">
            {currentQuestion.type === "radio" &&
              currentQuestion.options.map((opt) => (
                <label
                  key={opt._id}
                  className="flex items-center p-3 sm:p-4 border rounded-xl cursor-pointer hover:bg-gray-50 transition border-gray-200"
                >
                  <input
                    type="radio"
                    name={currentQuestion._id}
                    checked={answers[currentQuestion._id] === opt._id}
                    onChange={() => handleInputChange(opt._id)}
                    className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 focus:ring-indigo-500"
                  />
                  <div className="ml-3 text-sm sm:text-base text-gray-700">
                    {opt.text}{" "}
                  </div>
                </label>
              ))}

            {currentQuestion.type === "checkbox" &&
              currentQuestion.options.map((opt) => (
                <label
                  key={opt._id}
                  className="flex items-center p-3 sm:p-4 border rounded-xl cursor-pointer hover:bg-gray-50 transition border-gray-200"
                >
                  <input
                    type="checkbox"
                    checked={(
                      answers[currentQuestion._id] as string[]
                    )?.includes(opt._id)}
                    onChange={() => handleInputChange(opt._id)}
                    className="w-4 h-4 sm:w-5 sm:h-5 rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <div className="ml-3 text-sm sm:text-base text-[#334155]">
                    {opt.text}
                  </div>
                </label>
              ))}

            {currentQuestion.type === "text" && (
              <div className="border border-gray-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-indigo-500">
                <textarea
                  placeholder="Type your answer here..."
                  className="w-full p-3 sm:p-4 h-40 sm:h-48 focus:outline-none resize-none text-sm sm:text-base text-gray-700"
                  value={(answers[currentQuestion._id] as string) || ""}
                  onChange={(e) => handleInputChange(e.target.value)}
                />
              </div>
            )}

            {error && (
              <p className="text-red-500 text-xs sm:text-sm font-medium">
                {error}
              </p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-b-lg border-t-0 border-r border-l border-b border-[#E5E7EB] p-4 sm:p-6 flex flex-col sm:flex-row gap-3 sm:justify-between sm:items-center shadow-sm">
          <button
            type="button"
            className="order-2 sm:order-1 text-[#334155] font-semibold border border-[#E5E7EB] p-2.5 sm:p-3 rounded-xl hover:bg-gray-50 transition text-sm sm:text-base"
            onClick={() => {
              if (currentIndex === 0) {
                if (currentIndex < questions.length - 1) {
                  setCurrentIndex(currentIndex + 1);
                }
              } else {
                setCurrentIndex(currentIndex - 1);
              }
            }}
          >
            {currentIndex === 0 ? "Skip this Question" : "Previous"}
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="order-1 sm:order-2 bg-[#6633FF] hover:bg-[#5522EE] text-white px-6 sm:px-10 py-2.5 sm:py-3 rounded-xl font-semibold transition shadow-md text-sm sm:text-base"
          >
            {currentIndex === questions.length - 1
              ? "Finish & Submit"
              : "Save & Continue"}
          </button>
        </div>
      </div>

      <TimeoutModal
        isOpen={open}
        onClose={() => setOpen(false)}
        userName="shishir"
      />
    </div>
  );
};

export default QuizApp;
