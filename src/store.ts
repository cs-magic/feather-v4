import { useBearStore } from "./hooks/use-bear-store"
import { Viewport } from "@/ds"

export type RenderMode = "CSS" | "Canvas"
export type ControlMode = "gesture" | "joystick"
export type UILibrary = "radix-ui" | "daisyui"

export const useTestingEnabled = useBearStore<boolean>()("isTesting", false)
export const useBGMEnabled = useBearStore<boolean>()("value", false)
export const useLabelEnabled = useBearStore<boolean>()("value", true)

export const useRenderMode = useBearStore<RenderMode>()("value", "CSS")
export const useUILibrary = useBearStore<UILibrary>()("value", "radix-ui")
export const useControlMode = useBearStore<ControlMode>()("value", "joystick")

export const useViewport = useBearStore<Viewport>()("viewport", {
  w: 0,
  h: 0,
})
export const usePlayerSpeed = useBearStore<number>()("speed", 0)
