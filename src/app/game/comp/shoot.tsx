import React, { useState } from "react"

import clsx from "clsx"
import { useGesture } from "@use-gesture/react"
import { client } from "@/lib/game/client"
import {
  ControllerBackground,
  ControllerBG,
  ControllerFG,
  ControllerForeground,
  ControllerMargin,
} from "@/config"

export const Shoot = () => {
  const [isPressing, setPressing] = useState(false)
  const bind = useGesture(
    {
      onDragStart: () => {
        setPressing(true)
        console.log("onDragStart")
        client.do({ type: "clench-start" })
      },

      onDragEnd: () => {
        setPressing(false)
        console.log("onDragEnd")
        client.do({ type: "clench-end" })
      },
    },
    {}
  )

  return (
    <button
      {...bind()}
      className={clsx(
        "rounded-full flex justify-center items-center p-6 whitespace-nowrap transition-all select-none touch-none font-black",
        isPressing && "scale-[110%]"
      )}
      style={{
        color: ControllerFG,
        background: ControllerBG,
        width: ControllerMargin * 1.5,
        height: ControllerMargin * 1.5,
      }}
    >
      X
    </button>
  )
}
