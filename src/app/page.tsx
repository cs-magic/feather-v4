"use client"

import { client } from "@/lib/game/game-client"
import React, { useState } from "react"
import { IGame } from "@/lib/game/game-server"
import useInterval from "@/hooks/use-interval"
import { CLIENT_FPS } from "@/config"
import { useAudio } from "@/hooks/use-audio"
import { GameWaiting } from "@/app/game/waiting"
import { GameOver } from "@/app/game/over"
import { GamePlaying } from "@/app/game/playing"

export default function GamePage() {
  const [game, setGame] = useState<IGame>()

  useInterval(() => {
    setGame(client.sync())
  }, 1000 / CLIENT_FPS)

  useAudio(game?.state)

  switch (game?.state) {
    case "waiting":
      return <GameWaiting />
    case "playing":
    case "paused":
      return <GamePlaying game={game} />
    case "over":
      return <GameOver />
    default:
      return "loading"
  }
}
