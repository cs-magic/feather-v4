import Image from "next/image"
import Player1Image from "../../public/image/player/0.png"
import Desc from "@/docs/desc.mdx"
import { client } from "@/game/game-client"
import ReactMarkdown from "react-markdown"
import { IPlayer } from "@/game/player"

export const CheckRanking = () => (
  <button className="btn m-4" disabled>
    查看排行榜
  </button>
)

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
              client.do({ type: "prepare" })
            }}
          >
            立即开始
          </button>

          <CheckRanking />
        </div>
      </div>
    </div>
  )
}

export const GameOver = ({ player }: { player: IPlayer }) => {
  return (
    <div className="hero h-full">
      <div className="hero-content flex-col sm:flex-row">
        <div>
          <h2 className="py-6 text-2xl">你完蛋啦！</h2>

          <article className={"prose dark:prose-invert"}>
            <ReactMarkdown>
              {`
- 玩家 **${player.id}**
- 本次得分：**${player.score}**

再接再厉哦！
            `}
            </ReactMarkdown>
          </article>

          <button
            className="btn btn-primary m-4"
            onClick={() => {
              client.do({ type: "restart" })
            }}
          >
            重新开始
          </button>

          <CheckRanking />
        </div>
      </div>
    </div>
  )
}
