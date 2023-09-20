import { PLAYER_LIFE_MAX, PLAYER_RAGE_MAX, SERVER_FPS } from "@/config"
import { PlayerStatus } from "@/app/components/player-status"

export type PlayerState =
  | "idle"
  | "restart"
  | "pause"
  | "resume"
  | "stop"
  | "prepare"
  | "move"
  | "clench" // 握拳
  | "clench-give-up"
  | "clench-too-long"
  | "blow" // 吹

export interface PlayerActionBase {
  type: PlayerState
  data?: any
}

export interface PlayerPrepareAction extends PlayerActionBase {
  type: "prepare"
}

export interface PlayerRestartAction extends PlayerActionBase {
  type: "restart"
}

export interface PlayerPauseAction extends PlayerActionBase {
  type: "pause"
}

export interface PlayerResumeAction extends PlayerActionBase {
  type: "resume"
}

export interface PlayerStopAction extends PlayerActionBase {
  type: "stop"
}

export interface PlayerIdleAction extends PlayerActionBase {
  type: "idle"
}

export interface PlayerMoveAction extends PlayerActionBase {
  type: "move"
  data: {
    x: number // [0: 1]
  }
}

export interface PlayerClenchAction extends PlayerActionBase {
  type: "clench"
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

export interface PlayerBlowAction extends PlayerActionBase {
  type: "blow"
  data: {
    type:
      | "rectangle"
      | "sector" //扇形
      | "semi-circle" //半圆
      | "global" // 死亡吟唱
      | "laser" //激光，数值的
  }
}

export type PlayerAction =
  | PlayerPrepareAction
  | PlayerRestartAction
  | PlayerPauseAction
  | PlayerResumeAction
  | PlayerStopAction
  | PlayerIdleAction
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

  public state: PlayerState = "idle"
  public x = 0.5 // container内的百分比x坐标
  public life = PLAYER_LIFE_MAX
  public rage = 0

  public prepared = false
  public score = 0

  constructor(id: string) {
    this.id = id
  }

  public reset() {
    this.state = "idle"
    this.x = 0.5
    this.life = PLAYER_LIFE_MAX
    this.rage = 0
    this.prepared = false
    this.score = 0
  }

  public nextTick() {
    const state2lifeAddMap: Partial<Record<PlayerState, number>> = {
      idle: 5,
      move: 3,
      clench: -10,
      "clench-give-up": 0,
      "clench-too-long": 0,
    }
    this.life += (state2lifeAddMap[this.state] ?? 0) / SERVER_FPS
    this.life = Math.max(Math.min(this.life, PLAYER_LIFE_MAX), 0)

    this.rage += this.state === "clench" ? 1 : -1
    this.rage = Math.max(Math.min(this.rage, PLAYER_RAGE_MAX), 0)
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
