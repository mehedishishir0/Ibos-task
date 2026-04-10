import { create } from "zustand";
import type { FormData } from "@/types/Input-validation";

type QuestionType = "checkbox" | "radio" | "text";

export type Option = {
  id: string;
  label: string; 
  text: string;
  isCorrect: boolean;
};

export type Question = {
  id: string;
  type: QuestionType;
  score: number;
  question: string;
  options: Option[];
  correctAnswer?: string;
};

type AppState = {
  step: 1 | 2;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: 1 | 2) => void;

  basicInfo: (FormData & { duration: string }) | null;
  isBasicSubmitted: boolean;
  isEditMode: boolean;

  setBasicInfo: (data: FormData & { duration: string }) => void;
  resetBasicInfo: () => void;
  setEditMode: (value: boolean) => void;

  questions: Question[];
  addQuestion: (q: Question) => void;
  updateQuestion: (id: string, data: Partial<Question>) => void;
  removeQuestion: (id: string) => void;
  resetQuestions: () => void;

  getFullData: () => {
    basicInfo: AppState["basicInfo"];
    questions: Question[];
  };
};




export const useAppStore = create<AppState>((set, get) => ({
  step: 1,

  nextStep: () => set((s) => ({ step: (s.step + 1) as 1 | 2 })),
  prevStep: () => set((s) => ({ step: (s.step - 1) as 1 | 2 })),
  goToStep: (step) => set({ step }),

  basicInfo: null,
  isBasicSubmitted: false,
  isEditMode: false,

  setBasicInfo: (data) =>
    set({
      basicInfo: data,
      isBasicSubmitted: true,
      isEditMode: false,
    }),

  resetBasicInfo: () =>
    set({
      basicInfo: null,
      isBasicSubmitted: false,
      isEditMode: false,
      step: 1,
      questions: [],
    }),

  setEditMode: (value) =>
    set({
      isEditMode: value,
      isBasicSubmitted: !value,
    }),

  questions: [],

  addQuestion: (q) =>
    set((state) => ({
      questions: [...state.questions, q],
    })),

  updateQuestion: (id, data) =>
    set((state) => ({
      questions: state.questions.map((q) =>
        q.id === id ? { ...q, ...data } : q
      ),
    })),

  removeQuestion: (id) =>
    set((state) => ({
      questions: state.questions.filter((q) => q.id !== id),
    })),

  resetQuestions: () => set({ questions: [] }),

  getFullData: () => ({
    basicInfo: get().basicInfo,
    questions: get().questions,
  }),
}));