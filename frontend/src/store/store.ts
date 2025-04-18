import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface Store {
    isLoggedIn: boolean;
    accessToken: string;
    refreshToken: string;
    username: string;
    email: string;
    role: number
    setLoggedIn: (value: boolean) => void;
    setAccessToken: (value: string) => void;
    setRefreshToken: (value: string) => void;
    setUsername: (value: string) => void;
    setEmail: (value: string) => void;
    setRole: (value: number) => void;
}

export const useStore = create<Store>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      accessToken: "",
      refreshToken: "",
      username: "",
      email: "",
      role: NaN,
      setLoggedIn: (loggedIn: boolean) => set(() => ({isLoggedIn: loggedIn})),
      setAccessToken: (accessToken: string) => set(() => ({accessToken: accessToken})),
      setRefreshToken: (refreshToken: string) => set(() => ({refreshToken: refreshToken})),
      setUsername: (username: string) => set(() => ({username: username})),
      setEmail: (email: string) => set(() => ({email: email})),
      setRole: (role: number) => set(() => ({role: role})),
    }),
    {
      name: 'redalert-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)