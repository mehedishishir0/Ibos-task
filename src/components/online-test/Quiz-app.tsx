"use client"
import { useSingelGetQuze } from '@/hooks/Apicalling';
import React, { useState, useEffect } from 'react';

// Types for better clarity
interface Option {
  text: string;
  _id: string;
}

interface Question {
  _id: string;
  question: string;
  type: 'radio' | 'checkbox' | 'text';
  options: Option[];
}

const QuizApp = ({ id }: { id: string }) => {
  // API theke data call kora hoche
  const { data: apiResponse, isLoading } = useSingelGetQuze(id);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [timeLeft, setTimeLeft] = useState(0);

  const quizData = apiResponse?.data;
  const questions: Question[] = quizData?.questions || [];
  const currentQuestion = questions[currentIndex];

  useEffect(() => {
    if (quizData?.duration) {
      setTimeLeft(quizData.duration * 60);
    }
  }, [quizData]);

  // Timer logic
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs} left`;
  };

  const handleInputChange = (value: string) => {
    const qId = currentQuestion._id;
    
    if (currentQuestion.type === 'checkbox') {
      const currentSelection = answers[qId] || [];
      const newSelection = currentSelection.includes(value)
        ? currentSelection.filter((id: string) => id !== value)
        : [...currentSelection, value];
      setAnswers({ ...answers, [qId]: newSelection });
    } else {
      setAnswers({ ...answers, [qId]: value });
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Shob data console log kora hoche submit er somoy
      console.log("Final Submitted Data:", answers);
      alert("Quiz Finished! Check console for result.");
    }
  };

  if (isLoading || !quizData) return <div className="text-center p-10">Loading Quiz...</div>;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        
        {/* Header Section */}
        <div className="bg-white rounded-t-lg border-b p-6 flex justify-between items-center shadow-sm">
          <h2 className="text-gray-600 font-medium">Question ({currentIndex + 1}/{questions.length})</h2>
          <div className="bg-gray-100 px-4 py-2 rounded-lg font-bold text-gray-700 tabular-nums">
            {formatTime(timeLeft)}
          </div>
        </div>

        {/* Question Body */}
        <div className="bg-white p-8 border-b min-h-[350px]">
          <div 
            className="text-xl font-semibold text-gray-800 mb-8"
            dangerouslySetInnerHTML={{ __html: `Q${currentIndex + 1}. ${currentQuestion.question}` }}
          />

          <div className="space-y-4">
            {/* Conditional Rendering based on Type */}
            {currentQuestion.type === 'radio' && currentQuestion.options.map((opt) => (
              <label key={opt._id} className="flex items-center p-4 border rounded-xl cursor-pointer hover:bg-gray-50 transition border-gray-200">
                <input
                  type="radio"
                  name={currentQuestion._id}
                  checked={answers[currentQuestion._id] === opt._id}
                  onChange={() => handleInputChange(opt._id)}
                  className="w-5 h-5 text-indigo-600 focus:ring-indigo-500"
                />
                <div className="ml-3 text-gray-700" dangerouslySetInnerHTML={{ __html: opt.text }} />
              </label>
            ))}

            {currentQuestion.type === 'checkbox' && currentQuestion.options.map((opt) => (
              <label key={opt._id} className="flex items-center p-4 border rounded-xl cursor-pointer hover:bg-gray-50 transition border-gray-200">
                <input
                  type="checkbox"
                  checked={answers[currentQuestion._id]?.includes(opt._id)}
                  onChange={() => handleInputChange(opt._id)}
                  className="w-5 h-5 rounded text-indigo-600 focus:ring-indigo-500"
                />
                <div className="ml-3 text-gray-700" dangerouslySetInnerHTML={{ __html: opt.text }} />
              </label>
            ))}

            {currentQuestion.type === 'text' && (
              <div className="border border-gray-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-indigo-500">
                <textarea
                  placeholder="Type your answer here..."
                  className="w-full p-4 h-48 focus:outline-none resize-none text-gray-700"
                  value={answers[currentQuestion._id] || ''}
                  onChange={(e) => handleInputChange(e.target.value)}
                />
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-white rounded-b-lg p-6 flex justify-between items-center shadow-sm">
          <button 
            type="button"
            className="text-gray-500 font-semibold hover:text-gray-700 transition"
            onClick={() => currentIndex > 0 ? setCurrentIndex(currentIndex - 1) : null}
          >
            {currentIndex === 0 ? "Skip this Question" : "Previous"}
          </button>
          
          <button 
            type="button"
            onClick={handleNext}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-3 rounded-xl font-semibold transition shadow-md"
          >
            {currentIndex === questions.length - 1 ? "Finish & Submit" : "Save & Continue"}
          </button>
        </div>

      </div>
    </div>
  );
};

export default QuizApp;