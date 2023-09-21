import React, { useState } from "react"
import { useSpring } from "@react-spring/web"
import { useElementSize } from "@mantine/hooks"
import { useGesture } from "@use-gesture/react"
import clsx from "clsx"
import useInterval from "@/hooks/use-interval"
import { CLIENT_FPS, LIFE_COST_INIT, TOP } from "@/config"
import { client } from "@/lib/game/game-client"
import { IPlayer } from "@/lib/game/player"
import useSound from "use-sound"
import { Obj } from "@/app/game/entity/obj"

import { useScreenStore } from "@/hooks/use-screen"
import {
  getRectangleBlowXRadius,
  getRectangleBlowY,
} from "@/lib/game/player-blow"

export const Player = ({ player }: { player: IPlayer }) => {
  const { width: sw, height: sh } = useScreenStore()
  const { ref, width: pw, height: ph } = useElementSize()

  // 初始的 x 位置
  const X = sw >> 1
  // 游戏区域的高度
  const vh = sh - TOP

  const [pressedTicks, setPressedTicks] = useState(LIFE_COST_INIT)
  const [isMoved, setMoved] = useState(false)
  const [style, api] = useSpring(() => ({ left: sw >> 1 }))

  const [playGiveUp, {}] = useSound("/sound/有没有认真工作.mp3")
  const [playWorkHard, {}] = useSound("/sound/哪里贵了.mp3")

  const bind = useGesture(
    {
      onDrag: ({ movement: [mx], offset: [ox] }) => {
        // console.log("onDrag: ", { mx, [xKey]: style[xKey].get() })
        if (Math.abs(mx) > 10 && !isMoved) {
          setMoved(true)
          if (pressedTicks > longPressingTicks) {
            playGiveUp()

            client.do({
              type: "clench-give-up",
              data: { consumption: pressedTicks },
            })
          }
        }
        const targetX = X + ox
        client.do({ type: "move", data: { x: targetX / sw } })
        api.start({ left: targetX })
      },
      onDragEnd: () => {
        console.log("onDragEnd")

        // shoot if not moved
        if (!isMoved && pressedTicks > 0) {
          playWorkHard()
          client.do({ type: "blow", data: { type: "rectangle" } })
        }

        setPressedTicks(0)
        setMoved(false)
        client.do({ type: "idle" })
      },
      onDragStart: () => {
        setPressedTicks(1)
        console.log("onDragStart")
      },
    },
    {
      drag: {
        bounds: {
          // 玩家一开始居中（anchor也居中），完了，可以朝左或朝右移动到与容器对齐的位置，这两个距离是相等的
          left: -(sw - pw) >> 1,
          right: (sw - pw) >> 1,
        },
      },
    }
  )

  useInterval(() => {
    if (pressedTicks && !isMoved) {
      // 每个tick都增加1的体力消耗
      setPressedTicks(pressedTicks + 1)
      if (player.life > 0 && pressedTicks > 0) client.do({ type: "clench" })
    }

    if (!pressedTicks || (pressedTicks && isMoved)) {
      setPressedTicks(0)
    }
  }, 1000 / CLIENT_FPS)

  // console.log({ container, leftStart, left: left.get(), dragConstraint });
  // console.log({ life, lifeCost })
  console.log({ pressedTicks, longPressingTicks })

  return (
    <>
      <Obj
        ref={ref}
        w={180}
        h={160}
        x={style.left}
        y={vh}
        bg={getPlayerImg(player, pressedTicks)}
        className={"-translate-y-[70%] z-50"}
        {...bind()}
      />

      <Obj
        w={2 * sw * getRectangleBlowXRadius()}
        h={vh * getRectangleBlowY(player.rage)}
        x={style.left}
        y={vh}
        className={clsx(
          // "z-50",
          "-translate-y-[100%] ",
          "border-y-0 bg-gradient-to-t from-indigo-500"
        )}
      />
    </>
  )
}

// .5 s
const longPressingTicks = CLIENT_FPS / 2

const getPlayerImg = (player: IPlayer, pressedTicks: number) => {
  // 启动200 ms
  // 2 秒走完10张，每秒5张，1张200ms
  // 最大 pressingTicks = 2.5 * 50 = 125
  // （实际按到2.5秒的时候已经接近了3秒）
  const fileName =
    player.life <= 0
      ? "cry"
      : Math.floor(
          Math.min(
            (Math.max(pressedTicks - longPressingTicks, 0) / CLIENT_FPS) * 5,
            10
          )
        )
  return `/image/player/${fileName}.png`
}
