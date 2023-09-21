import { trpc } from "@/lib/trpc"

export const GameRanks = () => {
  const { data: ranks } = trpc.listGameRecords.useQuery({})
  if (!ranks) return "loading"

  return (
    <div className={"py-4 flex flex-col gap-2"}>
      <h2 className={"text-2xl font-bold"}>排行榜</h2>

      {!ranks.length ? (
        "暂无数据"
      ) : (
        <div className="overflow-x-auto">
          <table className="table">
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
