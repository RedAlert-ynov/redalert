import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface Store {
    isLoggedIn: boolean;
    accessToken: string;
    refreshToken: string;
    setLoggedIn: (value: boolean) => void;
    setAccessToken: (value: string) => void;
    setRefreshToken: (value: string) => void;
}

export const useStore = create<Store>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      accessToken: "",
      refreshToken: "",
      setLoggedIn: (loggedIn: boolean) => set(() => ({isLoggedIn: loggedIn})),
      setAccessToken: (accessToken: string) => set(() => ({accessToken: accessToken})),
      setRefreshToken: (refreshToken: string) => set(() => ({refreshToken: refreshToken})),
    }),
    {
      name: 'redalert-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)