import { Player, PlayerBlowAction } from "@/lib/game/player"
import { GameObject } from "@/lib/game/object"

export const getRectangleBlowY = (rage: number) => 0.2 + rage / 400

export const getRectangleBlowXRadius = () => 0.15

export const blow = (
  player: Player,
  action: PlayerBlowAction,
  objects: GameObject[]
) => {
  const { x, rage } = player
  const { type } = action.data

  switch (type) {
    case "rectangle":
      objects.forEach((object) => {
        if (
          object.type === "feather" &&
          object.x >= x - getRectangleBlowXRadius() &&
          object.x <= x + getRectangleBlowXRadius() &&
          object.y >= 1 - getRectangleBlowY(rage)
        ) {
          /**
           * 被吹之后，会获得一个向上的加速度，立马上升，然后再缓慢下降
           * 数学模型就是，给定一个反向速度（比如 -.4），然后慢慢回升到 .1的初始速度，最后固定
           * 等于是给了一个加速度，然后重力场的g=0
           *
           * 比如 默认是 .1，则在 1 tick 内最小需要 .11 的力才能吹回顶部
           * 如果考虑连续 tick，则 .4 + .3 + .2 + .1 就可以吹回，也就是最少需要 .5 的力
           * 这是可行的，因为我们的力的区间就在 (0 - 100 ) / 100
           */
          object.ySpeed -= 0.2 + player.rage / 200
          object.playerBlew = player.id
        }
      })
      break
    default:
      // todo
      break
  }
}
