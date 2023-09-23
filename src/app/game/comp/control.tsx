import { IPlayer } from "@/lib/game/player"
import { Player } from "@/app/game/entity/player"
import React from "react"
import { useControlMode } from "@/store"
import { JoystickController } from "./joystick"
import { Shoot } from "@/app/game/comp/shoot"

export const GameControl = ({ player }: { player: IPlayer }) => {
  const { value: controlMode } = useControlMode()

  return (
    <>
      {/* 玩家 */}
      <Player player={player} />
      {controlMode === "joystick" && (
        <>
          <div className={"absolute left-12 bottom-12 z-50"}>
            <JoystickController />
          </div>

          <div className={"absolute right-12 bottom-12 z-50"}>
            <Shoot />
          </div>
        </>
      )}
    </>
  )
}
