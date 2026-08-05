import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { ThemeId } from "@neuropi/shared";

export type AppLanguage = "es" | "en";
export type OnboardingGoal =
  | "understand"
  | "order_symptoms"
  | "prepare_consult"
  | "psych_support";

type SettingsState = {
  themeId: ThemeId;
  neuroinclusive: boolean;
  language: AppLanguage;
  onboardingDone: boolean;
  notificationsEnabled: boolean;
  goal: OnboardingGoal | null;
  displayName: string;
  hydrated: boolean;
  setThemeId: (id: ThemeId) => void;
  setNeuroinclusive: (v: boolean) => void;
  setLanguage: (lang: AppLanguage) => void;
  setOnboardingDone: (v: boolean) => void;
  setNotificationsEnabled: (v: boolean) => void;
  setGoal: (goal: OnboardingGoal) => void;
  setDisplayName: (name: string) => void;
  setHydrated: (v: boolean) => void;
  resetSettings: () => void;
};

const defaults = {
  themeId: "amanecer" as ThemeId,
  neuroinclusive: false,
  language: "es" as AppLanguage,
  onboardingDone: false,
  notificationsEnabled: false,
  goal: null as OnboardingGoal | null,
  displayName: "",
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      ...defaults,
      hydrated: false,
      setThemeId: (themeId) => set({ themeId }),
      setNeuroinclusive: (neuroinclusive) => set({ neuroinclusive }),
      setLanguage: (language) => set({ language }),
      setOnboardingDone: (onboardingDone) => set({ onboardingDone }),
      setNotificationsEnabled: (notificationsEnabled) =>
        set({ notificationsEnabled }),
      setGoal: (goal) => set({ goal }),
      setDisplayName: (displayName) => set({ displayName }),
      setHydrated: (hydrated) => set({ hydrated }),
      resetSettings: () => set({ ...defaults }),
    }),
    {
      name: "Neuropi-settings",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (s) => ({
        themeId: s.themeId,
        neuroinclusive: s.neuroinclusive,
        language: s.language,
        onboardingDone: s.onboardingDone,
        notificationsEnabled: s.notificationsEnabled,
        goal: s.goal,
        displayName: s.displayName,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    },
  ),
);
