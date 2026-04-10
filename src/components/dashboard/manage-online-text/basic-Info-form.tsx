"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { differenceInMinutes } from "date-fns";
import { useEffect, useState } from "react";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { FormData, formSchema } from "@/types/Input-validation";
import { useAppStore } from "@/store/useStore";

export default function BasicInformationForm() {
  const { setBasicInfo, basicInfo, isEditMode, setEditMode } = useAppStore();

  const {
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: basicInfo || {
      title: "",
      candidates: "",
      slots: "",
      questionSet: "",
      questionType: "",
      startTime: "",
      endTime: "",
    },
  });

  const startTime = watch("startTime");
  const endTime = watch("endTime");

  const [duration, setDuration] = useState("");

  useEffect(() => {
    if (!startTime || !endTime) {
      setDuration("");
      return;
    }

    const start = new Date(`1970-01-01T${startTime}`);
    const end = new Date(`1970-01-01T${endTime}`);
    const minutes = differenceInMinutes(end, start);

    if (minutes > 0) {
      const h = Math.floor(minutes / 60);
      const m = minutes % 60;
      setDuration(h > 0 ? `${h}h ${m}m` : `${m}m`);
    } else {
      setDuration("");
    }
  }, [startTime, endTime]);

  useEffect(() => {
    if (isEditMode && basicInfo) {
      reset(basicInfo);
    }
  }, [isEditMode, basicInfo, reset]);

  const onSubmit = (data: FormData) => {
    const finalData = {
      ...data,
      duration,
    };

    setBasicInfo(finalData);
    setEditMode(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="w-full p-8 ring-0 border-none shadow-sm rounded-2xl bg-white">
          <h2 className="text-lg font-bold text-[#3E4756] mb-6">
            Basic Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2 space-y-2">
              <Label className="text-sm font-semibold text-slate-700">
                Online Test Title <span className="text-red-500">*</span>
              </Label>
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Enter online test title"
                    className="h-14 text-sm border-slate-100"
                  />
                )}
              />
              {errors.title && (
                <p className="text-red-500 text-xs">{errors.title.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-semibold text-slate-700">
                Total Candidates <span className="text-red-500">*</span>
              </Label>
              <Controller
                name="candidates"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="number"
                    placeholder="Enter total candidates"
                    className="h-14 text-sm border-slate-100 "
                  />
                )}
              />
              {errors.candidates && (
                <p className="text-red-500 text-xs">
                  {errors.candidates.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-semibold text-slate-700">
                Total Slots <span className="text-red-500">*</span>
              </Label>
              <Controller
                name="slots"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger className="py-6 border-slate-100 w-full text-slate-400">
                      <SelectValue placeholder="Select total slots" />
                    </SelectTrigger>
                    <SelectContent className="bg-white text-sm">
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.slots && (
                <p className="text-red-500 text-xs">{errors.slots.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-semibold text-slate-700">
                Total Question Set <span className="text-red-500">*</span>
              </Label>
              <Controller
                name="questionSet"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger className="py-6 w-full border-slate-100  text-slate-400">
                      <SelectValue placeholder="Select total question set" />
                    </SelectTrigger>
                    <SelectContent className="bg-white text-sm">
                      <SelectItem value="set1">Set 1</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.questionSet && (
                <p className="text-red-500 text-xs">
                  {errors.questionSet.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-semibold text-slate-700">
                Question Type <span className="text-red-500">*</span>
              </Label>
              <Controller
                name="questionType"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger className="py-6 w-full border-slate-100 text-slate-400">
                      <SelectValue placeholder="Select question type" />
                    </SelectTrigger>
                    <SelectContent className="bg-white text-sm">
                      <SelectItem value="mcq">MCQ</SelectItem>
                      <SelectItem value="qs">QS</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.questionType && (
                <p className="text-red-500 text-xs">
                  {errors.questionType.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-semibold text-slate-700">
                Start Time <span className="text-red-500">*</span>
              </Label>
              <Controller
                name="startTime"
                control={control}
                render={({ field }) => (
                  <div className="relative">
                    <Input
                      type="time"
                      {...field}
                      className="h-14 border-slate-100 pr-10 appearance-none"
                    />
                  </div>
                )}
              />
              {errors.startTime && (
                <p className="text-red-500 text-xs">
                  {errors.startTime.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-semibold text-slate-700">
                End Time <span className="text-red-500">*</span>
              </Label>
              <Controller
                name="endTime"
                control={control}
                render={({ field }) => (
                  <div className="relative">
                    <Input
                      type="time"
                      {...field}
                      className="h-14 border-slate-100 pr-10 appearance-none"
                    />
                  </div>
                )}
              />
              {errors.endTime && (
                <p className="text-red-500 text-xs">{errors.endTime.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2 mt-4">
            <Label className="text-sm font-semibold text-slate-700">
              Duration
            </Label>
            <Input
              value={duration}
              disabled
              className="h-14 w-full border-slate-100 text-slate-400"
            />
          </div>
        </Card>
        <div className="w-full flex items-center justify-between p-6 border-none shadow-sm rounded-2xl bg-white mt-6">
          <Button
            type="button"
            variant="outline"
            className="h-14 px-12 border-slate-200 text-slate-600 rounded-xl font-semibold"
          >
            Cancel
          </Button>

          <Button
            type="submit"
            className="h-14 px-10 bg-[#6333FF] hover:bg-[#5229d1] text-white rounded-xl font-semibold"
          >
            Save & Continue
          </Button>
        </div>
      </form>
    </>
  );
}
