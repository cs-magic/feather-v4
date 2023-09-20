import { usePlayerStore } from "@/store/player.slice"
import { useEffect, useState } from "react"
import { animated, useSpring } from "@react-spring/web"
import { useElementSize } from "@mantine/hooks"
import { useGesture } from "@use-gesture/react"
import Image from "next/image"
import clsx from "clsx"
import useInterval from "@/hooks/interval"
import { SERVER_FPS } from "@/config"

export const Player = ({ container }: { container: { width: number } }) => {
  const { life, rage, setLife, setRage } = usePlayerStore()

  const [lifeCost, setLifeCost] = useState(0)
  const [isDragging, setDragging] = useState(false)
  const [isMoved, setMoved] = useState(false)
  const leftStart = container.width >> 1
  const xKey = "marginLeft"
  const [style, api] = useSpring(() => ({ [xKey]: 0 }))

  const { ref, width } = useElementSize()

  const shoot = (playerX: number, playerRage: number) => {
    // todo
  }

  // 玩家一开始居中（anchor也居中），完了，可以朝左或朝右移动到与容器对齐的位置，这两个距离是相等的
  const dragConstraint = (container.width - width) >> 1

  const bind = useGesture(
    {
      onDrag: ({ movement: [mx], offset: [ox] }) => {
        console.log("onDrag")
        if (Math.abs(mx) > 10 && !isMoved) {
          setMoved(true)
        }
        console.log({ mx, ox, [xKey]: style[xKey].get() })
        api.start({ [xKey]: leftStart + ox })
      },
      onDragStart: () => {
        console.log("onDragStart")
        setDragging(true)
      },
      onDragEnd: () => {
        console.log("onDragEnd")
        setDragging(false)
        setMoved(false)

        // shoot if not moved
        if (!isMoved) {
          shoot(style[xKey].get(), rage)
        }
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
  }, 1000 / SERVER_FPS)

  // console.log({ container, leftStart, left: left.get(), dragConstraint });
  console.log({ life, lifeCost })

  return (
    <animated.div
      {...bind()}
      style={{ [xKey]: style[xKey] }}
      className={clsx(
        "-translate-x-1/2 touch-none",
        "w-32" // 如果不固定 w 的话，absolute 的机制会让人物拖到右边后被压缩
      )}
    >
      <Image
        ref={ref}
        className={"touch-none select-none pointer-events-none w-full h-auto"}
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
