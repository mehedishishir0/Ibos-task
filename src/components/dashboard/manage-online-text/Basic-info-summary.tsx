import { PencilLine } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/store/useStore";

export function BasicInfoSummary() {
  const { basicInfo, setEditMode, goToStep } = useAppStore();

  if (!basicInfo) return null;

  return (
    <div>
      <Card className="w-full border-none shadow-sm rounded-2xl ring-0 bg-white overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between px-8 pt-8 pb-2">
          <h2 className="text-xl font-bold text-[#3E4756]">
            Basic Information
          </h2>

          <Button
            variant="ghost"
            onClick={() => setEditMode(true)}
            className="text-[#6333FF] hover:text-[#5229d1] hover:bg-purple-50 gap-1.5 font-bold text-sm"
          >
            <PencilLine size={16} strokeWidth={2.5} />
            Edit
          </Button>
        </CardHeader>

        <CardContent className="px-8 pb-8 space-y-7">
          {/* Title */}
          <div className="space-y-1">
            <p className="text-[13px] font-medium text-slate-400">
              Online Test Title
            </p>
            <p className="text-[16px] font-bold text-[#334155]">
              {basicInfo.title}
            </p>
          </div>

          {/* GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-6">
            <div>
              <p className="text-[13px] text-slate-400">Total Candidates</p>
              <p className="text-[16px] font-medium text-[#334155]">
                {basicInfo.candidates}
              </p>
            </div>

            <div>
              <p className="text-[13px] text-slate-400">Total Slots</p>
              <p className="text-[16px] font-medium text-[#334155]">
                {basicInfo.slots}
              </p>
            </div>

            <div>
              <p className="text-[13px] text-slate-400">Question Set</p>
              <p className="text-[16px] font-medium text-[#334155]">
                {basicInfo.questionSet}
              </p>
            </div>

            <div>
              <p className="text-[13px] text-slate-400">Duration Per Slot</p>
              <p className="text-[16px] font-medium text-[#334155]">
                {basicInfo.duration}
              </p>
            </div>
          </div>

          {/* TYPE */}
          <div>
            <p className="text-[13px] text-slate-400">Question Type</p>
            <p className="text-[16px] font-medium text-[#334155]">
              {basicInfo.questionType}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* FOOTER BUTTON */}
      <div className="w-full flex items-center justify-between p-6 bg-white mt-6 rounded-2xl shadow-sm">
        <Button type="button" variant="outline" className="h-14 px-12">
          Cancel
        </Button>

        <Button
          onClick={() => {
            goToStep(2);
          }}
          className="h-14 px-10 text-white bg-[#6333FF] hover:bg-[#5229d1]"
        >
          Save & Continue
        </Button>
      </div>
    </div>
  );
}
