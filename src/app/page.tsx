"use client";

import { useState } from "react";
import { LIFE_MAX, RAGE_MAX } from "@/config";
import Image from "next/image";

export default function Home() {
  const [playerX, setPlayerX] = useState(0);
  const [playerLife, setPlayerLife] = useState(LIFE_MAX);
  const [playerRage, setPlayerRage] = useState(0);

  return (
    <main
      className={"w-full md:w-[640px] h-screen mx-auto border border-gray-800"}
    >
      <div className={"w-full h-full flex flex-col"}>
        {/*  上部的主界面*/}
        <div className={"grow relative"}>
          {/*  顶部的花西子笔，（基于笔的高度）固定高度 */}
          <div
            className="bg-repeat-x bg-center w-full h-16"
            style={{
              backgroundImage: "url(/image/pen2.png)",
              backgroundSize: "width:16px; height:64px;",
            }}
          />

          {/*    战斗区域*/}

          {/*   底部的人 */}
          <Image
            style={{ left: playerX }}
            className={"absolute bottom-0"}
            src={"/image/player/1-蓄力.png"}
            alt={"player"}
            width={120}
            height={360}
          />
        </div>

        {/*  底部的状态栏 */}
        <div className={"shrink-0 p-2 bg-base-100"}>
          <div className={"flex flex-col gap-2"}>
            <progress
              className="progress progress-accent w-56"
              value={playerLife}
              max={LIFE_MAX}
            ></progress>

            <progress
              className="progress progress-error w-16"
              value={playerRage}
              max={RAGE_MAX}
            ></progress>
          </div>
        </div>
      </div>
    </main>
  );
}
