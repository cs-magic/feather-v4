import { CLIENT_FPS } from "@/config"
import { client, IClientGameData } from "@/lib/game/client"
import React, { useEffect, useState } from "react"
import useInterval from "@/hooks/use-interval"
import { GameStatusbar } from "@/app/game/comp/statusbar"
import { GameControl } from "@/app/game/comp/control"
import { GameRender } from "@/app/game/comp/render"
import { useGameEventsHandler } from "@/hooks/use-game-events-handler"

export const GamePlaying = () => {
  const { player } = client

  const [game, setGame] = useState<IClientGameData>()

  useGameEventsHandler(game?.events ?? [])

  useInterval(() => {
    setGame(client.sync())
  }, 1000 / CLIENT_FPS)

  useEffect(() => {
    client.do({ type: "prepare" })
  }, [])

  if (!game) return "loading"

  return (
    <div className={"w-full h-full overflow-hidden relative"}>
      {/* 道具： */}
      <GameRender data={game.data} />

      {/* 状态栏 */}
      <GameStatusbar player={player} data={game.data} />

      {/* 玩家控制 */}
      <GameControl player={player} />
    </div>
  )
}
