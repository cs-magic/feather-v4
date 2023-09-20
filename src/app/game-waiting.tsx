import Image from "next/image"
import Player1Image from "../../public/image/player/0.png"
import Desc from "@/docs/desc.mdx"
import { client } from "@/game/game-client"
import Link from "next/link"
import { siteConfig } from "@/config"
import { trpc } from "@/lib/trpc"

export const CheckRanking = () => (
  <button className="btn m-4" disabled>
    查看排行榜
  </button>
)

export const OpenSource = () => (
  <Link href={siteConfig.links.github} target={"_blank"}>
    <button className="btn m-4">开源贡献</button>
  </Link>
)

export const Ranks = () => {
  const { data: ranks } = trpc.listGameRecords.useQuery({})
  if (!ranks) return "loading"

  return (
    <div className={"py-4 flex flex-col gap-2"}>
      <h2 className={"text-2xl"}>排行榜</h2>

      {!ranks.length ? (
        "暂无数据"
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th>排名</th>
                <th>用户名称</th>
                <th>分数</th>
                <th>时间</th>
              </tr>
            </thead>
            <tbody>
              {ranks.map(({ id, score, user }, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{score}</td>
                  <td>
                    {new Date(parseInt(id.slice(1, 9), 36)).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

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
