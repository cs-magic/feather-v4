import { IGame } from "@/lib/game/game-server"
import { useScreenStore } from "@/hooks/use-screen"
import { GAME_LIFE_MAX, PLAYER_LIFE_MAX, PLAYER_RAGE_MAX, TOP } from "@/config"
import { client } from "@/lib/game/game-client"
import clsx from "clsx"
import { Obj, ObjContainer } from "@/app/game/entity/obj"
import FeatherImage from "../../../public/image/feather.png"
import CoinImage from "../../../public/image/coin.png"
import { LabelLine, ProgressLabelLine } from "@/app/utils/label.line"
import { Player } from "@/app/game/entity/player"
import React from "react"
import Image from "next/image"
import { useTestStore } from "@/store/player.slice"

export const GamePlaying = ({ game }: { game: IGame }) => {
  const { width, height: sh } = useScreenStore()
  const height = sh - TOP

  const { isTesting, setTesting } = useTestStore()

  const { player } = client

  return (
    <div
      className={clsx(
        "relative", // 花西子口红下方是实际操作区域
        "w-full grow overflow-hidden"
      )}
    >
      {/* 全屏：道具： */}
      {game.objects.map((f, i) => (
        <ObjContainer
          key={i}
          x={f.x * width}
          y={f.y * height}
          className={
            clsx()
            // "animate-bounce"
          }
        >
          <Image
            width={80}
            height={20}
            src={f.type === "feather" ? FeatherImage.src : CoinImage.src}
            alt={"object"}
          />
        </ObjContainer>
      ))}

      {/* 左上： 玩家状态 */}
      <div className={clsx("absolute inset-0 shrink-0 p-2 z-50")}>
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

      {/* 右上： 游戏状态*/}
      <div className={"absolute right-4 top-2 flex flex-col gap-2 "}>
        <LabelLine label={"🚪 关卡"}>
          <span className={"text-xs"}>
            {game.stage.toString().padStart(2, "0")}
            {/*{`(${game.tick})`}*/}
          </span>
        </LabelLine>

        <ProgressLabelLine
          label={"❤️ 生命值"}
          value={game.life}
          valueMax={GAME_LIFE_MAX}
          className={"progress-success w-8"}
        />

        <button
          className={"btn btn-xs text-xs z-50"}
          onClick={() => {
            console.log(game.state)
            client.do({ type: game.state === "paused" ? "resume" : "pause" })
          }}
        >
          {game.state === "paused" ? "继续" : "暂停"}
        </button>
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

      {/* 玩家 */}
      <Player player={player} />
    </div>
  )
}
