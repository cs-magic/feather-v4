"use client"

import { useElementSize } from "@mantine/hooks"
import { PlayerStatus } from "@/app/components/player-status"
import { GameHeader } from "@/app/components/game-header"
import React, { useEffect, useState } from "react"
import { IGame } from "@/lib/game/game-server"
import useInterval from "@/hooks/use-interval"
import { GameWaiting } from "@/app/components/game-waiting"
import { CLIENT_FPS } from "@/config"
import { client } from "@/lib/game/game-client"
import { GameMain } from "@/app/components/game-main"
import { Player } from "@/app/components/player"
import { GameOver } from "@/app/components/game-over"
import { getMainPlayer } from "@/lib/game/player"
import { useAudio } from "@/hooks/use-audio"

export default function Home() {
  const [game, setGame] = useState<IGame>(client.data)
  const { state } = game
  const { ref, width } = useElementSize()
  const { setTriggered } = useAudio({ game })

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

  const mainPlayer = getMainPlayer(game)

  return (
    <main
      className={
        "w-full md:w-[640px] mx-auto border border-gray-800 flex flex-col "
      }
      ref={ref}
    >
      <div className={"w-full grow flex flex-col"}>
        {/*  上部的主界面*/}

        {/*  顶部的花西子笔，（基于笔的高度）固定高度 */}
        <GameHeader />

        {/*    战斗区域*/}
        {game.state === "waiting" && (
          <GameWaiting
            onClick={() => {
              setTriggered(true)
              client.do({ type: "prepare" })
            }}
          />
        )}

        {game.state === "over" && <GameOver player={mainPlayer!} />}

        {["playing", "paused"].includes(game.state) && <GameMain game={game} />}
      </div>

      {/*   底部的 人/状态栏 */}
      {game.state !== "waiting" && mainPlayer && (
        <div
          className={"select-none touch-none"}
          onTouchEnd={(event) => event.preventDefault()}
        >
          <div className={"relative h-36"} id={"players"}>
            <Player container={{ width }} player={mainPlayer} />
          </div>
        </div>
      )}
    </main>
  )
}
