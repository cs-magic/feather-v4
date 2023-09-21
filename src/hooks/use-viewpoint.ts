import { create } from "zustand"

export interface ViewportState {
  width: number
  height: number

  setWidth: (v: number) => void
  setHeight: (v: number) => void
}

export const useViewportStore = create<ViewportState>((set) => ({
  width: 0,
  height: 0,
  setWidth: (gameWidth: number) => set({ width: gameWidth }),
  setHeight: (gameHeight: number) => set({ height: gameHeight }),
}))
