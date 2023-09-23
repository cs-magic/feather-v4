"use client"

import React, { useEffect, useState } from "react"
import { useEndingBGM, usePlayingBGM } from "@/hooks/use-bgm"
import { GameWaiting } from "@/app/game/waiting"
import { GameOver } from "@/app/game/over"
import { GamePlaying } from "@/app/game/playing"
import clsx from "clsx"
import { useElementSize } from "@mantine/hooks"
import { useViewport } from "@/store"
import useInterval from "@/hooks/use-interval"
import { client } from "@/lib/game/client"
import { GAME } from "@/config"
import { IGame, IGameEvent } from "@/lib/game/server"

export default function GamePage() {
  const { setViewport } = useViewport()
  const { ref, width, height } = useElementSize()

  useEffect(() => {
    setViewport({ w: width, h: height })
  }, [width, height])

  return (
    <main
      className={clsx(
        "overflow-auto",
        "border border-gray-800 flex flex-col bg-cover"
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

      <div className={"w-full md:w-[640px] mx-auto  grow relative"} ref={ref}>
        <GameCore />
      </div>
    </main>
  )
}

const GameCore = () => {
  const [game, setGame] = useState<IGame>()
  const [events, setEvents] = useState<IGameEvent[]>([])

  usePlayingBGM(game)
  useEndingBGM(game)

  useInterval(() => {
    const { game, events } = client.sync()
    setGame(game)
    setEvents(events)
  }, 1000 / GAME.fps.client)

  switch (game?.state) {
    case "playing":
    case "paused":
      return <GamePlaying game={game} events={events} />
    case "over":
      return <GameOver />
    case "waiting":
    default:
      return <GameWaiting />
  }
}
