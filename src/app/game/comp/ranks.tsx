import { trpc } from "@/lib/trpc"
import { useGameStore } from "@/store"
import { Table } from "@radix-ui/themes"

export const GameRanks = () => {
  const { data: ranks } = trpc.listGameRecords.useQuery({})

  const { uiMode } = useGameStore()
  const columns = ["排名", "用户名称", "分数", "时间"]

  return (
    <div className={"w-full py-4 flex flex-col gap-2"}>
      <h2 className={"text-2xl font-bold"}>排行榜</h2>

      {!ranks ? (
        "loading ..."
      ) : !ranks.length ? (
        "暂无数据"
      ) : uiMode === "daisyui" ? (
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                {columns.map((col, index) => (
                  <th key={index}>{col}</th>
                ))}
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
      ) : (
        <Table.Root>
          <Table.Header>
            <Table.Row>
              {columns.map((col, index) => (
                <Table.ColumnHeaderCell key={index}>
                  {col}
                </Table.ColumnHeaderCell>
              ))}
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {ranks!.map(({ id, score, user }, index) => (
              <Table.Row key={index}>
                <Table.RowHeaderCell>{index + 1}</Table.RowHeaderCell>
                <Table.Cell>{user.name}</Table.Cell>
                <Table.Cell>{score}</Table.Cell>
                <Table.Cell>
                  {new Date(parseInt(id.slice(1, 9), 36)).toLocaleString()}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      )}
    </div>
  )
}
