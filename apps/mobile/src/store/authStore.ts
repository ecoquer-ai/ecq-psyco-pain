import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { isDemoMode, setAuthToken } from "@/lib/api";

type AuthState = {
  isAuthenticated: boolean;
  email: string | null;
  userId: string | null;
  hydrated: boolean;
  loginDemo: (email?: string) => void;
  login: (email: string, _password: string) => Promise<void>;
  register: (email: string, _password: string, name?: string) => Promise<void>;
  logout: () => void;
  setHydrated: (v: boolean) => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      email: null,
      userId: null,
      hydrated: false,
          loginDemo: (email = "demo@neuropi.cl") => {
        setAuthToken("demo");
        set({
          isAuthenticated: true,
          email,
          userId: "demo-user",
        });
      },
      login: async (email, _password) => {
        if (isDemoMode()) {
          setAuthToken("demo");
          set({
            isAuthenticated: true,
            email,
            userId: `local-${email}`,
          });
          return;
        }
        setAuthToken("demo");
        set({
          isAuthenticated: true,
          email,
          userId: `user-${email}`,
        });
      },
      register: async (email, _password, _name) => {
        setAuthToken("demo");
        set({
          isAuthenticated: true,
          email,
          userId: `user-${email}`,
        });
      },
      logout: () => {
        setAuthToken(isDemoMode() ? "demo" : null);
        set({
          isAuthenticated: false,
          email: null,
          userId: null,
        });
      },
      setHydrated: (hydrated) => set({ hydrated }),
    }),
    {
      name: "Neuropi-auth",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (s) => ({
        isAuthenticated: s.isAuthenticated,
        email: s.email,
        userId: s.userId,
      }),
      onRehydrateStorage: () => (state) => {
        if (state?.isAuthenticated) {
          setAuthToken("demo");
        } else if (isDemoMode()) {
          setAuthToken("demo");
        }
        state?.setHydrated(true);
      },
    },
  ),
);
