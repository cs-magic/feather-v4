import { create } from "zustand"
import { PLAYER_LIFE_MAX } from "@/config"
import { GameState } from "@/lib/game/server"

export enum RenderMode {
  CSS = "CSS",
  Canvas = "Canvas",
}

export interface IGameStore {
  state: GameState
  setState: (state: GameState) => void

  renderMode: RenderMode
  setRenderMode: (renderMode: RenderMode) => void
}

export const useGameStore = create<IGameStore>((set) => ({
  state: "waiting",
  setState: (state) => set({ state }),

  renderMode: RenderMode.CSS,
  setRenderMode: (renderMode) => set({ renderMode }),
}))

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
  setLife: (life) => set({ life }),

  rage: 0,
  setRage: (rage) => set({ rage }),
}))

export interface TestState {
  isTesting: boolean
  setTesting: (isTesting: boolean) => void
}

export const useTestStore = create<TestState>((set) => ({
  isTesting: false,
  setTesting: (isTesting) => set({ isTesting }),
}))
