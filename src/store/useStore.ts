import { create } from "zustand";
import type { FormData } from "@/types/Input-validation";

type QuestionType = "checkbox" | "radio" | "text";

export type Question = {
  id: string;
  type: QuestionType;
  score: number;
  question: string;
  options?: {
    label: string;
    isCorrect: boolean;
  }[];
};

type AppState = {
  // STEP CONTROL
  step: 1 | 2;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: 1 | 2) => void;

  // BASIC INFO
  basicInfo: (FormData & { duration: string }) | null;
  isBasicSubmitted: boolean;
  isEditMode: boolean;

  setBasicInfo: (data: FormData & { duration: string }) => void;
  resetBasicInfo: () => void;
  setEditMode: (value: boolean) => void;

  // QUESTIONS
  questions: Question[];
  addQuestion: (q: Question) => void;
  removeQuestion: (id: string) => void;
  resetQuestions: () => void;

  // FINAL GET ALL DATA
  getFullData: () => {
    basicInfo: AppState["basicInfo"];
    questions: Question[];
  };
};

export const useAppStore = create<AppState>((set, get) => ({
  // STEP
  step: 1,

  nextStep: () => set((state) => ({ step: state.step + 1 as 1 | 2 })),
  prevStep: () => set((state) => ({ step: state.step - 1 as 1 | 2 })),
  goToStep: (step) => set({ step }),

  // BASIC INFO
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
    }),

  setEditMode: (value) =>
    set({
      isEditMode: value,
      isBasicSubmitted: !value,
    }),

  // QUESTIONS
  questions: [],

  addQuestion: (q) =>
    set((state) => ({
      questions: [...state.questions, q],
    })),

  removeQuestion: (id) =>
    set((state) => ({
      questions: state.questions.filter((q) => q.id !== id),
    })),

  resetQuestions: () => set({ questions: [] }),

  // FULL DATA EXPORT
  getFullData: () => ({
    basicInfo: get().basicInfo,
    questions: get().questions,
  }),
}));