"use client"

import { useElementSize } from "@mantine/hooks"
import { Player } from "@/app/player"
import { GameStatus } from "@/app/game-status"
import { GameHeader } from "@/app/game-header"
import { useState } from "react"
import { IGame } from "@/game/game-server"
import useInterval from "@/hooks/interval"
import { GameWaiting } from "@/app/game-waiting"
import Image from "next/image"

import FeatherImage from "@/../public/image/feather.png"
import CoinImage from "@/../public/image/coin.png"
import { CLIENT_FPS, GAME_LIFE_MAX, PLAYER_DEFAULT_ID } from "@/config"
import { ProgressLabelLine } from "@/app/progress"
import { gameClient } from "@/game/game-client"

export default function Home() {
  const { ref, width, height } = useElementSize()

  const [game, setGame] = useState<IGame>(gameClient.data)

  useInterval(() => {
    setGame(gameClient.data)
  }, 1000 / CLIENT_FPS)

  // console.log(game)

  const mainPlayer = game.players.find((p) => p.id === PLAYER_DEFAULT_ID)

  return (
    <main
      className={"w-full md:w-[640px] h-screen mx-auto border border-gray-800"}
    >
      <div className={"w-full h-full flex flex-col"} ref={ref}>
        {/*  上部的主界面*/}

        {/*  顶部的花西子笔，（基于笔的高度）固定高度 */}
        <GameHeader />

        {/*    战斗区域*/}
        {game.state === "waiting" && <GameWaiting />}

        {game.state === "playing" && (
          <div className={"w-full grow relative"}>
            <div className={"absolute right-4 top-4 flex gap-2 items-center"}>
              <ProgressLabelLine
                label={"机会"}
                value={game.life}
                valueMax={GAME_LIFE_MAX}
                className={"progress-info"}
              />
            </div>

            {game.objects.map((f, i) => (
              <Image
                src={f.type === "feather" ? FeatherImage : CoinImage}
                alt={"object"}
                width={80}
                height={30}
                key={i}
                className={"h-auto absolute -translate-x-1/2 -translate-y-1/2"}
                sizes={"width:120px;"}
                style={{ top: height * f.y, left: width * f.x }}
              />
            ))}
          </div>
        )}

        {/*   底部的 人/状态栏 */}
        {game.state !== "waiting" && (
          <div className={"absolute bottom-0 flex flex-col w-full"}>
            <Player container={{ width }} />
            {mainPlayer && <GameStatus player={mainPlayer} />}
          </div>
        )}
      </div>
    </main>
  )
}
