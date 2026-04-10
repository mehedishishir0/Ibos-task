import { Users, FileText, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface TestCardProps {
  title: string;
  candidates: string | number;
  questionSets: string | number;
  examSlots: string | number;
}

export function OnlineTestCard({
  title,
  candidates,
  questionSets,
  examSlots,
}: TestCardProps) {
  return (
    <Card className="border border-[#E5E7EB] bg-[#FFFFFF] ring-0 rounded-xl px-[32px] pt-[32px] pb-[40px] ">
      <CardHeader>
        <CardTitle className="text-[20px] font-semibold text-[#334155] leading-tight">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-8 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <Users size={18} className="text-slate-400" />
            <span>
              Candidates:{" "}
              <span className="font-semibold text-slate-700">{candidates}</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <FileText size={18} className="text-slate-400" />
            <span>
              Question Set:{" "}
              <span className="font-semibold text-slate-700">
                {questionSets}
              </span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={18} className="text-slate-400" />
            <span>
              Exam Slots:{" "}
              <span className="font-semibold text-slate-700">{examSlots}</span>
            </span>
          </div>
        </div>
        <Button
          variant="outline"
          className="border-[#6633FF] text-purple-600 hover:bg-purple-50 hover:text-[#6633FF] rounded-lg px-6"
        >
          View Candidates
        </Button>
      </CardContent>
    </Card>
  );
}
