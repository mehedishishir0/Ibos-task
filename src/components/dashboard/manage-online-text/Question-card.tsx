"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { EditorPlaceholder } from "./Editor-placeholder";
import { useAppStore } from "@/store/useStore";
import { DeleteConfirmModal } from "./Delete-confirm-modal";

interface Option {
  id: string;
  text: string;
  isCorrect: boolean;
}

interface QuestionProps {
  id: string;
  number: number;
  type: "MCQ" | "Checkbox" | "Text";
  points: number;
  questionText: string;
  options?: Option[];
  correctAnswer?: string;
}

export function QuestionCard({
  id,
  number,
  type,
  points,
  questionText,
  options = [],
  correctAnswer = "",
}: QuestionProps) {
  const { updateQuestion, removeQuestion } = useAppStore();

  const [isEditing, setIsEditing] = useState(false);

  const [question, setQuestion] = useState(questionText);
  const [answer, setAnswer] = useState(correctAnswer);
  const [localOptions, setLocalOptions] = useState<Option[]>(options);

  const updateOptionText = (index: number, value: string) => {
    const updated = [...localOptions];
    updated[index].text = value;
    setLocalOptions(updated);
  };

  const toggleCorrect = (index: number) => {
    const updated = [...localOptions];

    if (type === "MCQ") {
      updated.forEach((o) => (o.isCorrect = false));
      updated[index].isCorrect = true;
    } else {
      updated[index].isCorrect = !updated[index].isCorrect;
    }

    setLocalOptions(updated);
  };

  useEffect(() => {
    setAnswer(correctAnswer || "");
  }, [correctAnswer]);

  const handleSave = () => {
    updateQuestion(id, {
      question,
      correctAnswer: answer,
      options: localOptions.map((opt) => ({
        ...opt,
        label: opt.id,
      })),
    });

    setIsEditing(false);
  };

  const handleRemove = () => {
      removeQuestion(id);
    };

  const displayAnswer = answer || correctAnswer || "";

  return (
    <Card className="w-full border-none shadow-sm rounded-2xl bg-white mb-6 overflow-hidden">
      {/* HEADER */}
      <CardHeader className="flex flex-row items-center justify-between border-b px-8 py-4">
        <span className="font-bold text-[#3E4756]">Question {number}</span>

        <div className="flex gap-2">
          <Badge>{type}</Badge>
          <Badge>{points} pt</Badge>
        </div>
      </CardHeader>

      <CardContent className="p-8">
        {isEditing ? (
          <EditorPlaceholder
            value={question}
            onChange={setQuestion}
            placeholder="Edit question..."
          />
        ) : (
          <h3
            className="text-[16px] font-bold text-[#3E4756] mb-6"
            dangerouslySetInnerHTML={{ __html: question }}
          />
        )}

        <div className="space-y-3">
          {type !== "Text" ? (
            localOptions.map((opt, index) => (
              <div
                key={opt.id}
                className={`flex my-4 items-center justify-between p-4 rounded-xl border ${
                  opt.isCorrect ? "bg-slate-50" : ""
                }`}
              >
                {isEditing ? (
                  <div className="w-full">
                    <EditorPlaceholder
                      value={opt.text}
                      onChange={(val) => updateOptionText(index, val)}
                      placeholder={`Option ${opt.id}`}
                    />
                  </div>
                ) : (
                  <span
                    dangerouslySetInnerHTML={{
                      __html: `${opt.id}. ${opt.text}`,
                    }}
                  />
                )}

                <button onClick={() => toggleCorrect(index)} className="ml-4">
                  {opt.isCorrect ? (
                    <CheckCircle2 className="text-green-500" />
                  ) : (
                    <div className="w-5 h-5 border rounded-full" />
                  )}
                </button>
              </div>
            ))
          ) : isEditing ? (
            <div className="mt-5">
              <EditorPlaceholder
                value={answer}
                onChange={setAnswer}
                placeholder="Edit answer..."
              />
            </div>
          ) : (
            <p
              className="text-sm italic border-red-700  text-slate-500"
              dangerouslySetInnerHTML={{
                __html: displayAnswer,
              }}
            />
          )}
        </div>

        <div className="flex items-center justify-between mt-8 pt-4 border-t">
          {isEditing ? (
            <Button onClick={handleSave} className="bg-[#6333FF] text-white">
              Save All Changes
            </Button>
          ) : (
            <Button
              variant="ghost"
              className="text-[#6333FF]"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </Button>
          )}
        <DeleteConfirmModal onConfirm={handleRemove}>
          <Button variant="ghost" className="text-red-500 hover:text-red-600">
            Remove From Exam
          </Button>
        </DeleteConfirmModal>
        </div>
      </CardContent>
    </Card>
  );
}
