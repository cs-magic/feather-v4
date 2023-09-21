import clsx from "clsx"
import Desc from "@/docs/desc.mdx"
import { GameRanks } from "@/app/game/comp/ranks"
import { client } from "@/lib/game/game-client"
import React from "react"
import Link from "next/link"
import { siteConfig } from "@/config"

export const GameWaiting = () => (
  <div className={clsx("hero")}>
    <div className="hero-content flex-col sm:flex-row">
      {/* todo: 替换成更有感觉的图片 */}
      {/*<Image*/}
      {/*  priority*/}
      {/*  width={200}*/}
      {/*  src={Player1Image}*/}
      {/*  alt={"player"}*/}
      {/*  className="shadow-2xl "*/}
      {/*/>*/}
      <div>
        <article className={"prose dark:prose-invert"}>
          <Desc />
        </article>

        <GameRanks />

        <p className="py-6"></p>

        <button
          className="btn btn-primary"
          onClick={() => {
            client.do({ type: "prepare" })
          }}
        >
          立即开始
        </button>

        <Link href={siteConfig.links.github} target={"_blank"}>
          <button className="btn m-4">开源贡献</button>
        </Link>
      </div>
    </div>
  </div>
)
