"use client"

import { useElementSize } from "@mantine/hooks"
import { Player } from "@/app/player"
import { PlayerStatus } from "@/app/player-status"
import { GameHeader } from "@/app/game-header"
import { useState } from "react"
import { IGame } from "@/game/game-server"
import useInterval from "@/hooks/interval"
import { GameOver, GameWaiting } from "@/app/game-waiting"
import Image from "next/image"

import FeatherImage from "@/../public/image/feather.png"
import CoinImage from "@/../public/image/coin.png"
import {
  CLIENT_FPS,
  DEBUG_SHOW_POS,
  GAME_RAGE_MAX,
  PLAYER_DEFAULT_ID,
} from "@/config"
import { ProgressLabelLine } from "@/app/progress"
import { client } from "@/game/game-client"

export default function Home() {
  const { ref, width, height } = useElementSize()

  const [game, setGame] = useState<IGame>(client.data)

  useInterval(() => {
    setGame(client.data)
  }, 1000 / CLIENT_FPS)

  // console.log(game)

  const mainPlayer = game.players.find((p) => p.id === PLAYER_DEFAULT_ID)

  return (
    <main
      className={
        "w-full md:w-[640px] h-screen mx-auto border border-gray-800 flex flex-col"
      }
    >
      <div className={"w-full grow flex flex-col"} ref={ref}>
        {/*  上部的主界面*/}

        {/*  顶部的花西子笔，（基于笔的高度）固定高度 */}
        <GameHeader />

        {/*    战斗区域*/}
        {game.state === "waiting" && <GameWaiting />}
        {game.state === "over" && <GameOver player={mainPlayer!} />}

        {game.state === "playing" && (
          <div className={"w-full grow relative"}>
            <div className={"absolute right-4 top-4 flex gap-2 items-center"}>
              <ProgressLabelLine
                label={"😡 愤怒值"}
                value={game.rage}
                valueMax={GAME_RAGE_MAX}
                className={"progress-error w-16"}
              />
            </div>

            {game.objects.map((f, i) => (
              <div
                key={i}
                className={"absolute -translate-x-1/2 -translate-y-1/2"}
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
        )}
      </div>

      {/*   底部的 人/状态栏 */}
      {game.state !== "waiting" && mainPlayer && (
        <div className={"flex flex-col w-full shrink-0"}>
          <Player container={{ width }} player={mainPlayer} />
          <PlayerStatus player={mainPlayer} />
        </div>
      )}
    </main>
  )
}
