import { useEffect, useState } from "react"
import { animated, useSpring } from "@react-spring/web"
import { useElementSize } from "@mantine/hooks"
import { useGesture } from "@use-gesture/react"
import Image from "next/image"
import clsx from "clsx"
import useInterval from "@/hooks/interval"
import { CLIENT_FPS, DEBUG_SHOW_POS, LIFE_COST_INIT } from "@/config"
import { client } from "@/game/game-client"
import { IPlayer } from "@/game/player"

export const Player = ({
  container,
  player,
}: {
  container: { width: number }
  player: IPlayer
}) => {
  // 不应该用marginLeft，否则就不支持多人了
  const xKey = "left"

  const [holding, setHolding] = useState(LIFE_COST_INIT)
  const [isDragging, setDragging] = useState(false)
  const [isMoved, setMoved] = useState(false)
  const leftStart = container.width >> 1
  const [style, api] = useSpring(() => ({ [xKey]: 0 }))

  const { ref, width } = useElementSize()

  // 玩家一开始居中（anchor也居中），完了，可以朝左或朝右移动到与容器对齐的位置，这两个距离是相等的
  const dragConstraint = (container.width - width) >> 1

  const bind = useGesture(
    {
      onDrag: ({ movement: [mx], offset: [ox] }) => {
        // console.log("onDrag: ", { mx, [xKey]: style[xKey].get() })
        if (Math.abs(mx) > 10 && !isMoved) {
          setMoved(true)
          if (holding > 0) {
            client.do({
              type: "clench-give-up",
              data: { consumption: holding },
            })
          }
        }
        const targetX = leftStart + ox
        client.do({ type: "move", data: { x: targetX / container.width } })
        api.start({ [xKey]: targetX })
      },
      onDragEnd: () => {
        console.log("onDragEnd")

        // shoot if not moved
        if (!isMoved && holding > 0) {
          client.do({ type: "blow", data: { type: "rectangle" } })
        }

        setDragging(false)
        setMoved(false)
        client.do({ type: "idle" })
      },
      onDragStart: () => {
        console.log("onDragStart")
        setDragging(true)
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
      // 每个tick都增加1的体力消耗
      setHolding(holding + 1)
      if (player.life > 0 && holding > 0) client.do({ type: "clench" })
    }

    if (!isDragging || (isDragging && isMoved)) {
      setHolding(LIFE_COST_INIT)
    }
  }, 1000 / CLIENT_FPS)

  // console.log({ container, leftStart, left: left.get(), dragConstraint });
  // console.log({ life, lifeCost })

  const img =
    player.life <= 0 ? "cry" : Math.min(Math.floor(Math.max(holding, 0)), 10)

  return (
    <animated.div
      {...bind()}
      style={{ [xKey]: style[xKey] }}
      className={clsx(
        "absolute bottom-0",
        "-translate-x-1/2 touch-none select-none",
        "w-32 h-full" // 如果不固定 w 的话，absolute 的机制会让人物拖到右边后被压缩
      )}
    >
      {DEBUG_SHOW_POS && (
        <span
          className={"absolute right-0 top-0 bg-gray-800"}
        >{`x:${player.x.toFixed(1)}`}</span>
      )}
      <Image
        ref={ref}
        className={"touch-none select-none pointer-events-none object-cover"}
        // 大概每两帧一个动画，总共10张吹气+1张蓄力
        src={`/image/player/${img}.png`}
        alt={"player"}
        fill
        priority
        sizes={"width:120px;"}
      />
    </animated.div>
  )
}
