import { usePlayerStore } from "@/store/player.slice"
import { useEffect, useState } from "react"
import { animated, useSpring } from "@react-spring/web"
import { useElementSize } from "@mantine/hooks"
import { useGesture } from "@use-gesture/react"
import Image from "next/image"
import clsx from "clsx"
import useInterval from "@/hooks/interval"
import { CLIENT_FPS } from "@/config"
import { gameClient } from "@/game/game-client"

export const Player = ({ container }: { container: { width: number } }) => {
  const { life, rage, setLife, setRage } = usePlayerStore()

  const [lifeCost, setLifeCost] = useState(0)
  const [isDragging, setDragging] = useState(false)
  const [isMoved, setMoved] = useState(false)
  const leftStart = container.width >> 1
  const xKey = "marginLeft"
  const [style, api] = useSpring(() => ({ [xKey]: 0 }))

  const { ref, width } = useElementSize()

  // 玩家一开始居中（anchor也居中），完了，可以朝左或朝右移动到与容器对齐的位置，这两个距离是相等的
  const dragConstraint = (container.width - width) >> 1

  const bind = useGesture(
    {
      onDrag: ({ movement: [mx], offset: [ox] }) => {
        // console.log("onDrag: ", { mx, ox, [xKey]: style[xKey].get() })
        if (Math.abs(mx) > 10 && !isMoved) {
          setMoved(true)
        }
        const targetX = leftStart + ox
        gameClient.do({ type: "move", data: { x: targetX / container.width } })
        api.start({ [xKey]: targetX })
      },
      onDragStart: () => {
        console.log("onDragStart")
        setDragging(true)
      },
      onDragEnd: () => {
        console.log("onDragEnd")

        // shoot if not moved
        if (!isMoved) {
          gameClient.do({
            type: "blow",
            data: {
              type: "rectangle",
              f: lifeCost,
            },
          })
        }

        setDragging(false)
        setMoved(false)
      },
    },
    {
      drag: {
        bounds: {
          left: -dragConstraint,
          right: dragConstraint,
        },
      },
    }
  )

  useEffect(() => {
    api.set({ [xKey]: leftStart })
  }, [container.width])

  useInterval(() => {
    // console.log("interval")
    if (isDragging && !isMoved) {
      setLifeCost(lifeCost + 1)
      setLife(life - 1)
    }

    if (!isDragging || (isDragging && isMoved)) {
      if (lifeCost) {
        setLife(life + lifeCost / 2) // 恢复一半体力消耗
        setLifeCost(0)
      }
    }
  }, 1000 / CLIENT_FPS)

  // console.log({ container, leftStart, left: left.get(), dragConstraint });
  // console.log({ life, lifeCost })

  return (
    <animated.div
      {...bind()}
      style={{ [xKey]: style[xKey] }}
      className={clsx(
        "-translate-x-1/2 touch-none select-none",
        "w-32" // 如果不固定 w 的话，absolute 的机制会让人物拖到右边后被压缩
      )}
    >
      <Image
        ref={ref}
        className={"touch-none select-none pointer-events-none w-full h-auto"}
        // 大概每两帧一个动画，总共10张吹气+1张蓄力
        src={`/image/player/${Math.min(Math.floor(lifeCost / 2), 10)}.png`}
        alt={"player"}
        width={120}
        height={160}
        priority
        sizes={"width:120px;"}
      />
    </animated.div>
  )
}
