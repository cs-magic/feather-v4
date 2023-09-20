"use client"
import React, { PropsWithChildren, useEffect } from "react"

export default function GameLayout({ children }: PropsWithChildren) {
  /**
   * set height for mobile browser (safari, chrome ...) to be full of inner height (but invalid !)
   */
  useEffect(() => {
    const setInnerHeight = () => {
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

  return (
    <>
      <div className={"w-full grow flex flex-col overflow-auto"}>
        {children}
      </div>
    </>
  )
}
