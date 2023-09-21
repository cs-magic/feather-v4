export const Coin1 = () => {
  return (
    <div className="coin">
      <div className="coin__front"></div>

      <div className="coin__back"></div>

      <div className="coin__edge">
        {Array(100)
          .fill(1)
          .map((item, key) => (
            <div key={key} />
          ))}
      </div>

      {/* 阴影 */}

      <div className="coin__shadow"></div>
    </div>
  )
}

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

export const Coin3 = () => (
  <div className="container">
    <div className="bitcoin"></div>
  </div>
)
