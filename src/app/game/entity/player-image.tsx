import React from "react"
import Image, { ImageProps, StaticImageData } from "next/image"
import { ignore } from "@/lib/helpers"
import { Assets } from "@/assets"
import clsx from "clsx"

/**
 *   // 启动200 ms
 *   // 2 秒走完10张，每秒5张，1张200ms
 *   // 最大 pressingTicks = 2.5 * 50 = 125
 *   //（实际按到2.5秒的时候已经接近了3秒）
 *
 * @param i
 * @constructor
 */
export const PlayerImage = ({ i }: { i: number }) => {
  return (
    <>
      {Assets.ljq.map((img, k) => (
        <Image
          key={k}
          src={img}
          alt={"player"}
          fill
          className={clsx(
            "pointer-events-none object-cover transition-all",
            // 必须使用hidden的手段，否则闪屏非常严重 ！
            i !== k && "hidden"
          )}
          priority
          onDragEnd={ignore}
          sizes={"width=200px;"}
        />
      ))}
    </>
  )
}

// memo 可能并不需要
export const PlayerImageMemo = React.memo(PlayerImage)
PlayerImageMemo.displayName = "PlayerImage"
