import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

export const useUserStore = create(
  persist(
    devtools((set) => ({
      user: null,
      authToken: null,
      setAuthToken: (authToken) => set({ authToken }),
      setUser: (user) => set({ user }),
      logout: () => set({ user: null, authToken: null }),
    })),
    {
      name: "user-store",
      getStorage: () => localStorage,
    }
  )
);
