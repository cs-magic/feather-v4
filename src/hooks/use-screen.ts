import { useEffect } from "react"
import { create } from "zustand"

export interface ScreenState {
  width: number
  height: number

  setWidth: (v: number) => void
  setHeight: (v: number) => void
}

export const useScreenStore = create<ScreenState>((set) => ({
  width: 0,
  height: 0,
  setWidth: (gameWidth: number) => set({ width: gameWidth }),
  setHeight: (gameHeight: number) => set({ height: gameHeight }),
}))

export const useScreen = () => {
  const { setWidth, setHeight } = useScreenStore()

  /**
   * set height for mobile browser (safari, chrome ...) to be full of inner height (but invalid !)
   */
  useEffect(() => {
    const setInnerHeight = () => {
      setWidth(window.innerWidth)
      setHeight(window.innerHeight)

      document.documentElement.style.setProperty(
        "--app-height",
        `${window.innerHeight}px`
      )
    }
    window.addEventListener("resize", setInnerHeight)

    setInnerHeight()
    return () => {
      window.removeEventListener("resize", setInnerHeight)
    }
  }, [])
}
