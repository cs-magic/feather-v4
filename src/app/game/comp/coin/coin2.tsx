import "@/style/coin2.css"

export const Coin2 = ({ front, back }: { front: string; back?: string }) => {
  return (
    <div className="father">
      <div className="positive">
        <img src={front} alt={"coin-front"} />
      </div>
      <div className="negative">
        <img src={back ?? front} alt={"coin-back"} />
      </div>
    </div>
  )
}
