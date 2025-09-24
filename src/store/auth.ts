import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type User = {
  name: string
  email: string
  avatar: string
}

interface AuthState {
  user: User | null
  token: string | null
  login: (user: User, token: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      login: (user, token) => {
        if (typeof window !== "undefined") {
          localStorage.setItem("accessToken", token);
        }
        set({ user, token });
      },
      logout: () => {
        if (typeof window !== "undefined") {
          localStorage.removeItem("accessToken");
        }
        set({ user: null, token: null });
      }
    }),
    {
      name: 'auth',
      partialize: (state) => ({ user: state.user, token: state.token })
    }
  )
)
