import { Joystick } from "react-joystick-component"
import { IJoystickUpdateEvent } from "react-joystick-component/build/lib/Joystick"
import { usePlayerSpeed } from "@/store"
import { ControllerBG, ControllerFG } from "@/config"

export const JoystickController = () => {
  const { setSpeed } = usePlayerSpeed()

  const handleMove = (event: IJoystickUpdateEvent) => {
    // console.log("moving: ", event)
    setSpeed(event.x ?? 0)
  }

  const handleStop = (event: IJoystickUpdateEvent) => {
    setSpeed(0)
    // console.log("stop: ", event)
  }

  const N = 80

  return (
    <Joystick
      size={N * 2}
      sticky={false}
      stickSize={N}
      baseColor={ControllerBG}
      stickColor={ControllerFG}
      move={handleMove}
      stop={handleStop}
    ></Joystick>
  )
}
