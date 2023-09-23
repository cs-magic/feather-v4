import React, { useEffect } from "react"
import { useSpring } from "@react-spring/web"
import { useGesture } from "@use-gesture/react"
import clsx from "clsx"
import { PLAYER } from "@/config"
import { client } from "@/lib/game/client"
import {
  getRectangleBlowXRadius,
  getRectangleBlowY,
  IPlayer,
} from "@/lib/game/player"
import { Obj, ObjContainer } from "@/app/game/entity/obj"
import { LabelLine, ProgressLabelLine } from "@/app/utils/label.line"
import { PlayerImageMemo } from "@/app/game/entity/player-image"
import { useControlMode, usePlayerSpeed, useViewport } from "@/store"
import { clamp } from "lodash"

/**
 * todo: 对 drag 进行一层封装
 *
 * note: 因为 player 的图片需要基于服务器的状态进行更新，所以这个组件也需要在core组件内部
 * @param player
 * @constructor
 */
export const Player = ({ player }: { player: IPlayer }) => {
  const { value: controlMode } = useControlMode()
  const { speed } = usePlayerSpeed()
  const {
    viewport: { w: vw, h: vh },
  } = useViewport()
  const [{ left }, api] = useSpring(() => ({
    left: vw >> 1,
  }))

  const playerImageWidth = vw * PLAYER.w

  /**
   *
   * @param targetXPct
   */
  const move = (targetXPct: number) => {
    // todo: 应该直接传最终效果，毕竟屏幕上只是动画
    targetXPct = clamp(targetXPct, PLAYER.w / 2, 1 - PLAYER.w / 2)
    // console.log({ x: player.x, targetXPct })
    client.do({ type: "move", x: targetXPct })
    api.start({ left: targetXPct * vw })
  }

  useEffect(() => {
    // console.log({ x: player.x, speed })
    move(player.x + speed * 0.05)
  }, [speed])

  const bind = useGesture(
    {
      onDragStart: () => {
        console.log("onDragStart")
        // note: !important: 不能用正在的动画位置，否则会脱节，因为过 x ms后位置就不在这了
        client.do({ type: "pressDown", x: (left.animation.to as number) / vw })
      },
      onDrag: ({ movement: [mx], offset: [ox], delta: [dx] }) => {
        console.log("onDrag: ", { dx })
        move(player.x + dx / vw)
      },
      onDragEnd: () => {
        console.log("onDragEnd")
        client.do({ type: "pressUp" })
      },
    },
    {
      drag: {
        bounds: {
          // 1. 玩家一开始居中（anchor也居中），完了，可以朝左或朝右移动到与容器对齐的位置，这两个距离是相等的
          // left: -(vw - PLAYER_IMAGE_WIDTH) >> 1,
          // right: (vw - PLAYER_IMAGE_WIDTH) >> 1,
          //
          // 2. 在使用 delta + 服务端数据后，就不需要设置bounds了
        },
      },
    }
  )

  const props = controlMode === "gesture" ? { ...bind() } : {}
  return (
    <>
      <ObjContainer
        x={left}
        y={vh}
        className={"-translate-y-[50%] z-50"}
        style={{
          width: playerImageWidth,
          height: playerImageWidth * 1.2,
        }}
        {...props}
      >
        <PlayerImageMemo i={Math.floor(player.rage / 10)} />
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

export const PlayerStatus = ({ player }: { player: IPlayer }) => {
  return (
    <div
      className={clsx(
        "flex h-fit items-end gap-2"
        // "bg-cyan-800"
      )}
    >
      <div className={"relative w-14 h-16 shrink-0 "}>
        <PlayerImageMemo
          i={player.life <= 1 ? 11 : Math.floor(player.rage / 10)}
        />
        {/*<Image*/}
        {/*  // 左上角要哭*/}
        {/*  src={getPlayerImg(player, true)}*/}
        {/*  alt={"player"}*/}
        {/*  fill*/}
        {/*  className={"object-cover w-full h-auto"}*/}
        {/*  sizes={"width:80px"}*/}
        {/*/>*/}
      </div>

      <div className={"flex flex-col gap-1"}>
        <LabelLine icon={"⭐"} label={"得分"}>
          {player.score}
        </LabelLine>

        <ProgressLabelLine
          icon={"😁"}
          label={"体力"}
          value={player.life}
          valueMax={PLAYER.life.max}
          className={"progress-accent w-12"}
        />

        <ProgressLabelLine
          icon={"🔥"}
          label={"怒气"}
          value={player.rage}
          valueMax={PLAYER.rage.max}
          className={"progress-warning w-12"}
        />
      </div>
    </div>
  )
}
