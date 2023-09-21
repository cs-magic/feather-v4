import { create } from "zustand"
import { PLAYER_LIFE_MAX } from "@/config"

export interface PlayerState {
  x: number
  setX: (x: number) => void

  life: number
  setLife: (life: number) => void

  rage: number
  setRage: (rage: number) => void
}

export const usePlayerStore = create<PlayerState>((set) => ({
  x: 0.5,
  setX: (x) => set({ x }),

  life: PLAYER_LIFE_MAX,
  setLife: (life: number) => set({ life }),

  rage: 0,
  setRage: (rage: number) => set({ rage }),
}))

export interface TestState {
  isTesting: boolean
  setTesting: (isTesting: boolean) => void
}

export const useTestStore = create<TestState>((set) => ({
  isTesting: false,
  setTesting: (isTesting) => set({ isTesting }),
}))
