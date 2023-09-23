import { IPlayer } from "@/lib/game/player"
import { IGameData } from "@/lib/game/server"
import { useTestStore } from "@/store"
import clsx from "clsx"
import { PlayerStatus } from "@/app/game/entity/player"
import { LabelLine } from "@/app/utils/label.line"
import { client } from "@/lib/game/client"
import { GAME_LIFE_MAX, TOTAL_PROGRESS } from "@/config"
import { range } from "lodash"
import React from "react"

export const GameStatusbar = ({
  player,
  data,
}: {
  player: IPlayer
  data: IGameData
}) => {
  const { isTesting, setTesting } = useTestStore()

  return (
    <div
      className={clsx(
        "absolute inset-0 w-full flex gap-2 justify-between p-2 sm:p-4"
        // "scale-[70%] -translate-x-[80px] -translate-y-[80px]"
      )}
    >
      {/* 左上： 玩家状态 */}

      <PlayerStatus player={player} />

      {/* 右上： 游戏状态*/}
      <div className={"flex flex-col gap-1 "}>
        <LabelLine label={"⚙️ 设置"}>
          <button
            className={
              "btn btn-xs btn-ghost text-xs z-50 p-0 !min-h-[16px] h-4 border-none"
            }
            onClick={() => {
              console.log(data.state)
              client.do({
                type: data.state === "paused" ? "resume" : "pause",
              })
            }}
          >
            {data.state === "paused" ? "继续" : "暂停"}
          </button>
        </LabelLine>

        <LabelLine label={"🚪 关卡"}>
          <p className={"text-xs font-medium text-primary"}>
            {data.stage.toString().padStart(2, "0")}
          </p>
        </LabelLine>

        <LabelLine label={"💫 进度"}>
          <p className={"text-xs font-medium"}>
            {`${data.progress.toString().padStart(2, "0")} / ${TOTAL_PROGRESS}`}
          </p>
        </LabelLine>

        <LabelLine label={"❤️ 生命"}>
          <div className={"flex h-full divide-x border border-gray-200"}>
            {range(GAME_LIFE_MAX).map((k, i) => (
              <div
                className={clsx(
                  "w-2 h-full border-gray-300",
                  i < data.life &&
                    (data.life <= GAME_LIFE_MAX * 0.2
                      ? "bg-red-500"
                      : data.life <= GAME_LIFE_MAX * 0.4
                      ? "bg-yellow-500"
                      : "bg-green-500")
                )}
                key={i}
              />
            ))}
          </div>
        </LabelLine>

        {process.env.NODE_ENV === "development" && (
          <button
            className={"btn btn-xs text-xs z-50"}
            onClick={() => {
              setTesting(!isTesting)
            }}
          >
            测试 ({isTesting ? "on" : "off"})
          </button>
        )}
      </div>
    </div>
  )
}
