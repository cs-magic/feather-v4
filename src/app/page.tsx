"use client"

import { client } from "@/lib/game/client"
import React, { useState } from "react"
import { IGameData, GameEvent } from "@/lib/game/server"
import useInterval from "@/hooks/use-interval"
import { CLIENT_FPS } from "@/config"
import { useAudio } from "@/hooks/use-audio"
import { GameWaiting } from "@/app/game/state/waiting"
import { GameOver } from "@/app/game/state/over"
import { GamePlaying } from "@/app/game/state/playing"

export default function GamePage() {
  const [gameData, setGameData] = useState<IGameData>()
  const [gameEvents, setGameEvents] = useState<GameEvent[]>([])

  useInterval(() => {
    setGameData(client.sync())
    setGameEvents(client.server.events.slice(client.eventsRead))
    client.eventsRead = client.server.events.length
  }, 1000 / CLIENT_FPS)

  useAudio(gameData?.state)

  switch (gameData?.state) {
    case "waiting":
      return <GameWaiting />
    case "playing":
    case "paused":
      return <GamePlaying data={gameData} events={gameEvents} />
    case "over":
      return <GameOver />
    default:
      return "loading"
  }
}
