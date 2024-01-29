import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface IUser {
  fullName?: string
  age?: string
  monthlyIncome?: string
  saverType?: string
  save?: string
  categories?: { name: string; value: string }[]
}

interface IStore {
  user: IUser | null
  setUser: (user: IUser) => void
}

export const useStore = create<IStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user: IUser) =>
        set((state) => ({ user: { ...state.user, ...user } }))
    }),
    {
      name: 'user-storage'
    }
  )
)
