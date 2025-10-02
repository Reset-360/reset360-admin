import { create } from 'zustand'
import { User } from '../types/userTypes';
import { persist } from "zustand/middleware"
import { AUTH_STORAGE } from '../constants/storage-keys';

export type Theme = "dark" | "light" | "system";

interface AuthState {
  user?: User
  setUser: (user: User) => void

  accessToken?: string
  setToken: (token: string) => void

  clearUser: () => void
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      setUser: (user: User) => set((state) => ({ user })),
      setToken: (token) => set({ accessToken: token }),
      clearUser: () => set({
         user: undefined,
          accessToken: undefined
       }),

    }),
    {
      name: AUTH_STORAGE,
    }
  )
)

export default useAuthStore;
