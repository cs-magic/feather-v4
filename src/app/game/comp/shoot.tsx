import React from "react"

import clsx from "clsx"

export const Shoot = () => {
  return (
    <button
      className={clsx(
        "w-16 h-16 rounded-full bg-gray-800 flex justify-center items-center p-6 whitespace-nowrap  text-white transition-all select-none"
      )}
      style={
        {
          // background: t === 1 ? "darkred" : `hsl(195,68%,${20 + t * 30}%)`,
          // scale: 1 + Math.min(0.3, Math.log(1 + t)),
        }
      }
    >
      蓄力
    </button>
  )
}
