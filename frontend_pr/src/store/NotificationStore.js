import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

export const useNotificationStore = create(
  persist(
    devtools((set) => ({
      notification: null,
      setNotification: (notification) => set({ notification }),
    })),
    {
      name: "notification-store",
      getStorage: () => localStorage,
    }
  )
);
