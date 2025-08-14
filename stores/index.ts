import { MMKV } from 'react-native-mmkv'
import { create } from 'zustand'
import { StateStorage, persist, createJSONStorage } from 'zustand/middleware'

type UserStore = {
  semesterID: number | undefined,
  setSemesterID: (newSemesterID: number) => void
}

const storage = new MMKV()

const zustandStorage: StateStorage = {
  setItem: (name, value) => {
    return storage.set(name, value)
  },
  getItem: (name) => {
    const value = storage.getString(name)
    return value ?? null
  },
  removeItem: (name) => {
    return storage.delete(name)
  },
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      semesterID: 1,
      setSemesterID: (newSemesterID) => set({ semesterID: newSemesterID })
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => zustandStorage)
    },
  ),
)