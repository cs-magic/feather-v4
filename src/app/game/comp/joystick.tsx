import { Joystick } from "react-joystick-component"
import { IJoystickUpdateEvent } from "react-joystick-component/build/lib/Joystick"
import { usePlayerSpeed } from "@/store"

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

  return (
    <Joystick
      size={100}
      sticky={false}
      stickSize={50}
      baseColor="rgba(50,50,50,50%)"
      stickColor="rgba(200,200,200,20%)"
      move={handleMove}
      stop={handleStop}
    ></Joystick>
  )
}
