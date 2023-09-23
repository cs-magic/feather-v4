import { create } from "zustand"
import { PLAYER_LIFE_MAX } from "@/config"
import { GameState } from "@/lib/game/server"

export type RenderMode = "CSS" | "Canvas"

export type ControlMode = "gesture" | "joystick"

export type UIMode = "radix-ui" | "daisyui"

export interface IGameStore {
  state: GameState
  setState: (state: GameState) => void

  renderMode: RenderMode
  setRenderMode: (renderMode: RenderMode) => void

  controlMode: ControlMode
  setControlMode: (controlMode: ControlMode) => void

  uiMode: UIMode
  setUIMode: (uiMode: UIMode) => void
}

export const useGameStore = create<IGameStore>((set) => ({
  state: "waiting",
  setState: (state) => set({ state }),

  renderMode: "CSS",
  setRenderMode: (renderMode) => set({ renderMode }),

  controlMode: "gesture",
  setControlMode: (controlMode) => set({ controlMode }),

  uiMode: "daisyui",
  setUIMode: (uiMode) => set({ uiMode }),
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
