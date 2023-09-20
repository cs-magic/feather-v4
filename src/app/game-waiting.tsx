import { Game } from "@/server/game"
import Image from "next/image"
import Player1Image from "../../public/image/player/1-蓄力.png"
import Desc from "@/docs/desc.mdx"

export const GameWaiting = ({ game }: { game: Game }) => {
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
              game.start()
            }}
          >
            立即开始
          </button>
        </div>
      </div>
    </div>
  )
}
