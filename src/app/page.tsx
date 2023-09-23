"use client"

import React, { useEffect } from "react"
import { useAudio } from "@/hooks/use-audio"
import { GameWaiting } from "@/app/game/waiting"
import { GameOver } from "@/app/game/over"
import { GamePlaying } from "@/app/game/playing"
import clsx from "clsx"
import { useElementSize } from "@mantine/hooks"
import { useViewportStore } from "@/hooks/use-viewpoint"
import { useGameStore } from "@/store"

export default function GamePage() {
  const { setHeight, setWidth } = useViewportStore()
  const { ref, width, height } = useElementSize()

  useEffect(() => {
    setWidth(width)
    setHeight(height)
  }, [width, height])

  return (
    <main
      className={clsx(
        "w-full h-full overflow-auto",
        "md:w-[640px] mx-auto border border-gray-800 flex flex-col bg-cover"
      )}
      style={{
        backgroundImage: `url(/image/rain01.gif)`,
      }}
    >
      {/*  顶部的花西子笔，（基于笔的高度）固定高度 */}
      <div
        className="bg-repeat-x w-full shrink-0 h-16"
        style={{
          backgroundImage: "url(/image/pen2.png)",
        }}
      />

      <div className={"w-full grow relative"} ref={ref}>
        <GameCore />
      </div>
    </main>
  )
}

const GameCore = () => {
  const { state } = useGameStore()
  useAudio(state)

  switch (state) {
    case "waiting":
      return <GameWaiting />
    case "playing":
    case "paused":
      return <GamePlaying />
    case "over":
      return <GameOver />
    default:
      return "loading"
  }
}
