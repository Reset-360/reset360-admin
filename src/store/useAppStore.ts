import { create } from 'zustand'

export type Theme = "dark" | "light" | "system";

interface AppState {
  theme: Theme
  setTheme: (theme: Theme) => void
}

export const useAppStore = create<AppState>((set) => ({
  theme: 'system',
  setTheme: (theme: Theme) => set((state) => ({ theme }))
}))

export default useAppStore;
