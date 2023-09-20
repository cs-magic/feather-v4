import { IPlayer } from "@/game/player"
import ReactMarkdown from "react-markdown"
import { client } from "@/game/game-client"
import { CheckRanking, Ranks } from "@/app/game-waiting"
import { trpc } from "@/lib/trpc"
import { useRef } from "react"

export const GameOver = ({ player }: { player: IPlayer }) => {
  const utils = trpc.useContext()
  const createUser = trpc.createAndGetUser.useMutation()
  const pushGameRecord = trpc.pushGameRecord.useMutation({
    onSuccess: () => {
      utils.listGameRecords.invalidate()
    },
  })

  return (
    <div className="hero h-full">
      <div className="hero-content flex-col sm:flex-row">
        <form
          className={"flex flex-col gap-2"}
          onSubmit={async (event) => {
            event.preventDefault()
            const username = event.currentTarget.username.value
            if (!username) return

            const user = await createUser.mutateAsync({ name: username })
            const record = await pushGameRecord.mutateAsync({
              user: {
                connect: {
                  id: user.id,
                },
              },
              score: player.score,
            })
          }}
        >
          <h2 className="py-6 text-2xl">你完蛋啦！</h2>

          <div>
            本次得分： <b>{player.score}</b>
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">你的名字</span>
            </label>
            <input
              name={"username"}
              type="text"
              placeholder="ljq"
              className="input input-bordered w-full max-w-xs"
            />
          </div>

          <div>再接再厉哦！</div>

          <div className={"flex justify-around flex-wrap"}>
            <button className="btn btn-primary m-4" type={"submit"}>
              提交排名
            </button>

            <button
              className="btn btn-primary m-4"
              onClick={() => {
                client.do({ type: "restart" })
              }}
            >
              重新开始
            </button>
          </div>

          <Ranks />
        </form>
      </div>
    </div>
  )
}
