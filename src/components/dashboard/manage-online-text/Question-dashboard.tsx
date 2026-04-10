"use client";

import { QuestionCard } from "./Question-card";
import { useAppStore } from "@/store/useStore";

export default function QuestionDashboard() {
  const questions = useAppStore((state) => state.questions);

  return (
    <div className="container mx-auto py-5 px-4">
      {questions?.length === 0 ? (
        <p className="text-center text-slate-400">No questions added yet</p>
      ) : (
        questions?.map((q, index) => (
          <QuestionCard
            key={q.id}
            id={q.id}
            number={index + 1}
            correctAnswer={q.correctAnswer}
            type={
              q.type === "radio"
                ? "MCQ"
                : q.type === "checkbox"
                  ? "Checkbox"
                  : "Text"
            }
            points={q.score}
            questionText={q.question}
            options={q.options?.map((opt) => ({
              id: opt.label,
              text: opt.text,
              isCorrect: opt.isCorrect,
            }))}
          />
        ))
      )}
    </div>
  );
}
