"use client"

import { useElementSize } from "@mantine/hooks"
import { PlayerStatus } from "@/app/components/player-status"
import { GameHeader } from "@/app/components/game-header"
import React, { useEffect, useState } from "react"
import { IGame } from "@/game/game-server"
import useInterval from "@/hooks/interval"
import { GameWaiting } from "@/app/components/game-waiting"
import { CLIENT_FPS } from "@/config"
import { client } from "@/game/game-client"
import { GameMain } from "@/app/components/game-main"
import { getMainPlayer } from "@/lib/player"
import { Player } from "@/app/components/player"
import { GameOver } from "@/app/components/game-over"
import useSound from "use-sound"

export default function Home() {
  const [game, setGame] = useState<IGame>(client.data)
  const { state } = game
  const { ref, width } = useElementSize()

  const [playStart, { sound: soundStart, stop: stopStart, pause: pauseStart }] =
    useSound("/music/game-start.mp3", {
      id: "start",
    })
  const [playOver, { sound: soundOver, stop: stopOver, pause: pauseOver }] =
    useSound("/music/game-over.mp3", {
      id: "over",
    })
  // todo: resume ?
  useEffect(() => {
    console.log({ state })
    if (state === "playing") {
      stopOver()
      playStart()
    } else if (state === "over") {
      stopStart()
      playOver()
    } else if (state === "paused") {
      pauseStart()
    }
  }, [state])

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
  // console.log(game)

  return (
    <main
      className={
        "w-full md:w-[640px] mx-auto border border-gray-800 flex flex-col"
      }
      ref={ref}
    >
      <div className={"w-full grow flex flex-col"}>
        {/*  上部的主界面*/}

        {/*  顶部的花西子笔，（基于笔的高度）固定高度 */}
        <GameHeader />

        {/*    战斗区域*/}
        {game.state === "waiting" && <GameWaiting game={game} />}
        {game.state === "over" && <GameOver player={mainPlayer!} />}

        {game.state === "playing" && <GameMain game={game} />}
      </div>

      {/*   底部的 人/状态栏 */}
      {game.state !== "waiting" && mainPlayer && (
        <div className={""}>
          <div className={"relative h-36"} id={"players"}>
            <Player container={{ width }} player={mainPlayer} />
          </div>

          <PlayerStatus player={mainPlayer} />
        </div>
      )}
    </main>
  )
}
