"use client"

import { useElementSize } from "@mantine/hooks"
import { Player } from "@/app/player"
import { PlayerStatus } from "@/app/player-status"
import { GameHeader } from "@/app/game-header"
import { useEffect, useState } from "react"
import { IGame } from "@/game/game-server"
import useInterval from "@/hooks/interval"
import { GameOver, GameWaiting } from "@/app/game-waiting"
import { CLIENT_FPS, PLAYER_DEFAULT_ID } from "@/config"
import { client } from "@/game/game-client"
import { GameMain } from "@/app/game-main"

export default function Home() {
  const [game, setGame] = useState<IGame>(client.data)
  const { ref, width } = useElementSize()

  useInterval(() => {
    setGame(client.data)
  }, 1000 / CLIENT_FPS)

  /**
   * set height for mobile browser (safari, chrome ...) to be full of inner height (but invalid !)
   */
  useEffect(() => {
    const setInnerHeight = () => {
      document.documentElement.style.setProperty(
        "--app-height",
        `${window.innerHeight}px`
      )
    }
    window.addEventListener("resize", setInnerHeight)

    setInnerHeight()
    return () => {
      window.removeEventListener("resize", setInnerHeight)
    }
  }, [])

  // console.log(game)

  const mainPlayer = game.players.find((p) => p.id === PLAYER_DEFAULT_ID)

  return (
    <main
      className={
        "w-full md:w-[640px] h-screen mx-auto border border-gray-800 flex flex-col"
      }
      ref={ref}
    >
      <div className={"w-full grow flex flex-col"}>
        {/*  上部的主界面*/}

        {/*  顶部的花西子笔，（基于笔的高度）固定高度 */}
        <GameHeader />

        {/*    战斗区域*/}
        {game.state === "waiting" && <GameWaiting />}
        {game.state === "over" && <GameOver player={mainPlayer!} />}

        {game.state === "playing" && <GameMain game={game} />}
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
