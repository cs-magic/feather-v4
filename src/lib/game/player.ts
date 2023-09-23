import { GAME, PLAYER } from "@/config"
import { clamp } from "lodash"

import { GameObj } from "@/lib/game/object/objects"

export type PlayerID = string

export type PlayerActionType =
  // 用户对服务机的正常控制
  | "prepare"

  // 用户运动
  | "idle"
  | "pressDown"
  | "move"
  | "pressUp"

  // joystick with button
  | "clench-start"
  | "clench-end"

  // 用户对服务机的特殊控制，手游一般是没有的，我们可以有
  | "pause"
  | "resume"
  | "restart" // 这个其实可以不写，因为可以让客户机直接重启一下
  | "stop"

export type PlayerStateInGame =
  | "idle"
  | "moving"
  | "clenching" // 握拳
  | "dizzy" // 握拳过长，眩晕

export type PlayerSkillType =
  | "rectangle"
  | "sector" //扇形
  | "semi-circle" //半圆
  | "global" // 死亡吟唱
  | "laser" //激光，数值的

export interface PlayerActionBase<T extends PlayerActionType> {
  type: T
}

export interface PlayerPrepareAction extends PlayerActionBase<"prepare"> {}

export interface PlayerPauseAction extends PlayerActionBase<"pause"> {}

export interface PlayerResumeAction extends PlayerActionBase<"resume"> {}

export interface PlayerStopAction extends PlayerActionBase<"stop"> {}

export interface PlayerRestartAction extends PlayerActionBase<"stop"> {}

export interface PlayerClenchStartAction
  extends PlayerActionBase<"clench-start"> {}

export interface PlayerPressDownAction extends PlayerActionBase<"pressDown"> {
  x: number // 上报按压时的位置
}

export interface PlayerPressUpAction extends PlayerActionBase<"pressUp"> {}

export interface PlayerClenchEndAction extends PlayerActionBase<"clench-end"> {}

export interface PlayerMoveAction extends PlayerActionBase<"move"> {
  x: number // [0: 1]
}

export type PlayerAction =
  | PlayerPrepareAction
  | PlayerPauseAction
  | PlayerResumeAction
  | PlayerStopAction
  | PlayerRestartAction
  | PlayerClenchStartAction
  | PlayerClenchEndAction
  | PlayerPressDownAction
  | PlayerPressUpAction
  | PlayerMoveAction

export interface IPlayer {
  id: PlayerID
  x: number
  life: number
  rage: number
  score: number
  prepared: boolean
}

/**
 * @return [.5 - 1]
 * @param rage
 */
export const getRectangleBlowY = (rage: number) => 0.5 + rage / 200
export const getRectangleBlowXRadius = () => 0.15

export class Player implements IPlayer {
  public id: PlayerID

  // in game
  public state: PlayerStateInGame = "idle"
  public score = 0
  public x = 0.5 // container内的百分比x坐标
  public life = PLAYER.life.max
  public rage = 0
  public skillType: PlayerSkillType = "rectangle"

  public pressing = false
  public pressDownTime = 0
  public pressDownX = 0

  // out of game
  public prepared = false

  constructor(id: PlayerID) {
    this.id = id
  }

  /**
   * 每个时钟，基于玩家状态自然更新体力值与怒气值
   */
  public nextTick() {
    // 这个要在被动的时钟里检测，而不能在onDrag回调里
    if (this.state === "idle" && this.pressing) {
      // idle --> moving
      if (Math.abs(this.x - this.pressDownX) > 0.01) {
        console.log(`player state: idle --> moving`)
        console.log({
          curX: this.x.toFixed(2),
          downX: this.pressDownX.toFixed(2),
        })
        this.state = "moving"
      }
      // idle --> clenching
      else if (Date.now() - this.pressDownTime > 300) {
        console.log("player state: idle --> clenching")
        this.state = "clenching"
      }
    }

    const lifeAddSpeed: Record<PlayerStateInGame, number> = {
      idle: 10, // 躺平，体力恢复最快
      moving: 5, // 摸鱼，体力略微恢复
      clenching: -10, // 奋斗中，体力高速衰退
      dizzy: 0, // 奋斗过头，会收到额外惩罚
    }
    this.life = clamp(
      this.life + lifeAddSpeed[this.state] / GAME.fps.server,
      0,
      PLAYER.life.max
    )

    // 没有体力时不允许集气
    if (this.state === "clenching" && this.life === 0) return

    const rageAddSpeed: Record<PlayerStateInGame, number> = {
      clenching: 50, // 奋斗中，怒气快速上升
      dizzy: -30, // 奋斗过头，快速下头
      moving: -80, // 摸鱼，怒气缓慢增加
      idle: -50, // 躺平，怒气缓慢降低
    }
    this.rage = clamp(
      this.rage + rageAddSpeed[this.state] / GAME.fps.server,
      0,
      PLAYER.rage.max
    )
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

  public blow(objs: GameObj[]) {
    const { x, rage } = this

    switch (this.skillType) {
      case "rectangle":
        objs.forEach((obj) => {
          if (
            obj.type === "feather" &&
            obj.x >= x - getRectangleBlowXRadius() &&
            obj.x <= x + getRectangleBlowXRadius() &&
            obj.y >= 1 - getRectangleBlowY(rage)
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
            obj.ySpeed -= 0.2 + this.rage / 200
            obj.playerBlew = this.id
          }
        })
        break
      default:
        // todo
        break
    }
  }
}
