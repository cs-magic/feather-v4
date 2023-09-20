import { IGame } from "@/game/game-server"
import { useElementSize } from "@mantine/hooks"
import { LabelLine, ProgressLabelLine } from "@/app/progress"
import { DEBUG_SHOW_POS, GAME_LIFE_MAX } from "@/config"
import Image from "next/image"
import FeatherImage from "../../public/image/feather.png"
import DarkFeatherImage from "../../public/image/feather-dark.png"
import CoinImage from "../../public/image/coin.png"
import React from "react"
import { getMainPlayer } from "@/lib/player"

export const GameMain = ({ game }: { game: IGame }) => {
  const { ref, width, height } = useElementSize()
  const mainPlayer = getMainPlayer(game)

  return (
    <div
      className={"w-full grow relative border-b border-gray-700 -mb-16"}
      ref={ref}
    >
      <div className={"absolute right-4 top-4 flex flex-col gap-2 "}>
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
