
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@/types/user';

interface AuthState {
  user: User | null;
  token: string | null;
  isHydrated: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
  setHydrated: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isHydrated: false,
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
      },
      setHydrated: () => set({ isHydrated: true })
    }),
    {
      name: 'auth',
      partialize: (state) => ({ user: state.user, token: state.token }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setHydrated();
        }
      }
    }
  )
)
