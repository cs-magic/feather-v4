import Desc from "@/docs/desc.mdx"
import { GameRanks } from "@/app/game/comp/ranks"
import { client } from "@/lib/game/client"
import React from "react"
import Link from "next/link"
import { siteConfig } from "@/config"
import { Assets } from "@/assets"
import Image from "next/image"
import { useGameStore } from "@/store"

export const GameWaiting = () => (
  <div className={"h-full flex flex-col gap-8 p-8"}>
    <div className={"flex items-center justify-between flex-wrap gap-8"}>
      <Image
        priority
        width={240}
        height={240}
        src={Assets.logo.src}
        alt={"player"}
        className="shadow-2xl shrink-0"
      />

      <article className={"grow prose dark:prose-invert"}>
        <Desc />
      </article>
    </div>

    <GameRanks />

    <div className={"w-full flex items-center "}>
      <StartButton />
      <OpensourceButton />
    </div>

    <div className={"w-full"}>
      <CompanyButton />
    </div>
  </div>
)

const StartButton = () => {
  const { setState } = useGameStore()
  return (
    <button
      className="btn btn-primary"
      onClick={() => {
        setState("playing")
      }}
    >
      立即开始
    </button>
  )
}

const OpensourceButton = () => (
  <Link href={siteConfig.links.github} target={"_blank"}>
    <button className="btn btn-neutral m-4">开源贡献</button>
  </Link>
)

const CompanyButton = () => (
  <Link href={siteConfig.links.company} target={"_blank"}>
    <button className="btn btn-link m-4">关于我们</button>
  </Link>
)
