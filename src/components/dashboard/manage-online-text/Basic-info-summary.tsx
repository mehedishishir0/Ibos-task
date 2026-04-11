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
        <CardHeader className="flex flex-row items-center justify-between px-6 pb-2">
          <h2 className="text-[18px] font-semibold text-[#334155]">
            Basic Information
          </h2>

          <Button
            variant="ghost"
            onClick={() => setEditMode(true)}
            className="text-[#6633FF] hover:text-[#5229d1] hover:bg-purple-50 gap-1.5 font-bold text-sm"
          >
            <PencilLine size={16} strokeWidth={2.5} />
            Edit
          </Button>
        </CardHeader>

        <CardContent className="px-8 pb-8 space-y-7">
          <div className="space-y-1">
            <p className="text-[13px] font-medium text-[#64748B] mb-1">
              Online Test Title
            </p>
            <p className="text-[16px] font-medium text-[#334155]">
              {basicInfo.title}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-6">
            <div>
              <p className="text-[13px] text-[#64748B] mb-1">Total Candidates</p>
              <p className="text-[16px] font-medium text-[#334155]">
                {basicInfo.candidates}
              </p>
            </div>

            <div>
              <p className="text-[13px] text-[#64748B] mb-1">Total Slots</p>
              <p className="text-[16px] font-medium text-[#334155]">
                {basicInfo.slots}
              </p>
            </div>

            <div>
              <p className="text-[13px] text-[#64748B] mb-1">Question Set</p>
              <p className="text-[16px] font-medium text-[#334155]">
                {basicInfo.questionSet}
              </p>
            </div>

            <div>
              <p className="text-[13px] text-[#64748B] mb-1">Duration Per Slot</p>
              <p className="text-[16px] font-medium text-[#334155]">
                {basicInfo.duration}
              </p>
            </div>
          </div>

          <div>
            <p className="text-[13px] text-[#64748B] mb-1">Question Type</p>
            <p className="text-[16px] font-medium text-[#334155]">
              {basicInfo.questionType}
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="w-full flex items-center justify-between p-6 bg-white mt-6 rounded-2xl shadow-sm">
        <Button type="button" variant="outline" className=" px-16 h-12 border-slate-200 text-[#334155]  rounded-xl font-semibold">
          Cancel
        </Button>

        <Button
          onClick={() => {
            goToStep(2);
          }}
          className="h-14 rounded-2xl px-10 text-white bg-[#6333FF] hover:bg-[#5229d1]"
        >
          Save & Continue
        </Button>
      </div>
    </div>
  );
}
