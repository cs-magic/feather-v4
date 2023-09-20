"use client"

import { useElementSize } from "@mantine/hooks"
import { Player } from "@/app/player"
import { GameStatus } from "@/app/game-status"
import { GameHeader } from "@/app/game-header"
import { useRef, useState } from "react"
import { Game, IGame } from "@/server/game"
import useInterval from "@/hooks/interval"
import { GameWaiting } from "@/app/game-waiting"
import Image from "next/image"

import FeatherImage from "@/../public/image/feather.png"

export default function Home() {
  const { ref, width, height } = useElementSize()
  const gameRef = useRef(new Game())

  const [game, setGame] = useState<IGame>(gameRef.current.serialize())

  useInterval(() => {
    setGame(gameRef.current.serialize())
  }, 20)

  console.log(game)

  return (
    <main
      className={"w-full md:w-[640px] h-screen mx-auto border border-gray-800"}
    >
      <div className={"w-full h-full flex flex-col"} ref={ref}>
        {/*  上部的主界面*/}

        {/*  顶部的花西子笔，（基于笔的高度）固定高度 */}
        <GameHeader />

        {/*    战斗区域*/}
        {game.state === "waiting" && <GameWaiting game={gameRef.current} />}

        <div className={"w-full grow relative"}>
          {game.state === "playing" && (
            <>
              {game.feathers.map((f, i) => (
                <Image
                  src={FeatherImage}
                  alt={"feather"}
                  width={80}
                  height={30}
                  key={i}
                  className={"h-auto absolute"}
                  sizes={"width:120px;"}
                  style={{ top: height * f.y, left: width * f.x }}
                />
              ))}
            </>
          )}
        </div>

        {/*   底部的 人/状态栏 */}
        {game.state !== "waiting" && (
          <div className={"absolute bottom-0 flex flex-col w-full"}>
            <Player container={{ width }} />
            <GameStatus />
          </div>
        )}
      </div>
    </main>
  )
}
