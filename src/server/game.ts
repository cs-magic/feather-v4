import { GAME_LIFE_MAX, PLAYER_LIFE_MAX } from "@/config"
import { nextTick, serialize } from "@/lib/helpers"
import { act } from "react-dom/test-utils"

export interface PlayerActionBase {
  type:
    | "move"
    | "clench" // 握拳
    | "blow" // 吹
  data: any
}

export interface PlayerMoveAction extends PlayerActionBase {
  type: "move"
  data: {
    x: number // [0: 1]
  }
}

export interface PlayerBlowAction extends PlayerActionBase {
  type: "blow"
  data: {
    f: number // [0: 100]
    type:
      | "rectangle"
      | "sector" //扇形
      | "semi-circle" //半圆
      | "global" // 死亡吟唱
      | "laser" //激光，数值的
  }
}

export interface PlayerClenchAction extends PlayerActionBase {
  type: "clench"
  data: {
    // todo
  }
}

export type PlayerAction =
  | PlayerMoveAction
  | PlayerBlowAction
  | PlayerClenchAction

interface IPlayer {
  id: string
  x: number
  life: number
  rage: number
  score: number
  prepared: boolean
}

export class Player implements IPlayer {
  public id: string

  public x = 0.5 // container内的百分比x坐标
  public life = PLAYER_LIFE_MAX
  public rage = 0

  public prepared = false
  public score = 0

  constructor(id: string) {
    this.id = id
  }

  public serialize(): IPlayer {
    return {
      id: this.id,
      prepared: this.prepared,
      score: this.score,
      rage: this.rage,
      life: this.life,
      x: this.x,
    }
  }
}

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
  public readonly defaultYSpeed = 0.1
  public ySpeed = 0.1

  /**
   * 下一个周期内，掉落 +.1
   */
  public nextTick() {
    // 碰到边缘就改方向
    if (this.x <= this.xMin || this.x >= this.xMax) this.xSpeed = -this.xSpeed
    this.x += this.xSpeed

    // 回复速度
    if (this.ySpeed < this.defaultYSpeed) this.ySpeed += 0.1
    this.y += this.ySpeed
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
    this.xSpeed = (Math.random() - 0.5) / 10
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

export const ServerTickInterval = 20

export class Game {
  public state: "waiting" | "playing" | "paused" | "over" = "waiting"
  public tick = 0
  public life = GAME_LIFE_MAX // 游戏的血条由掉落的羽毛控制

  public players: Player[] = []
  public feathers: Feather[] = []

  public sync() {
    return {
      state: this.state,
      players: this.players.map(serialize.bind),
      feathers: this.feathers.map(serialize.bind),
    }
  }

  private interval = setInterval(() => {
    if (this.state !== "playing") return
    this.tick += 1

    // 3 秒一片
    if (this.tick % ((1000 / ServerTickInterval) * 3) === 1) {
      this.feathers.push(new Feather())
    }
    this.feathers.forEach(nextTick.bind)

    // 逆序遍历 以 mute array
    for (let i = this.feathers.length - 1; i >= 0; --i) {
      const feather = this.feathers[i]
      if (feather.y > 0 && feather.y < 1) continue

      this.feathers.splice(i, 1)

      // 羽毛撞到笔，用户奖励 +1
      if (feather.y <= 0) {
        const player = this.players.find((p) => p.id === feather.playerBlew)
        if (player) {
          player.score += 1
        }
      }

      // 羽毛落地，游戏生命值 -1
      else if (feather.y >= 1) {
        this.life -= 1
        if (this.life <= 0) {
          this.state = "over"
        }
      }
    }
  }, ServerTickInterval)

  public addPlayer(player: Player) {
    this.players.push(player)
  }

  public delPlayer(playerId: string) {
    delete this.players[this.players.findIndex((p) => p.id === playerId)]
  }

  public handlePlayerBlow(player: Player, action: PlayerBlowAction) {
    const { f } = action.data
    switch (action.data.type) {
      case "rectangle":
        this.feathers
          .filter(
            (feather) =>
              feather.x >= player.x - 0.1 &&
              feather.x <= player.x + 0.1 &&
              feather.y >= 1 - (0.5 + f)
          )
          .forEach((feather) => {
            feather.blew(player.id, action)
          })
    }
  }

  public onPlayerAction(playerId: string, action: PlayerAction) {
    const player = this.players.find((p) => p.id === playerId)
    if (!player) return

    switch (action.type) {
      case "move":
        player.x = action.data.x
        break

      case "blow":
        this.handlePlayerBlow(player, action)
        break

      case "clench":
        // todo
        break

      default:
        break
    }
  }

  public start() {
    this.state = "playing"
  }

  public pause() {
    this.state = "paused"
  }

  public resume() {
    this.state = "playing"
  }

  public stop() {
    this.state = "over"
  }
}
