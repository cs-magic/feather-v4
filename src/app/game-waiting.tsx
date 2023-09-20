import Image from "next/image"
import Player1Image from "../../public/image/player/0.png"
import Desc from "@/docs/desc.mdx"
import { gameClient } from "@/game/game-client"

export const GameWaiting = () => {
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

          <p className="py-6"></p>
          <button
            className="btn btn-primary"
            onClick={() => {
              gameClient.do({ type: "prepare" })
            }}
          >
            立即开始
          </button>
        </div>
      </div>
    </div>
  )
}
