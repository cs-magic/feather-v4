import { PLAYER_LIFE_MAX, SERVER_FPS } from "@/config"

export interface PlayerActionBase {
  type:
    | "prepare"
    | "move"
    | "clench" // 握拳
    | "clench-give-up"
    | "clench-too-long"
    | "blow" // 吹
  data?: any
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
}

export interface PlayerPrepareAction extends PlayerActionBase {
  type: "prepare"
}

export interface PlayerClenchGiveUpAction extends PlayerActionBase {
  type: "clench-give-up"
  data: {
    consumption: number // life
  }
}

export interface PlayerClenchTooLongAction extends PlayerActionBase {
  type: "clench-too-long"
}

export type PlayerAction =
  | PlayerPrepareAction
  | PlayerMoveAction
  | PlayerBlowAction
  | PlayerClenchAction
  | PlayerClenchGiveUpAction
  | PlayerClenchTooLongAction

export interface IPlayer {
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

  public nextTick() {
    this.life = Math.min(this.life + 3 / SERVER_FPS, PLAYER_LIFE_MAX)
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
