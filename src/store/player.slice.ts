import { create } from "zustand";
import { PLAYER_LIFE_MAX } from "@/config";

export interface PlayerState {
  life: number;
  setLife: (life: number) => void;

  rage: number;
  setRage: (rage: number) => void;
}

export const usePlayerStore = create<PlayerState>((set) => ({
  life: PLAYER_LIFE_MAX,
  setLife: (life: number) => set({ life }),

  rage: 0,
  setRage: (rage: number) => set({ rage }),
}));
