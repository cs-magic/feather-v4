import Desc from "@/docs/desc.mdx"
import { GameRanks } from "@/app/game/comp/ranks"
import React from "react"
import { siteConfig } from "@/config"
import { Assets } from "@/assets"
import Image from "next/image"
import { useGameStore } from "@/store"
import { Button, Link } from "@radix-ui/themes"
import { GameSettingsContainer } from "@/app/game/comp/settings"
import { LabelLine } from "@/app/utils/label.line"

export const GameWaiting = () => (
  <div className={"h-full flex flex-col gap-8 p-8"}>
    <div className={"flex items-center justify-between gap-8"}>
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

        <StartButton />
      </article>
    </div>

    <GameRanks />

    <div className={"w-full flex items-center gap-4"}>
      <GameSettingsContainer>
        <Link underline={"always"} size={"3"} highContrast>
          ⚙️ 设置
        </Link>
      </GameSettingsContainer>
      <OpensourceButton />
      <CompanyButton />
    </div>
  </div>
)

const StartButton = () => {
  const { setState } = useGameStore()
  return (
    <Button
      onClick={() => {
        setState("playing")
      }}
    >
      立即开始
    </Button>
  )
}
const SettingsButton = () => <></>

const OpensourceButton = () => (
  <Link
    href={siteConfig.links.github}
    target={"_blank"}
    underline={"always"}
    size={"3"}
    highContrast
  >
    开源代码
  </Link>
)

const CompanyButton = () => (
  <Link
    href={siteConfig.links.company}
    target={"_blank"}
    underline={"always"}
    highContrast
    size={"3"}
  >
    关于我们
  </Link>
)
