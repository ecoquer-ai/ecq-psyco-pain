import AsyncStorage from "@react-native-async-storage/async-storage";
import type { AssessmentAnswers, InstrumentId } from "@neuropi/shared";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type AssessmentState = {
  answers: AssessmentAnswers;
  completedModules: InstrumentId[];
  currentModuleId: InstrumentId | null;
  resultsReady: boolean;
  setAnswer: (questionId: string, value: string | number | boolean | string[]) => void;
  completeModule: (moduleId: InstrumentId) => void;
  setCurrentModule: (id: InstrumentId | null) => void;
  setResultsReady: (v: boolean) => void;
  resetAssessment: () => void;
};

export const useAssessmentStore = create<AssessmentState>()(
  persist(
    (set) => ({
      answers: {},
      completedModules: [],
      currentModuleId: null,
      resultsReady: false,
      setAnswer: (questionId, value) =>
        set((s) => ({
          answers: { ...s.answers, [questionId]: value },
        })),
      completeModule: (moduleId) =>
        set((s) => ({
          completedModules: s.completedModules.includes(moduleId)
            ? s.completedModules
            : [...s.completedModules, moduleId],
        })),
      setCurrentModule: (currentModuleId) => set({ currentModuleId }),
      setResultsReady: (resultsReady) => set({ resultsReady }),
      resetAssessment: () =>
        set({
          answers: {},
          completedModules: [],
          currentModuleId: null,
          resultsReady: false,
        }),
    }),
    {
      name: "Neuropi-assessment",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
