import { PlayerBlowAction } from "@/server/player"
import { SERVER_FPS } from "@/config"

export interface IObject {
  x: number
  xMin: number
  xMax: number
  xSpeed: number

  y: number
  ySpeed: number
}

export class Object implements IObject {
  public x: number
  public xMin: number
  public xMax: number
  public xSpeed = 0

  public y: number = 0
  public readonly defaultYSpeed = 0.06
  public ySpeed = this.defaultYSpeed

  /**
   * 下一个周期内，掉落 +.1
   */
  public nextTick() {
    // 碰到边缘就改方向
    if (this.x <= this.xMin || this.x >= this.xMax) this.xSpeed = -this.xSpeed
    this.x += this.xSpeed / SERVER_FPS

    // 回复速度
    if (this.ySpeed < this.defaultYSpeed)
      this.ySpeed = Math.min(this.defaultYSpeed, this.ySpeed + 0.1)
    this.y += this.ySpeed / SERVER_FPS
  }

  public constructor(x: number, xMin: number, xMax: number) {
    this.x = x
    this.xMin = xMin
    this.xMax = xMax
  }

  public serialize(): IObject {
    return {
      xMax: this.xMax,
      xMin: this.xMin,
      xSpeed: this.xSpeed,
      ySpeed: this.ySpeed,
      y: this.y,
      x: this.x,
    }
  }
}

export class Coin extends Object {
  constructor(x: number) {
    super(x, x, x)
  }
}

export class Feather extends Object {
  // 羽毛可以在一定横向距离内来回飘动

  public xSpeed: number = 0
  public playerBlew: string | undefined = undefined

  public constructor() {
    const radius = 0.2
    const x = Math.random() * (1 - radius * 2) + radius
    const xMin = x - radius
    const xMax = x + radius
    super(x, xMin, xMax)

    // 方向随机控制
    this.xSpeed = (Math.random() > 1 ? 1 : -1) * 0.1
  }

  /**
   * 被吹之后，会获得一个向上的加速度，立马上升，然后再缓慢下降
   * 数学模型就是，给定一个反向速度（比如 -.4），然后慢慢回升到 .1的初始速度，最后固定
   * 等于是给了一个加速度，然后重力场的g=0
   *
   * 比如 默认是 .1，则在 1 tick 内最小需要 .11 的力才能吹回顶部
   * 如果考虑连续 tick，则 .4 + .3 + .2 + .1 就可以吹回，也就是最少需要 .5 的力
   * 这是可行的，因为我们的力的区间就在 (0 - 100 ) / 100
   */
  public blew(playerId: string, playerAction: PlayerBlowAction) {
    const { f } = playerAction.data
    this.ySpeed -= f / 100
    this.playerBlew = playerId
  }
}
