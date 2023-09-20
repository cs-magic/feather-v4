import { IGame } from "@/lib/game/game-server"
import { useElementSize } from "@mantine/hooks"
import { LabelLine, ProgressLabelLine } from "@/app/components-general/progress"
import { DEBUG_SHOW_POS, GAME_LIFE_MAX } from "@/config"
import Image from "next/image"
import FeatherImage from "../../../public/image/feather.png"
import CoinImage from "../../../public/image/coin.png"
import React from "react"

import { getMainPlayer } from "@/lib/game/player"
import { PlayerStatus } from "@/app/components/player-status"
import { client } from "@/lib/game/game-client"
import {
  getRectangleBlowXRadius,
  getRectangleBlowY,
} from "@/lib/game/player-blow"
import clsx from "clsx"

export const GameMain = ({ game }: { game: IGame }) => {
  const { ref, width, height } = useElementSize()
  const mainPlayer = getMainPlayer(game)!

  return (
    <div
      className={"w-full grow relative border-b border-gray-700 -mb-16"}
      ref={ref}
    >
      {game.players
        .filter((p) => p.rage)
        .map(({ x, rage, id }) => {
          return (
            <div
              className={clsx(
                "absolute -translate-x-1/2  rounded-t-xl border-y-0",
                "bg-gradient-to-t from-indigo-500"
              )}
              style={{
                left: x * width,
                bottom: 0,
                width: getRectangleBlowXRadius() * 2 * width,
                height: getRectangleBlowY(rage) * height,
              }}
              key={id}
            />
          )
        })}

      <PlayerStatus player={mainPlayer} />

      <div className={"absolute right-4 top-2 flex flex-col gap-2 "}>
        <LabelLine label={"🚪 关卡"}>
          <span className={"text-xs"}>
            {game.stage.toString().padStart(2, "0")}
          </span>
        </LabelLine>

        <ProgressLabelLine
          label={"❤️ 生命值"}
          value={game.life}
          valueMax={GAME_LIFE_MAX}
          className={"progress-success w-8"}
        />

        <button
          className={"btn btn-xs text-xs"}
          onClick={() => {
            client.do({ type: game.state === "paused" ? "resume" : "pause" })
          }}
        >
          {game.state === "paused" ? "继续" : "暂停"}
        </button>
      </div>

      {game.objects.map((f, i) => (
        <div
          key={i}
          className={
            "absolute -translate-x-1/2 -translate-y-1/2 w-12 select-none"
          }
          style={{ top: height * f.y, left: width * f.x }}
        >
          {DEBUG_SHOW_POS && (
            <span
              className={"absolute right-0 top-0 bg-gray-800"}
            >{`x:${f.x.toFixed(1)}, y:${f.y.toFixed(1)}`}</span>
          )}
          <Image
            src={f.type === "feather" ? FeatherImage : CoinImage}
            alt={"object"}
            width={80}
            height={30}
            key={i}
            className={"h-auto "}
            sizes={"width:120px;"}
          />
        </div>
      ))}
    </div>
  )
}
