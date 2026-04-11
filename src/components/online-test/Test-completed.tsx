"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

interface TestCompletedProps {
  userName?: string;
  examName?: string;
  onBackToDashboard?: () => void;
}

const TestCompleted = ({ 
  userName = "Md. Naimur Rahman", 
  examName = "MCQ Exam for Probationary Officer",
  onBackToDashboard 
}: TestCompletedProps) => {
  return (
    <div className="mt-10 w-full flex items-center justify-center p-4">
      <Card className="container border-[#E5E7EB]  border ring-0 rounded-[2rem] bg-[#FFFFFF] overflow-hidden py-12 md:py-20">
        <CardContent className="flex flex-col items-center text-center px-6 md:px-12">
          
          <div className="mb-6 animate-in zoom-in duration-500 w-20 h-20">
           <Image src={"/images/confirm.png"} alt="" width={900}  height={900}/>
          </div>

          <h1 className="text-2xl md:text-xl font-bold text-[#334155] mb-4">
            Test Completed
          </h1>
          
          <p className="text-[#64748B] text-sm md:text-base leading-relaxed mb-10">
            Congratulations <span className="font-medium text-slate-600">{userName}</span>, 
            You have completed your {examName}. Thank you for participating.
          </p>

          <Link href={"/"}>
          <Button 
            onClick={onBackToDashboard}
            variant="outline"
            className="px-4 py-3 h-auto rounded-xl border-[#E5E7EB] text-[#334155] font-semibold text-sm transition-all hover:bg-slate-50 shadow-sm"
          >
            Back to Dashboard
          </Button>
          </Link>

        </CardContent>
      </Card>
    </div>
  )
}

export default TestCompleted