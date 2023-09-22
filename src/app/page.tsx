"use client"

import { client, IClientGameData } from "@/lib/game/client"
import React, { useEffect, useRef, useState } from "react"
import useInterval from "@/hooks/use-interval"
import { CLIENT_FPS } from "@/config"
import { useAudio } from "@/hooks/use-audio"
import { GameWaiting } from "@/app/game/state/waiting"
import { GameOver } from "@/app/game/state/over"
import { GamePlaying } from "@/app/game/state/playing"
import clsx from "clsx"
import { useElementSize } from "@mantine/hooks"
import { useViewportStore } from "@/hooks/use-viewpoint"
import { GameCanvas } from "@/app/game/game-canvas"

export default function GamePage() {
  const { setHeight, setWidth } = useViewportStore()
  const { ref, width, height } = useElementSize()
  const gameComp = useGame()

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
        {gameComp}
      </div>
    </main>
  )
}

const useGame = () => {
  const [game, setGame] = useState<IClientGameData>()

  useInterval(() => {
    setGame(client.sync())
  }, 1000 / CLIENT_FPS)

  useAudio(game?.data.state)

  switch (game?.data.state) {
    case "waiting":
      return <GameWaiting />
    case "playing":
    case "paused":
      // return <GameCanvas game={game} />
      return <GamePlaying data={game!.data} events={game!.events} />
    case "over":
      return <GameOver />
    default:
      return "loading"
  }
}
