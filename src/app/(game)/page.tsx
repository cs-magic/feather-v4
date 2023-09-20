"use client"

import { client } from "@/lib/game/game-client"
import React, { useEffect } from "react"
import clsx from "clsx"
import Image from "next/image"
import Player1Image from "../../../public/image/player/0.png"
import Desc from "@/docs/desc.mdx"
import { GameRanks } from "@/app/components/game-ranks"
import Link from "next/link"
import { OpenSource } from "@/app/components/open-source"

export default function GameHomePage() {
  useEffect(() => {
    client.do({ type: "restart" })
  }, [])

  return (
    <div className={clsx("hero")}>
      <div className="hero-content flex-col sm:flex-row">
        <Image
          priority
          width={200}
          src={Player1Image}
          alt={"player"}
          className="shadow-2xl "
        />
        <div>
          <article className={"prose dark:prose-invert"}>
            <Desc />
          </article>

          <GameRanks />

          <p className="py-6"></p>

          <Link href={"/play"}>
            <button className="btn btn-primary">立即开始</button>
          </Link>

          <OpenSource />
        </div>
      </div>
    </div>
  )
}
