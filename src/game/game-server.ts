import { GAME_RAGE_MAX, SERVER_FPS } from "@/config"
import { IPlayer, Player, PlayerAction, PlayerBlowAction } from "@/game/player"
import {
  CoinObject,
  FeatherObject,
  GameObject,
  IObjectBase,
} from "@/game/object"

export type GameState = "waiting" | "playing" | "paused" | "over"

export interface IGame {
  stage: number
  state: GameState
  tick: number
  rage: number
  players: IPlayer[]
  objects: IObjectBase[]
}

export class GameServer implements IGame {
  // configurable
  public addFeatherIntervalSeconds = 5

  // states
  public stage = 1 // 关卡
  public state: GameState = "waiting"
  public tick = 0
  public rage = 0 // 游戏的血条由掉落的羽毛控制
  public players: Player[] = []
  public objects: GameObject[] = []

  // reset states
  private reset() {
    // 玩家、关卡 都不要重置
    this.state = "waiting"
    this.tick = 0
    this.rage = 0
    this.objects = []
  }

  public serialize(): IGame {
    return {
      stage: this.stage,
      state: this.state,
      tick: this.tick,
      rage: this.rage,
      players: this.players.map((p) => p.serialize()),
      objects: this.objects.map((f) => f.serialize()),
    }
  }

  private interval = setInterval(() => {
    if (this.state !== "playing") return
    this.tick += 1

    // n 秒新增一片羽毛
    if (this.tick % (SERVER_FPS * this.addFeatherIntervalSeconds) === 1)
      this.objects.push(new FeatherObject())

    // 更新玩家的体力等
    this.players.forEach((p) => p.nextTick())

    // 更新羽毛与花西币等
    this.objects.forEach((f) => f.nextTick())
    for (let i = this.objects.length - 1; i >= 0; --i) {
      const object = this.objects[i]
      const { x, y } = object

      switch (object.type) {
        case "feather":
          if (y >= 0 && y < 1) break

          this.objects.splice(i, 1)

          // 羽毛撞到笔，用户奖励 +1
          if (y < 0) {
            const player = this.players.find((p) => p.id === object.playerBlew)
            if (player) {
              player.score += 1
            }
            this.objects.push(new CoinObject(x))
          }

          // 羽毛落地，游戏生命值 -1
          else if (y >= 1) {
            this.rage++
          }
          break

        case "coin":
          if (y < 0.8) break
          if (y >= 1) {
            this.objects.splice(i, 1)
            this.rage += 2
            break
          }

          console.log("coin find player", {
            coin: { x, y },
            players: this.players,
          })
          // 寻找附近的玩家
          const adjPlayers = this.players
            .map((p) => ({ p, distance: Math.abs(p.x - x) }))
            .sort((a, b) => a.distance - b.distance)

          if (adjPlayers.length) {
            adjPlayers[0].p.score += 2
            this.objects.splice(i, 1)
          }
          break

        default:
          break
      }
    }

    if (this.rage >= GAME_RAGE_MAX) {
      this.state = "over"
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
    // console.log({ playerId, action })
    const { type, data } = action
    const player = this.players.find((p) => p.id === playerId)
    if (!player) return

    switch (type) {
      case "prepare":
        player.prepared = !player.prepared
        if (this.players.every((p) => p.prepared)) {
          this.start()
        }
        break
      case "move":
        player.x = data.x
        break

      case "clench":
        player.life -= 20 / SERVER_FPS
        break

      case "clench-give-up":
        console.log("clench-give-up: ", data)
        player.life += data.consumption / 2 // 返还一半体力
        break

      case "clench-too-long":
        // todo
        break

      case "blow":
        this.handlePlayerBlow(player, action)
        break

      case "restart":
        this.reset()
        break

      default:
        break
    }
  }

  public start() {
    this.state = "playing"
    this.players.forEach((p) => (p.prepared = false))
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
