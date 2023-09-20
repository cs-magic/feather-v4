import { GAME_LIFE_MAX, SERVER_FPS } from "@/config"
import {
  IPlayer,
  Player,
  PlayerAction,
  PlayerBlowAction,
} from "@/server/player"
import { Feather, IObject } from "@/server/object"

export type GameState = "waiting" | "playing" | "paused" | "over"

export interface IGame {
  state: GameState
  tick: number
  life: number
  players: IPlayer[]
  feathers: IObject[]
}

export class Game implements IGame {
  public state: GameState = "waiting"
  public tick = 0
  public life = GAME_LIFE_MAX // 游戏的血条由掉落的羽毛控制

  public players: Player[] = []
  public feathers: Feather[] = []

  public serialize(): IGame {
    return {
      state: this.state,
      tick: this.tick,
      life: this.life,
      players: this.players.map((p) => p.serialize()),
      feathers: this.feathers.map((f) => f.serialize()),
    }
  }

  private interval = setInterval(() => {
    if (this.state !== "playing") return
    this.tick += 1

    // 3 秒一片
    if (this.tick % (SERVER_FPS * 3) === 1) {
      this.feathers.push(new Feather())
    }
    this.feathers.forEach((f) => f.nextTick())

    // 逆序遍历 以 mute array
    for (let i = this.feathers.length - 1; i >= 0; --i) {
      const feather = this.feathers[i]
      if (feather.y >= 0 && feather.y < 1) continue

      this.feathers.splice(i, 1)

      // 羽毛撞到笔，用户奖励 +1
      if (feather.y < 0) {
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
  }, 1000 / SERVER_FPS)

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
