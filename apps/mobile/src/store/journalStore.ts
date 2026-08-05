import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type JournalEntry = {
  id: string;
  createdAt: string;
  nrs: number;
  regions: string[];
  interference: number;
  sleep: number;
  mood: number;
  stress: number;
  flareUp: boolean;
  notes: string;
};

type JournalState = {
  entries: JournalEntry[];
  completedLessons: string[];
  currentMilestoneId: string;
  addEntry: (entry: Omit<JournalEntry, "id" | "createdAt">) => void;
  completeLesson: (lessonId: string) => void;
  setCurrentMilestone: (id: string) => void;
  clearJournal: () => void;
};

export const useJournalStore = create<JournalState>()(
  persist(
    (set) => ({
      entries: [],
      completedLessons: [],
      currentMilestoneId: "m1_understand_pain",
      addEntry: (entry) =>
        set((s) => ({
          entries: [
            {
              ...entry,
              id: `j_${Date.now()}`,
              createdAt: new Date().toISOString(),
            },
            ...s.entries,
          ],
        })),
      completeLesson: (lessonId) =>
        set((s) => ({
          completedLessons: s.completedLessons.includes(lessonId)
            ? s.completedLessons
            : [...s.completedLessons, lessonId],
        })),
      setCurrentMilestone: (currentMilestoneId) => set({ currentMilestoneId }),
      clearJournal: () => set({ entries: [], completedLessons: [] }),
    }),
    {
      name: "Neuropi-journal",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
