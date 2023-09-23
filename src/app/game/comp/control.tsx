import { IPlayer } from "@/lib/game/player"
import { Player } from "@/app/game/entity/player"
import React from "react"

export const GameControl = ({ player }: { player: IPlayer }) => {
  return (
    <>
      {/* 玩家 */}
      <Player player={player} />

      {/*<div className={"absolute left-12 bottom-12 z-50"}>*/}
      {/*  <JoystickController />*/}
      {/*</div>*/}

      {/*<div className={"absolute right-12 bottom-12 z-50"}>*/}
      {/*  <Shoot />*/}
      {/*</div>*/}
    </>
  )
}
