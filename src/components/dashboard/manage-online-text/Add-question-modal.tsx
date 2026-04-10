"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { CheckboxView } from "./Checkbox-view";
import { RadioView } from "./Radio-view";
import { TextView } from "./Text-view";
import { EditorPlaceholder } from "./Editor-placeholder";

type QuestionType = "checkbox" | "radio" | "text";

export function AddQuestionModal() {
  const [type, setType] = useState<QuestionType>("checkbox");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full text-white bg-[#6333FF] hover:bg-[#5229d1] py-6 rounded-xl text-md font-semibold">
          Add Question
        </Button>
      </DialogTrigger>
      <DialogContent className="!max-w-5xl p-0 overflow-hidden border-none rounded-3xl max-h-[90vh] overflow-y-auto">
        <div className="bg-white p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full border border-slate-300 flex items-center justify-center text-xs text-slate-500">
                1
              </div>
              <h3 className="font-bold text-[#3E4756]">Question 1</h3>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-500">Score:</span>
                <input
                  type="number"
                  defaultValue={1}
                  className="w-12 h-8 border rounded text-center text-sm"
                />
              </div>

              <Select
                value={type}
                onValueChange={(val: QuestionType) => setType(val)}
              >
                <SelectTrigger className="w-[120px] h-9">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="checkbox">Checkbox</SelectItem>
                  <SelectItem value="radio">Radio</SelectItem>
                  <SelectItem value="text">Text</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="ghost" size="icon" className="text-slate-400">
                <Trash2 size={18} />
              </Button>
            </div>
          </div>

          {/* Dynamic Question Body */}
          <div className="space-y-6">
            <EditorPlaceholder label="" />

            {type === "checkbox" && <CheckboxView />}
            {type === "radio" && <RadioView />}
            {type === "text" && <TextView />}
          </div>

          {/* Modal Footer */}
          <div className="flex justify-end gap-3 mt-8 pt-4 border-t">
            <Button
              variant="outline"
              className="px-10 border-purple-500 text-purple-600 rounded-xl"
            >
              Save
            </Button>
            <Button className="px-8 bg-[#6333FF] hover:bg-[#5229d1] rounded-xl">
              Save & Add More
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
