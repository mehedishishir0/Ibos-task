export type Option = {
  id: string;
  label: string;
  text: string;
  isCorrect: boolean;
};

export type Question = {
  id: string;
  type: "checkbox" | "radio" | "text";
  score: number;
  question: string;
  options: Option[];
  correctAnswer?: string;
};

export type BasicInfo = {
  title: string;
  candidates: string;
  slots: string;
  questionSet: string;
  questionType: string;
  startTime: string;
  endTime: string;
  duration: string;
};

export type CreateQuzePayload = {
  basicInfo: BasicInfo | null;
  questions1: Question[];
};