
export function EditorPlaceholder({ label }: { label?: string }) {
  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="bg-slate-50 border-b p-2 flex gap-4">
         <span className="text-xs text-slate-400">Normal text</span>
         <span className="font-bold text-xs">B</span>
         <span className="italic text-xs">I</span>
      </div>
      <div className="h-24 p-3 bg-white outline-none" contentEditable />
    </div>
  );
}