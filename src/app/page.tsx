"use client"

import { useElementSize } from "@mantine/hooks"
import { Player } from "@/app/player"
import { GameStatus } from "@/app/game-status"
import { GameHeader } from "@/app/game-header"
import { useRef } from "react"
import { Game } from "@/server/game"

import Player1Image from "@/../public/image/player/1-蓄力.png"
import Image from "next/image"

const game = new Game()

export default function Home() {
  // const [ref, { width }] = useMeasure();
  const { ref, width } = useElementSize()

  return (
    <main
      className={"w-full md:w-[640px] h-screen mx-auto border border-gray-800"}
    >
      <div className={"w-full h-full flex flex-col"} ref={ref}>
        {/*  上部的主界面*/}
        <div className={"w-full grow relative"}>
          {/*  顶部的花西子笔，（基于笔的高度）固定高度 */}
          <GameHeader />

          {/*    战斗区域*/}
          {game.state === "waiting" && (
            <div className="hero min-h-screen bg-base-200">
              <div className="hero-content flex-col sm:flex-row">
                <Image
                  priority
                  width={200}
                  height={300}
                  src={Player1Image}
                  alt={"player"}
                  className="max-w-sm rounded-lg shadow-2xl"
                />
                <div>
                  <h1 className="text-5xl font-bold"></h1>

                  <p className="py-6"></p>
                  <button className="btn btn-primary">立即开始</button>
                </div>
              </div>
            </div>
          )}

          {/*   底部的人 */}
          <Player container={{ width }} />
        </div>

        {/*  底部的状态栏 */}
        <GameStatus />
      </div>
    </main>
  )
}
