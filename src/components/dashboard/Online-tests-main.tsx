import { Search, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { OnlineTestCard } from "./Online-test-card";

export default function OnlineTestsMain() {
  const tests = [
    {
      title: "Psychometric Test for Management Trainee Officer",
      candidates: "10,000",
      questionSets: 3,
      examSlots: 3,
    },
    {
      title: "Psychometric Test for Management Trainee Officer",
      candidates: "10,000",
      questionSets: 3,
      examSlots: 3,
    },
    {
      title: "Psychometric Test for Management Trainee Officer",
      candidates: "Not Set",
      questionSets: "Not Set",
      examSlots: "Not Set",
    },
    {
      title: "Psychometric Test for Management Trainee Officer",
      candidates: "10,000",
      questionSets: 3,
      examSlots: 3,
    },
  ];

  return (
    <div className="min-h-screen container p-8 mt-12">
      {/* Header Section */}
      <div className=" flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
        <h1 className="text-2xl font-bold text-[#3E4756]">Online Tests</h1>

        <div className="relative w-full max-w-lg">
          <Input
            placeholder="Search by exam title"
            className="pl-4 pr-12 py-6 border border-purple-100 rounded-xl shadow-sm focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:outline-none"
          />

          <div className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#673FED1A] rounded-full p-2 flex items-center justify-center">
            <Search size={18} className="text-purple-600" />
          </div>
        </div>

        <Button className="bg-[#6633FF] hover:bg-[#5229d1] text-white py-6 px-8 rounded-xl text-md font-semibold">
          Create Online Test
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tests.map((test, index) => (
          <OnlineTestCard key={index} {...test} />
        ))}
      </div>

      {/* <EmptyTestState /> */}
      <div className="mt-10 flex items-center justify-between text-slate-500">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 bg-white shadow-sm border"
          >
            <ChevronLeft size={16} />
          </Button>
          <span className="h-8 w-8 flex items-center justify-center bg-white shadow-sm border rounded text-sm font-medium">
            1
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 bg-white shadow-sm border"
          >
            <ChevronRight size={16} />
          </Button>
        </div>

        <div className="flex items-center gap-3 text-sm">
          <span>Online Test Per Page</span>
          <div className="flex items-center gap-2 bg-white px-3 py-1.5 border rounded-md shadow-sm cursor-pointer">
            <span className="font-bold text-slate-700 text-xs">8</span>
            <ChevronDown size={14} />
          </div>
        </div>
      </div>
    </div>
  );
}
