import { GAME_LIFE_MAX, SERVER_FPS } from "@/config"
import { IPlayer, Player, PlayerAction, PlayerBlowAction } from "@/game/player"
import {
  CoinObject,
  FeatherObject,
  GameObject,
  IObjectBase,
} from "@/game/object"
import { util } from "zod"
import objectKeys = util.objectKeys

export type GameState = "waiting" | "playing" | "paused" | "over"

export interface IGame {
  state: GameState
  tick: number
  life: number
  players: IPlayer[]
  objects: IObjectBase[]
}

export class GameServer implements IGame {
  public state: GameState = "waiting"
  public tick = 0
  public life = GAME_LIFE_MAX // 游戏的血条由掉落的羽毛控制

  public addFeatherIntervalSeconds = 5

  public players: Player[] = []
  public objects: GameObject[] = []

  public serialize(): IGame {
    return {
      state: this.state,
      tick: this.tick,
      life: this.life,
      players: this.players.map((p) => p.serialize()),
      objects: this.objects.map((f) => f.serialize()),
    }
  }

  private interval = setInterval(() => {
    if (this.state !== "playing") return
    this.tick += 1

    // 3 秒一片
    if (this.tick % (SERVER_FPS * this.addFeatherIntervalSeconds) === 1) {
      this.objects.push(new FeatherObject())
    }
    this.objects.forEach((f) => f.nextTick())

    // 逆序遍历 以 mute array
    for (let i = this.objects.length - 1; i >= 0; --i) {
      const object = this.objects[i]
      if (object.y >= 0 && object.y < 1) continue

      this.objects.splice(i, 1)

      // 羽毛撞到笔，用户奖励 +1
      if (object.type === "feather" && object.y < 0) {
        const player = this.players.find((p) => p.id === object.playerBlew)
        if (player) {
          player.score += 1
        }
        this.objects.push(new CoinObject(object.x))
      }

      // 羽毛落地，游戏生命值 -1
      else if (object.y >= 1) {
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
    const { x } = player
    const { f, type } = action.data
    console.log("handlePlayerBlow: ", { x, f, type, feathers: this.objects })
    switch (type) {
      case "rectangle":
        this.objects.forEach((o) => {
          if (
            o.type === "feather" &&
            o.x >= x - 0.1 &&
            o.x <= x + 0.1 &&
            o.y >= 1 - (0.2 + f / 200)
          )
            o.blew(player.id, action)
        })
        break
      default:
        // todo
        break
    }
  }

  public onPlayerAction(playerId: string, action: PlayerAction) {
    console.log({ playerId, action })
    const player = this.players.find((p) => p.id === playerId)
    if (!player) return

    switch (action.type) {
      case "prepare":
        player.prepared = !player.prepared
        if (this.players.every((p) => p.prepared)) {
          this.start()
        }
        break
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
