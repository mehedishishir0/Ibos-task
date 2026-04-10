import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { EditorPlaceholder } from "./Editor-placeholder";

export function RadioView() {
  return (
    <div className="space-y-4">
      {[ 'A', 'B', 'C' ].map((label) => (
        <div key={label} className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-6 w-6 rounded-full border flex items-center justify-center text-xs text-slate-400">{label}</div>
              <label className="flex items-center gap-2 text-sm text-slate-500 cursor-pointer">
                <input type="radio" name="correct" className="rounded-full border-slate-300" />
                Set as correct answer
              </label>
            </div>
            <Trash2 size={16} className="text-slate-300 cursor-pointer" />
          </div>
          <EditorPlaceholder />
        </div>
      ))}
      <Button variant="ghost" className="text-purple-600 text-sm font-semibold p-0 h-auto">+ Another options</Button>
    </div>
  );
}