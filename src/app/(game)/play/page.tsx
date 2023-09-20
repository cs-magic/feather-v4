"use client"
import { useElementSize } from "@mantine/hooks"
import { LabelLine, ProgressLabelLine } from "@/app/components/progress"
import { CLIENT_FPS, DEBUG_SHOW_POS, GAME_LIFE_MAX } from "@/config"
import Image from "next/image"
import FeatherImage from "../../../../public/image/feather.png"
import CoinImage from "../../../../public/image/coin.png"
import React, { useState } from "react"
import { PlayerStatus } from "@/app/components/player-status"
import { client } from "@/lib/game/game-client"
import {
  getRectangleBlowXRadius,
  getRectangleBlowY,
} from "@/lib/game/player-blow"
import clsx from "clsx"
import { useRouter } from "next/navigation"
import useInterval from "@/hooks/use-interval"
import { useAudio } from "@/hooks/use-audio"
import { IGame } from "@/lib/game/game-server"

/**
 * 主要在这个函数里，刷新UI
 *
 * @constructor
 */
export default function PlayMainPage() {
  const [game, setGame] = useState<IGame>()
  const { ref, width, height } = useElementSize()

  const router = useRouter()

  useInterval(() => {
    setGame(client.sync())
  }, 1000 / CLIENT_FPS)

  useAudio(game?.state)

  if (!game) return "loading"

  if (game.state === "over") {
    void router.push("/over")
    return null
  }

  return (
    <div
      suppressHydrationWarning
      className={clsx("w-full h-full relative border-b border-gray-700 -mb-16")}
      style={{}}
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

      <PlayerStatus player={client.player} />

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
          className={clsx(
            "absolute -translate-x-1/2 -translate-y-1/2 w-12 select-none",
            "animate-bounce"
          )}
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
