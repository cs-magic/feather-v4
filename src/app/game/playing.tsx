import { client } from "@/lib/game/client"
import React, { useEffect } from "react"
import { GameStatusbar } from "@/app/game/comp/statusbar"
import { GameControl } from "@/app/game/comp/control"
import { GameRender } from "@/app/game/comp/render"

import { useEventsBGM } from "@/hooks/use-bgm"
import { IGame, IGameEvent } from "@/lib/game/server"

export const GamePlaying = ({
  game,
  events,
}: {
  game: IGame
  events: IGameEvent[]
}) => {
  useEventsBGM(events)

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
      <GameStatusbar player={client.player} game={game} />

      {/* 玩家控制 */}
      <GameControl player={client.player} />
    </div>
  )
}
