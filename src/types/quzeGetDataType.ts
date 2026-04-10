export interface ApiResponse {
  success: boolean;
  message: string;
  data: Exam[];
}

export interface Exam {
  _id: string;
  title: string;
  totalCandidates: number;
  totalSlots: number;
  totalQuestionSet: number;
  startTime: string; // ISO date string
  endTime: string;   // ISO date string
  duration: number;
  questions: Question[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export type QuestionType = "checkbox" | "radio" | "text";

export interface Question {
  _id: string;
  question: string; // HTML string
  type: QuestionType;
  options: Option[];
  score: number;

  // only exists when type === "text"
  textAnswer?: string;
}

export interface Option {
  _id: string;
  text: string; // HTML string
  isCorrect: boolean;
}


export interface SingelApiResponse {
  success: boolean;
  message: string;
  data: Exam;
}
