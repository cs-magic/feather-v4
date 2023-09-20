import Image from "next/image"
import Player1Image from "../../../public/image/player/0.png"
import Desc from "@/docs/desc.mdx"
import { client } from "@/lib/game/game-client"
import { IGame } from "@/lib/game/game-server"
import { OpenSource } from "@/app/components/open-source"
import { Ranks } from "@/app/components/ranks"

export const GameWaiting = ({ game: { state } }: { game: IGame }) => {
  return (
    <div className="hero">
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

          <Ranks />

          <p className="py-6"></p>

          <button
            className="btn btn-primary"
            onClick={() => {
              client.do({ type: "prepare" })
            }}
          >
            立即开始
          </button>

          <OpenSource />
        </div>
      </div>
    </div>
  )
}
