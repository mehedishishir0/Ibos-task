import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function OnlineTestCardSkeleton() {
  return (
    <Card className="container  border border-[#E5E7EB] bg-[#FFFFFF] rounded-xl p-6">
      
      {/* Title */}
      <CardHeader className="mb-3 p-0">
        <Skeleton className="h-6 w-3/4 rounded-md" />
      </CardHeader>

      <CardContent className="p-0">
        
        {/* Info Row */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-5 rounded-full" />
            <Skeleton className="h-4 w-24 rounded-md" />
          </div>

          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-5 rounded-full" />
            <Skeleton className="h-4 w-20 rounded-md" />
          </div>

          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-5 rounded-full" />
            <Skeleton className="h-4 w-28 rounded-md" />
          </div>
        </div>

        {/* Button */}
        <Skeleton className="h-10 w-28 rounded-lg" />
      </CardContent>
    </Card>
  );
}