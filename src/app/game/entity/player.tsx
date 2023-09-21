import React from "react"
import { useSpring } from "@react-spring/web"
import { useGesture } from "@use-gesture/react"
import clsx from "clsx"
import { PLAYER_IMAGE_WIDTH, PLAYER_LIFE_MAX, PLAYER_RAGE_MAX } from "@/config"
import { client } from "@/lib/game/client"
import {
  getRectangleBlowXRadius,
  getRectangleBlowY,
  IPlayer,
} from "@/lib/game/player"
import useSound from "use-sound"
import { Obj, ObjContainer } from "@/app/game/entity/obj"
import Image from "next/image"
import { LabelLine, ProgressLabelLine } from "@/app/utils/label.line"
import { ignore } from "@/lib/helpers"
import { useToggle, useVibrate } from "react-use"
import { useViewportStore } from "@/hooks/use-viewpoint"

/**
 * todo: 对 drag 进行一层封装
 * @param player
 * @constructor
 */
export const Player = ({ player }: { player: IPlayer }) => {
  const { width: vw, height: vh } = useViewportStore()

  const X = vw >> 1 // 初始的 x 位置

  const [{ left }, api] = useSpring(() => ({
    left: vw >> 1,
  }))

  const [playGiveUp, {}] = useSound("/sound/有没有认真工作.mp3")
  const [playWorkHard, {}] = useSound("/sound/哪里贵了.mp3")

  const [vibrating, toggleVibrating] = useToggle(true)

  useVibrate(vibrating, [300, 100, 200, 100, 1000, 300], false)

  const bind = useGesture(
    {
      onDragStart: () => {
        console.log("onDragStart")
        // note: !important: 不能用正在的动画位置，否则会脱节，因为过 x ms后位置就不在这了
        client.do({ type: "pressDown", x: (left.animation.to as number) / vw })
      },
      onDrag: ({ movement: [mx], offset: [ox] }) => {
        // console.log("onDrag: ", { mx })
        // 应该直接传最终效果，毕竟屏幕上只是动画
        client.do({ type: "move", x: (X + ox) / vw })
        api.start({ left: X + ox })
      },
      onDragEnd: () => {
        console.log("onDragEnd")
        client.do({ type: "pressUp" })
      },
    },
    {
      drag: {
        bounds: {
          // 玩家一开始居中（anchor也居中），完了，可以朝左或朝右移动到与容器对齐的位置，这两个距离是相等的
          left: -(vw - PLAYER_IMAGE_WIDTH) >> 1,
          right: (vw - PLAYER_IMAGE_WIDTH) >> 1,
        },
      },
    }
  )

  return (
    <>
      <ObjContainer
        x={left}
        y={vh}
        className={"-translate-y-[50%] z-50"}
        style={{
          width: vw * 0.28,
          height: vw * 0.28 * 1.2,
        }}
        {...bind()}
      >
        <Image
          src={getPlayerImg(player)}
          alt={"player"}
          fill
          className={"pointer-events-none object-cover"}
          priority
          onDragEnd={ignore}
          sizes={"width=200px;"}
        />
      </ObjContainer>
      <Obj
        w={2 * vw * getRectangleBlowXRadius()}
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

const getPlayerImg = (player: IPlayer, withCry?: boolean) => {
  // 启动200 ms
  // 2 秒走完10张，每秒5张，1张200ms
  // 最大 pressingTicks = 2.5 * 50 = 125
  //（实际按到2.5秒的时候已经接近了3秒）

  const filename =
    withCry && player.life <= 1
      ? "cry"
      : // [0-100] --> [0, 10]
        Math.floor(player.rage / 10)
  return `/image/player/ljq/${filename}.png`
}

export const PlayerStatus = ({ player }: { player: IPlayer }) => {
  return (
    <div
      className={clsx(
        "flex h-fit items-end gap-2"
        // "bg-cyan-800"
      )}
    >
      <div className={"relative w-14 h-16 shrink-0 "}>
        <Image
          // 左上角要哭
          src={getPlayerImg(player, true)}
          alt={"player"}
          fill
          className={"object-cover"}
        />
      </div>
      {/*<Image*/}
      {/*  // 左上角要哭*/}
      {/*  src={getPlayerImg(player, true)}*/}
      {/*  alt={"player"}*/}
      {/*  width={60}*/}
      {/*  height={80}*/}
      {/*  className={"h-fit shrink-0"}*/}
      {/*  priority*/}
      {/*/>*/}
      <div className={"flex flex-col gap-1"}>
        <LabelLine label={"⭐️ 得分"}>{player.score}</LabelLine>

        <ProgressLabelLine
          label={"😁 体力"}
          value={player.life}
          valueMax={PLAYER_LIFE_MAX}
          className={"progress-accent w-12"}
        />

        <ProgressLabelLine
          label={"🔥 怒气"}
          value={player.rage}
          valueMax={PLAYER_RAGE_MAX}
          className={"progress-warning w-12"}
        />
      </div>
    </div>
  )
}
