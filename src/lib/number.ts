import { SpringValue } from "@react-spring/web"

export type SNumber = number | SpringValue

export const pos2str = (v: SNumber): string => {
  if (typeof v === "number") return v.toFixed(0)
  return v.get().toFixed(0)
}
