import { GAME } from "@/config"

export type GameObjectType = "feather" | "coin"

export type ObjID = number

export interface IObjBase<T extends GameObjectType> {
  id: ObjID

  x: number
  xMin: number
  xMax: number
  xSpeed: number

  y: number
  ySpeed: number

  type: T
}

export class GameObjectBase<T extends GameObjectType> implements IObjBase<T> {
  public id: ObjID

  public type: T
  public x: number
  public xMin: number
  public xMax: number
  public xSpeed = 0

  public y: number = 0
  public readonly defaultYSpeed // .06 恰好
  public ySpeed

  public constructor(
    type: T,
    id: ObjID,
    x: number,
    xMin: number,
    xMax: number,
    defaultYSpeed: number = 0.06
  ) {
    this.id = id
    this.type = type
    this.x = x
    this.xMin = xMin
    this.xMax = xMax
    this.defaultYSpeed = defaultYSpeed
    this.ySpeed = this.defaultYSpeed
  }

  /**
   * 下一个周期内，掉落 +.1
   */
  public nextTick() {
    // 碰到边缘就改方向
    if (this.x <= this.xMin || this.x >= this.xMax) this.xSpeed = -this.xSpeed
    this.x += this.xSpeed / GAME.fps.server

    // 回复速度
    if (this.ySpeed < this.defaultYSpeed)
      this.ySpeed = Math.min(
        this.defaultYSpeed,
        this.ySpeed + 0.3 / GAME.fps.server
      )
    this.y += this.ySpeed / GAME.fps.server
  }

  public serialize(): IObjBase<T> {
    return {
      id: this.id,
      type: this.type,
      xMax: this.xMax,
      xMin: this.xMin,
      xSpeed: this.xSpeed,
      ySpeed: this.ySpeed,
      y: this.y,
      x: this.x,
    }
  }
}
