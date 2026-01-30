import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuth = create(
  persist(
    (set) => ({
      isLoggedIn: false,
      id: null,
      name: null,
      email: null,
      phone: null,

      setUserDetails: (details) => set((state) => ({ ...state, ...details })),

      logout: () =>
        set(() => ({
          isLoggedIn: false,
          id: null,
          name: null,
          email: null,
          phone: null,
        })),
    }),
    { name: "auth" }
  )
);
