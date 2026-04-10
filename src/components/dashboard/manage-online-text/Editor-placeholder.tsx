"use client";

import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { Bold, Italic, List, ListOrdered, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  label?: string;
  value?: string;
  onChange?: (val: string) => void;
  placeholder?: string;
}

export function EditorPlaceholder({
  label = "Question",
  value = "",
  onChange,
  placeholder = "Write your question or option here...",
}: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: { HTMLAttributes: { class: "list-disc pl-6" } },
        orderedList: { HTMLAttributes: { class: "list-decimal pl-6" } },
      }),
      Placeholder.configure({
        placeholder: placeholder,
      }),
    ],
    content: value || "",
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange?.(html);
    },
    editable: true,
  });

  React.useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || "");
    }
  }, [value, editor]);

  if (!editor) {
    return (
      <div className="border border-slate-300 rounded-xl bg-white min-h-[140px] flex items-center justify-center">
        <span className="text-slate-400 text-sm">Loading editor...</span>
      </div>
    );
  }

  return (
    <div className="border border-slate-300 rounded-xl overflow-hidden bg-white">
      <div className="bg-slate-50 border-b p-2 flex items-center gap-1 flex-wrap">
        {label && (
          <span className="text-xs font-medium text-slate-500 px-3 mr-2">
            {label}
          </span>
        )}

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`h-8 w-8 p-0 ${editor.isActive("bold") ? "bg-slate-200 text-slate-900" : ""}`}
        >
          <Bold size={16} />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`h-8 w-8 p-0 ${editor.isActive("italic") ? "bg-slate-200 text-slate-900" : ""}`}
        >
          <Italic size={16} />
        </Button>

        <div className="w-px h-5 bg-slate-300 mx-2" />

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`h-8 w-8 p-0 ${editor.isActive("bulletList") ? "bg-slate-200 text-slate-900" : ""}`}
        >
          <List size={16} />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`h-8 w-8 p-0 ${editor.isActive("orderedList") ? "bg-slate-200 text-slate-900" : ""}`}
        >
          <ListOrdered size={16} />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`h-8 w-8 p-0 ${editor.isActive("blockquote") ? "bg-slate-200 text-slate-900" : ""}`}
        >
          <Quote size={16} />
        </Button>
      </div>

      <div className="flex-1 min-h-[200px] relative">
        <EditorContent
          editor={editor}
          className="prose prose-sm max-w-none p-5 
                     text-[15px] leading-relaxed h-full 
                     focus:outline-none focus:ring-0 focus:border-none
                     [&_.ProseMirror]:min-h-[180px] 
                     [&_.ProseMirror]:h-full 
                     [&_.ProseMirror]:outline-none 
                     [&_.ProseMirror:focus]:ring-0 
                     [&_.ProseMirror:focus]:border-none 
                     [&_.ProseMirror]:border-none"
        />
      </div>
    </div>
  );
}
