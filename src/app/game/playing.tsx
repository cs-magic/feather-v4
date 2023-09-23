import { CLIENT_FPS } from "@/config"
import { client } from "@/lib/game/client"
import React, { useEffect } from "react"
import useInterval from "@/hooks/use-interval"
import { GameStatusbar } from "@/app/game/comp/statusbar"
import { GameControl } from "@/app/game/comp/control"
import { GameRender } from "@/app/game/comp/render"

import { useEventsBGM } from "@/hooks/use-bgm"
import { useEvents, useGame } from "@/store"

export const GamePlaying = () => {
  const { player } = client

  const { game, setGame } = useGame()
  const { setEvents } = useEvents()

  useEventsBGM()

  useInterval(() => {
    const { game, events } = client.sync()
    setGame(game)
    setEvents(events)
  }, 1000 / CLIENT_FPS)

  useEffect(() => {
    // - 单人prepare 则立即开始
    // - 多人则还需要等待
    client.do({ type: "prepare" })
  }, [])

  if (!game) return "loading"

  return (
    <div className={"w-full h-full overflow-hidden relative"}>
      {/* 道具： */}
      <GameRender game={game} />

      {/* 状态栏 */}
      <GameStatusbar player={player} game={game} />

      {/* 玩家控制 */}
      <GameControl player={player} />
    </div>
  )
}
