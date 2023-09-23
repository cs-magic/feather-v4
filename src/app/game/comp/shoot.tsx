import React, { useState } from "react"

import clsx from "clsx"
import { useGesture } from "@use-gesture/react"
import { client } from "@/lib/game/client"
import useSound from "use-sound"

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
        "w-16 h-16 rounded-full text-slate-200 flex justify-center items-center p-6 whitespace-nowrap transition-all select-none touch-none font-black",
        isPressing && "scale-[110%]"
      )}
      style={{
        background: "rgba(50, 50, 50, 50%)",
      }}
    >
      X
    </button>
  )
}
