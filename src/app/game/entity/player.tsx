import React, { useState } from "react"
import { config, easings, useSpring } from "@react-spring/web"
import { useGesture } from "@use-gesture/react"
import clsx from "clsx"
import useInterval from "@/hooks/use-interval"
import {
  CLIENT_FPS,
  PLAYER_LIFE_MAX,
  PLAYER_RAGE_MAX,
  PlayerImageWidth,
  TOP,
} from "@/config"
import { client } from "@/lib/game/game-client"
import { IPlayer } from "@/lib/game/player"
import useSound from "use-sound"
import { Obj, ObjContainer } from "@/app/game/entity/obj"

import { useScreenStore } from "@/hooks/use-screen"
import {
  getRectangleBlowXRadius,
  getRectangleBlowY,
} from "@/lib/game/player-blow"
import { Assets } from "@/assets"
import Image from "next/image"
import { LabelLine, ProgressLabelLine } from "@/app/utils/label.line"

/**
 * todo: 对 drag 进行一层封装
 * @param player
 * @constructor
 */
export const Player = ({ player }: { player: IPlayer }) => {
  const { width: sw, height: sh } = useScreenStore()

  // 初始的 x 位置
  const X = sw >> 1
  // 游戏区域的高度
  const vh = sh - TOP

  const [isMoved, setMoved] = useState(false)
  const [{ pressedTicks, left }, api] = useSpring(() => ({
    pressedTicks: 0,
    left: sw >> 1,
  }))

  const [playGiveUp, {}] = useSound("/sound/有没有认真工作.mp3")
  const [playWorkHard, {}] = useSound("/sound/哪里贵了.mp3")

  const blow = {
    onFinal: () => {
      api.start({
        pressedTicks: 0,
        config: config.molasses,
      })
    },

    onCancel: () => {
      setMoved(true)
      if (pressedTicks.get() > longPressingTicks) {
        playGiveUp()

        client.do({
          type: "clench-give-up",
          data: { consumption: pressedTicks.get() },
        })
      }
      blow.onFinal()
    },

    onSuccess: () => {
      playWorkHard()
      client.do({ type: "blow", data: { type: "rectangle" } })
      blow.onFinal()
    },
  }

  const bind = useGesture(
    {
      onDragStart: () => {
        api.start({ pressedTicks: 1 })
        console.log("onDragStart")
      },

      onDrag: ({ movement: [mx], offset: [ox] }) => {
        // console.log("onDrag: ", { mx, [xKey]: style[xKey].get() })

        // cancel blow if move too far
        if (Math.abs(mx) > 10 && !isMoved) blow.onCancel()

        api.start({ left: X + ox })
      },

      onDragEnd: () => {
        console.log("onDragEnd")

        // blow if not moved
        if (!isMoved && pressedTicks.get() > longPressingTicks) blow.onSuccess()

        setMoved(false)
        client.do({ type: "idle" })
      },
    },
    {
      drag: {
        bounds: {
          // 玩家一开始居中（anchor也居中），完了，可以朝左或朝右移动到与容器对齐的位置，这两个距离是相等的
          left: -(sw - PlayerImageWidth) >> 1,
          right: (sw - PlayerImageWidth) >> 1,
        },
      },
    }
  )

  useInterval(() => {
    // note: UI 与后端 left 保持一致
    client.do({ type: "move", data: { x: left.get() / sw } })

    const released = pressedTicks.animation.to === 0

    if (!released && !isMoved) {
      // 每个tick都增加1的体力消耗
      api.start({ pressedTicks: (pressedTicks.animation.to as number) + 1 })
      if (player.life > 0 && pressedTicks.get() > 0)
        client.do({ type: "clench" })
    }
  }, 1000 / CLIENT_FPS)

  // console.log({ container, leftStart, left: left.get(), dragConstraint });
  // console.log({ life, lifeCost })
  // console.log({ pressedTicks, longPressingTicks })

  const pressed = pressedTicks.get()
  console.log({ pressed })

  return (
    <>
      <ObjContainer
        x={left}
        y={vh}
        className={"-translate-y-[50%] z-50 w-48 h-52"}
        {...bind()}
      >
        <Image
          src={getPlayerImg(player, pressed)}
          alt={"player"}
          fill
          className={"pointer-events-none"}
          priority
          sizes={"width:120px;"}
          onDragEnd={(e) => e.preventDefault()}
        />
      </ObjContainer>
      {/*<Obj*/}
      {/*  ref={ref}*/}
      {/*  w={180}*/}
      {/*  h={160}*/}
      {/*  x={style.left}*/}
      {/*  y={vh}*/}
      {/*  bg={getPlayerImg(player, pressedTicks)}*/}
      {/*  className={"-translate-y-[100%] z-50"}*/}
      {/*  {...bind()}*/}
      {/*/>*/}

      <Obj
        w={2 * sw * getRectangleBlowXRadius()}
        h={vh * getRectangleBlowY(player.rage)}
        x={left}
        y={vh}
        className={clsx(
          // "z-50 pointer-events-none",
          "-translate-y-[100%] ",
          "border-y-0 bg-gradient-to-t from-indigo-500"
        )}
      />
    </>
  )
}

// .5 s
const longPressingTicks = Math.floor(CLIENT_FPS / 5)

const getPlayerImg = (
  player: IPlayer,
  pressedTicks: number,
  withCry?: boolean
) => {
  // 启动200 ms
  // 2 秒走完10张，每秒5张，1张200ms
  // 最大 pressingTicks = 2.5 * 50 = 125
  //（实际按到2.5秒的时候已经接近了3秒）

  const filename =
    withCry && player.life <= 1
      ? "cry"
      : Math.floor(
          Math.min(
            (Math.max(pressedTicks - longPressingTicks, 0) / CLIENT_FPS) * 5,
            10
          )
        )
  return `/image/player/ljq/${filename}.png`
}

export const PlayerStatus = ({ player }: { player: IPlayer }) => {
  return (
    <div className={"flex gap-2"}>
      <Image
        // 左上角要哭
        src={getPlayerImg(player, player.rage, true)}
        alt={"player"}
        width={60}
        height={80}
        className={"h-auto shrink-0 w-20"}
        priority
      />
      <div className={"flex flex-col gap-2"}>
        <LabelLine label={"⭐️ 得分"}>{player.score}</LabelLine>

        <ProgressLabelLine
          label={"😁 体力值"}
          value={player.life}
          valueMax={PLAYER_LIFE_MAX}
          className={"progress-accent w-32"}
        />

        <ProgressLabelLine
          label={"🔥 充能条"}
          value={player.rage}
          valueMax={PLAYER_RAGE_MAX}
          className={"progress-warning w-32"}
        />
      </div>
    </div>
  )
}
