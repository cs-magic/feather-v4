import Image from "next/image"
import Player1Image from "../../../public/image/player/0.png"
import Desc from "@/docs/desc.mdx"
import { OpenSource } from "@/app/components/open-source"
import { GameRanks } from "@/app/components/game-ranks"
import clsx from "clsx"

export const GameWaiting = ({ onClick }: { onClick: any }) => {
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

          <button className="btn btn-primary" onClick={onClick}>
            立即开始
          </button>

          <OpenSource />
        </div>
      </div>
    </div>
  )
}
