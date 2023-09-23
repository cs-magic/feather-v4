import { createBearStore } from "./hooks/use-bear-store"
import { Viewport } from "@/ds"

export type RenderMode = "css" | "canvas"
export type ControlMode = "gesture" | "joystick"
export type UILibrary = "radix-ui" | "daisyui"

export const useTestingEnabled = createBearStore<boolean>()("isTesting", false)
export const useBGMEnabled = createBearStore<boolean>()("value", true)
export const useLabelEnabled = createBearStore<boolean>()("value", true)

export const useRenderMode = createBearStore<RenderMode>()("value", "canvas")
export const useUILibrary = createBearStore<UILibrary>()("value", "radix-ui")
export const useControlMode = createBearStore<ControlMode>()("value", "gesture")

export const useViewport = createBearStore<Viewport>()("viewport", {
  w: 0,
  h: 0,
})
export const usePlayerSpeed = createBearStore<number>()("speed", 0)
