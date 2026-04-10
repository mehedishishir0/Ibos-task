import { Trash2 } from "lucide-react";
import { EditorPlaceholder } from "./Editor-placeholder";

export function TextView() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="h-6 w-6 rounded-full border flex items-center justify-center text-xs text-slate-400">A</div>
          <Trash2 size={16} className="text-slate-300 cursor-pointer" />
        </div>
        <EditorPlaceholder />
      </div>
    </div>
  );
}