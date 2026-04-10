"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAppStore } from "@/store/useStore";
import { Check } from "lucide-react";

export function ManageTestHeader() {
  const { step, basicInfo } = useAppStore();

  const isStep1Completed = !!basicInfo;

  return (
    <Card className="w-full flex items-start ring-0 p-6 border-none shadow-sm rounded-xl bg-white mb-6">
      <div className="flex flex-col gap-6 w-full">
        <h1 className="text-xl font-bold text-[#3E4756]">Manage Online Test</h1>

        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {/* STEP 1 */}
            <div className="flex items-center gap-2">
              <div
                className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  step === 1
                    ? "bg-[#6333FF] text-white"
                    : isStep1Completed
                      ? "bg-[#6333FF] text-white"
                      : "bg-slate-200 text-slate-500"
                }`}
              >
                {isStep1Completed ? <Check size={14} /> : 1}
              </div>

              <span
                className={`text-sm font-medium ${
                  step === 1
                    ? "text-[#6333FF]"
                    : isStep1Completed
                      ? "text-[#6333FF]"
                      : "text-slate-400"
                }`}
              >
                Basic Info
              </span>
            </div>

            <div className="h-[1px] w-12 bg-slate-200" />

            {/* STEP 2 */}
            <div className="flex items-center gap-2">
              <div
                className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  step === 2
                    ? "bg-[#6333FF] text-white"
                    : "bg-slate-200 text-slate-500"
                }`}
              >
                2
              </div>

              <span
                className={`text-sm font-medium ${
                  step === 2 ? "text-[#6333FF]" : "text-slate-400"
                }`}
              >
                Questions
              </span>
            </div>
          </div>

          <Button
            variant="outline"
            className="border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50"
          >
            Back to Dashboard
          </Button>
        </div>
      </div>
    </Card>
  );
}
