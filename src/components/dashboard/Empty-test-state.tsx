import Image from "next/image";
import { Card } from "@/components/ui/card";

export function EmptyTestState() {
  return (
    <Card className="w-full flex flex-col ring-0 items-center justify-center py-20 px-6 border-none shadow-sm rounded-xl bg-white">
      <div className="relative mb-6">
        <div className="h-32 w-32 flex items-center justify-center">
          <Image
            src="/images/empty.png"
            alt="No Online Tests"
            width={128}
            height={128}
            className="object-contain"
          />
        </div>
      </div>

      {/* Content */}
      <div className="text-center space-y-2">
        <h3 className="text-xl font-bold text-[#3E4756]">
          No Online Test Available
        </h3>
        <p className="text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
          Currently, there are no online tests available. Please check back
          later for updates.
        </p>
      </div>
    </Card>
  );
}
