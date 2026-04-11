import { FileText, Clock1, CircleX } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface TestCardProps {
  title: string;
  duration: string | number;
  question: string | number;
  negativeMarking: string | number;
  id:string | number
}

export function OnlineTestCard({
  title,
  duration,
  question,
  negativeMarking,
  id
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
            <Clock1 size={18} className="text-slate-400" />
            <span>
              Duration:{" "}
              <span className="font-semibold text-slate-700">{duration}</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <FileText size={18} className="text-slate-400" />
            <span>
              Question:{" "}
              <span className="font-semibold text-slate-700">{question}</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <CircleX size={18} className="text-slate-400" />
            <span>
              Negative Marking:{" "}
              <span className="font-semibold text-slate-700">
                {negativeMarking}
              </span>
            </span>
          </div>
        </div>
       <Link href={`/test/${id}`}>
        <Button
          variant="outline"
          className="border-[#6633FF] text-purple-600 hover:bg-purple-50 hover:text-[#6633FF] rounded-lg px-6"
        >
          Start
        </Button>
       </Link>
      </CardContent>
    </Card>
  );
}
