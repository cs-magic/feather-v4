import { createBearStore } from "./hooks/use-bear-store"
import { Viewport } from "@/ds"

export type RenderMode = "CSS" | "Canvas"
export type ControlMode = "gesture" | "joystick"
export type UILibrary = "radix-ui" | "daisyui"

export const useTestingEnabled = createBearStore<boolean>()("isTesting", false)
export const useBGMEnabled = createBearStore<boolean>()("value", false)
export const useLabelEnabled = createBearStore<boolean>()("value", true)

export const useRenderMode = createBearStore<RenderMode>()("value", "CSS")
export const useUILibrary = createBearStore<UILibrary>()("value", "radix-ui")
export const useControlMode = createBearStore<ControlMode>()(
  "value",
  "joystick"
)

export const useViewport = createBearStore<Viewport>()("viewport", {
  w: 0,
  h: 0,
})
export const usePlayerSpeed = createBearStore<number>()("speed", 0)
