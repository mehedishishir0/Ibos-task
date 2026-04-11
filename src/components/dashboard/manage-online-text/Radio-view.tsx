"use client";

import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EditorPlaceholder } from "./Editor-placeholder";

type Option = {
  id: string;
  label: string;
  text: string;
  isCorrect: boolean;
};

interface Props {
  options: Option[];
  setOptions: React.Dispatch<React.SetStateAction<Option[]>>;
}

export function RadioView({ options, setOptions }: Props) {
  const addOption = () => {
    const nextLabel = String.fromCharCode(65 + options.length);

    setOptions((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        label: nextLabel,
        text: "",
        isCorrect: false,
      },
    ]);
  };

  const updateOption = (
    id: string,
    field: "text" | "isCorrect",
    value: string | boolean,
  ) => {
    setOptions((prev) =>
      prev.map((opt) =>
        opt.id === id
          ? { ...opt, [field]: value }
          : { ...opt, isCorrect: false },
      ),
    );
  };

  const removeOption = (id: string) => {
    if (options.length <= 1) return;
    setOptions((prev) => prev.filter((opt) => opt.id !== id));
  };

  return (
    <div className="space-y-6">
      {options.map((opt) => (
        <div key={opt.id} className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-7 w-7 rounded-full border-2 border-slate-300 flex items-center justify-center text-sm font-medium text-slate-600">
                {opt.label}
              </div>
              <label className="flex items-center gap-2 text-sm cursor-pointer select-none">
                <input
                  type="radio"
                  name="correctRadio"
                  checked={opt.isCorrect}
                  onChange={(e) =>
                    updateOption(opt.id, "isCorrect", e.target.checked)
                  }
                  className="border-slate-400"
                />
                Set as correct answer
              </label>
            </div>
            <Trash2
              size={18}
              className="text-slate-400 hover:text-red-500 cursor-pointer transition-colors"
              onClick={() => removeOption(opt.id)}
            />
          </div>

          <EditorPlaceholder
            value={opt.text}
            onChange={(text) => updateOption(opt.id, "text", text)}
          />
        </div>
      ))}

      <Button
        variant="ghost"
        onClick={addOption}
        className="text-[#6333FF] hover:text-[#5229d1] font-semibold p-0 h-auto text-sm"
      >
         <Plus className="text-[#6333FF]" /> Another Option
      </Button>
    </div>
  );
}
