"use client"

import React from "react"
import { Clock, XCircle } from "lucide-react"
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface TimeoutModalProps {
  isOpen: boolean;
  userName: string;
  onClose?: () => void;
}

const TimeoutModal = ({ isOpen, userName }: TimeoutModalProps) => {
  return (
    <Dialog open={isOpen}>
      <DialogContent className="!max-w-[800px] bg-[#FFFFFF] p-12 rounded-[2rem] border-none shadow-2xl">
        <div className="flex flex-col items-center text-center">
          
          <div className="relative mb-6">
            <div className="bg-slate-100 p-4 rounded-full">
              <Clock className="w-12 h-12 text-slate-600" />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-white rounded-full">
              <XCircle className="w-7 h-7 text-red-500 fill-white" />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-slate-800 mb-4">
            Timeout!
          </h2>
          
          <p className="text-slate-500 text-lg leading-relaxed mb-8">
            Dear <span className="font-semibold text-slate-600">{userName}</span>, 
            Your exam time has been finished. Thank you for participating.
          </p>

        <Link href={"/"}>
          <Button 
            variant="outline"
            className="px-8 py-6 rounded-xl border-slate-200 text-slate-700 font-semibold text-md hover:bg-slate-50 transition-all shadow-sm"
          >
            Back to Dashboard
          </Button>
        </Link>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default TimeoutModal