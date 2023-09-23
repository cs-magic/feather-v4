import { PLAYER_LIFE_MAX } from "@/config"
import { IClientState, IGame, IGameEvent } from "@/lib/game/server"
import { useBearStore } from "./hooks/use-bear-store"

export type RenderMode = "CSS" | "Canvas"
export type ControlMode = "gesture" | "joystick"
export type UILibrary = "radix-ui" | "daisyui"

export const useClientState = useBearStore<IClientState>()(
  "clientState",
  "waiting"
)
export const useGame = useBearStore<IGame | undefined>()("game", undefined)
export const useEvents = useBearStore<IGameEvent[]>()("events", [])
export const usePlayerX = useBearStore<number>()("x", 0.5)
export const usePlayerLife = useBearStore<number>()("life", PLAYER_LIFE_MAX)
export const usePlayerRage = useBearStore<number>()("rage", 0)
export const useTesting = useBearStore<boolean>()("isTesting", false)

export const useRenderMode = useBearStore<RenderMode>()("value", "CSS")
export const useUILibrary = useBearStore<UILibrary>()("value", "radix-ui")
export const useControlMode = useBearStore<ControlMode>()("value", "gesture")
export const useLabel = useBearStore<boolean>()("value", true)
export const useBGM = useBearStore<boolean>()("value", true)
