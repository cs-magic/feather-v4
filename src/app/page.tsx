"use client";

import { PLAYER_LIFE_MAX, PLAYER_RAGE_MAX } from "@/config";
import { useElementSize } from "@mantine/hooks";
import { usePlayerStore } from "@/store/player.slice";
import { Player } from "@/app/player";

export default function Home() {
  // const [ref, { width }] = useMeasure();
  const { ref, width } = useElementSize();
  const { life, rage } = usePlayerStore();

  return (
    <main
      className={"w-full md:w-[640px] h-screen mx-auto border border-gray-800"}
    >
      <div className={"w-full h-full flex flex-col"} ref={ref}>
        {/*  上部的主界面*/}
        <div className={"w-full grow relative"}>
          {/*  顶部的花西子笔，（基于笔的高度）固定高度 */}
          <div
            className="bg-repeat-x bg-center w-full h-16"
            style={{
              backgroundImage: "url(/image/pen2.png)",
            }}
          />

          {/*    战斗区域*/}

          {/*   底部的人 */}
          <Player container={{ width }} />
        </div>

        {/*  底部的状态栏 */}
        <div className={"shrink-0 p-2 bg-base-100"}>
          <div className={"flex flex-col gap-2"}>
            <progress
              className="progress progress-accent w-56"
              value={life}
              max={PLAYER_LIFE_MAX}
            ></progress>

            <progress
              className="progress progress-error w-16"
              value={rage}
              max={PLAYER_RAGE_MAX}
            ></progress>
          </div>
        </div>
      </div>
    </main>
  );
}
