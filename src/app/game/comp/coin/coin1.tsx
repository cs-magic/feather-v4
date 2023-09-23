import "@/style/coin1.css"

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
