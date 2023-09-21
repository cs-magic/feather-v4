import { useEffect, useState } from "react"
import { Joystick } from "react-joystick-component"
import { IJoystickUpdateEvent } from "react-joystick-component/build/lib/Joystick"

import useInterval from "@/hooks/use-interval"
import { usePlayerStore } from "@/store"
import { Player } from "@/config"

export const JoystickController = () => {
  const [playerSpeed, setPlayerSpeed] = useState(0)
  const { x: x0, setX } = usePlayerStore()

  const handleMove = (event: IJoystickUpdateEvent) => {
    setPlayerSpeed((x) => event.x ?? 0)
    // console.log("moving: ", event)
  }

  const handleStop = (event: IJoystickUpdateEvent) => {
    setPlayerSpeed(0)
    // console.log("stop: ", event)
  }

  useInterval(() => {
    if (playerSpeed) {
      let x = x0
      x += playerSpeed * 0.3
      x = Math.max(x, Player.x.min)
      x = Math.min(x, Player.x.max)
      setX(x)
    }
  }, 20) // 50fps

  return (
    <Joystick
      size={100}
      sticky={false}
      stickSize={50}
      baseColor="#222"
      stickColor="#165E75"
      move={handleMove}
      stop={handleStop}
    ></Joystick>
  )
}
