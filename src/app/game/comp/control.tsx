import { IPlayer } from "@/lib/game/player"
import { Player } from "@/app/game/entity/player"
import React from "react"
import { useControlMode } from "@/store"
import { JoystickController } from "./joystick"
import { Shoot } from "@/app/game/comp/shoot"
import { ControllerMargin } from "@/config"

export const GameControl = ({ player }: { player: IPlayer }) => {
  const { value: controlMode } = useControlMode()

  return (
    <>
      {/* 玩家 */}
      <Player player={player} />
      {controlMode === "joystick" && (
        <>
          <div
            className={"absolute  z-50 -translate-x-1/2 translate-y-1/2"}
            style={{
              left: ControllerMargin,
              bottom: ControllerMargin,
            }}
          >
            <JoystickController />
          </div>

          <div
            className={"absolute z-50 translate-x-1/2 translate-y-1/2"}
            style={{
              right: ControllerMargin,
              bottom: ControllerMargin,
            }}
          >
            <Shoot />
          </div>
        </>
      )}
    </>
  )
}
