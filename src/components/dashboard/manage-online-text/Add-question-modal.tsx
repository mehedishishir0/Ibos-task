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
import { v4 as uuidv4 } from "uuid";
import { useAppStore, type Question, type Option } from "@/store/useStore";

import { CheckboxView } from "./Checkbox-view";
import { RadioView } from "./Radio-view";
import { TextView } from "./Text-view";
import { EditorPlaceholder } from "./Editor-placeholder";
import { toast } from "sonner";
import QuestionDashboard from "./Question-dashboard";
import { useCreateQuze, useUpdateQuze } from "@/hooks/Apicalling";
import { useRouter, useSearchParams } from "next/navigation";

type QuestionType = "checkbox" | "radio" | "text";

export function AddQuestionModal() {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<QuestionType>("checkbox");
  const [score, setScore] = useState<number>(1);
  const [questionText, setQuestionText] = useState<string>("");
  const router = useRouter();

  const quzeMutation = useCreateQuze("");
  const updateQuzeMutation = useUpdateQuze("");
  const searchParams = useSearchParams();
  const id = searchParams.keys().next().value;

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
        toast.error(
          `Please select at least one correct answer for ${type} question!`,
        );
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

  const submiteData = async (action: string) => {
    const { basicInfo, questions } = useAppStore.getState();

    try {
      if (action === "create") {
        const res = await quzeMutation.mutateAsync({
          basicInfo,
          questions1: questions,
        });
        router.push(`/dashboard/manage-online-test?${res.data._id}`);
        return res.data;
      }

      if (action === "update") {
        if (!id) {
          toast.error("Quiz ID is required for update");
          return
        }
        const res = await updateQuzeMutation.mutateAsync({
          data: {
            basicInfo,
            questions1: questions,
          },
          id,
        });

        console.log("Updated:", res.data);
        return res.data;
      }
    } catch (error) {
      console.error("Submit Error:", error);
    }
  };

  return (
    <>
      {questions.length > 0 ? <QuestionDashboard /> : ""}
      {questions.length > 0 ? (
        <div className="flex justify-center">
          <Button
            onClick={() => {
              submiteData("update");
            }}
            className="px-10 py-6 bg-[#6333FF] text-white hover:bg-[#5229d1]"
          >
            Update
          </Button>
        </div>
      ) : (
        ""
      )}
      <div className="flex items-center justify-center mb-10"></div>
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
                <div className="h-8 w-8 rounded-full border border-[#9CA3AF] flex items-center justify-center text-[#334155] font-bold">
                  {questions.length + 1}
                </div>
                <h3 className="font-semibold text-[16px] text-[#334155]">
                  Question  {questions.length + 1}
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
                    <SelectItem className="outline-none hover:bg-gray-100" value="checkbox">
                      Checkbox
                    </SelectItem>
                    <SelectItem className="outline-none hover:bg-gray-100" value="radio">Radio </SelectItem>
                    <SelectItem className="outline-none hover:bg-gray-100" value="text">Text </SelectItem>
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
              {questions.length > 0 ? (
                <Button
                  onClick={() => {
                    handleSave(false);
                    submiteData("update");
                  }}
                  className="px-16 py-5 border border-[#6633FF] hover:text-white text-[#6633FF] hover:bg-[#5229d1]"
                >
                  Save
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    handleSave(false);
                    submiteData("create");
                  }}
                  className="px-16 py-5 border border-[#6633FF] hover:text-white text-[#6633FF] hover:bg-[#5229d1]"
                >
                  Save
                </Button>
              )}
              <Button
                onClick={() => handleSave(true)}
                className="px-10 py-5 bg-[#6333FF] text-white hover:bg-[#5229d1] text-[16px] font-semibold flex items-center gap-2"
              >
                Save & Add More
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
