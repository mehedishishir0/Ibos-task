"use client";

import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { useAppStore, type Question, type Option } from "@/store/useStore";

import { CheckboxView } from "./Checkbox-view";
import { RadioView } from "./Radio-view";
import { TextView } from "./Text-view";
import { EditorPlaceholder } from "./Editor-placeholder";
import { toast } from "sonner";
import QuestionDashboard from "./Question-dashboard";

type QuestionType = "checkbox" | "radio" | "text";

export function AddQuestionModal() {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<QuestionType>("checkbox");
  const [score, setScore] = useState<number>(1);
  const [questionText, setQuestionText] = useState<string>("");

  const [options, setOptions] = useState<Option[]>([]);
  const [correctAnswer, setCorrectAnswer] = useState<string>("");

  const { addQuestion, questions } = useAppStore();

  useEffect(() => {
    if (open) {
      setType("checkbox");
      setScore(1);
      setQuestionText("");
      setOptions([]);
      setCorrectAnswer("");
    }
  }, [open]);

  const handleSave = (isAddMore: boolean) => {
    if (!questionText.trim()) {
      toast.error("Question text is required!");
      return;
    }

    let newQuestion: Question;

    if (type === "text") {
      if (!correctAnswer.trim()) {
        toast.error("Please provide the correct answer for text question!");
        return;
      }

      newQuestion = {
        id: uuidv4(),
        type: "text",
        score,
        question: questionText.trim(),
        options: [],
        correctAnswer: correctAnswer.trim(),
      };
    } else {
      if (options.length === 0) {
       toast.error("Please add at least one option!");
        return;
      }

      const hasCorrect = options.some((opt) => opt.isCorrect);
      if (!hasCorrect) {
        toast.error(`Please select at least one correct answer for ${type} question!`);
        return;
      }

      newQuestion = {
        id: uuidv4(),
        type,
        score,
        question: questionText.trim(),
        options: [...options],
      };
    }

    addQuestion(newQuestion);

    if (isAddMore) {
      setQuestionText("");
      setOptions([]);
      setCorrectAnswer("");
    } else {
      setOpen(false);
    }
  };

  return (
   <>  
     <QuestionDashboard/>
   <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full text-white bg-[#6333FF] hover:bg-[#5229d1] py-6 rounded-xl text-md font-semibold">
          Add Question
        </Button>
      </DialogTrigger>

      <DialogContent className="!max-w-5xl p-0 overflow-hidden border-none rounded-3xl max-h-[92vh] overflow-y-auto">
        <div className="bg-white p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold">
                {questions.length + 1}
              </div>
              <h3 className="font-bold text-2xl text-[#3E4756]">
                Add Question
              </h3>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-500">Score:</span>
                <input
                  type="number"
                  value={score}
                  onChange={(e) =>
                    setScore(Math.max(1, Number(e.target.value) || 1))
                  }
                  className="w-16 h-7 border border-slate-300 rounded text-center focus:outline-none focus:border-[#6333FF]"
                />
              </div>

              <Select
                value={type}
                onValueChange={(val: QuestionType) => setType(val)}
              >
                <SelectTrigger className="w-[160px] h-7">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="checkbox">Checkbox (Multiple)</SelectItem>
                  <SelectItem value="radio">Radio (Single)</SelectItem>
                  <SelectItem value="text">Text Answer</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mb-8">
            <EditorPlaceholder
              value={questionText}
              onChange={setQuestionText}
            />
          </div>

          <div className="space-y-6">
            {type === "checkbox" && (
              <CheckboxView options={options} setOptions={setOptions} />
            )}
            {type === "radio" && (
              <RadioView options={options} setOptions={setOptions} />
            )}
            {type === "text" && (
              <TextView
                correctAnswer={correctAnswer}
                setCorrectAnswer={setCorrectAnswer}
              />
            )}
          </div>

          <div className="flex justify-end gap-3 mt-10 pt-6 border-t">
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              className="px-10"
            >
              Cancel
            </Button>
            <Button
              onClick={() => handleSave(false)}
              className="px-10 bg-[#6333FF] text-white hover:bg-[#5229d1]"
            >
              Save
            </Button>
            <Button
              onClick={() => handleSave(true)}
              className="px-10 bg-[#6333FF] text-white hover:bg-[#5229d1] flex items-center gap-2"
            >
              <Plus size={18} />
              Save & Add More
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
        
   </>
  );
}