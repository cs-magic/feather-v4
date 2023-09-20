import { GAME_LIFE_MAX, SERVER_FPS } from "@/config"
import {
  IPlayer,
  Player,
  PlayerAction,
  PlayerBlowAction,
} from "@/lib/game/player"
import {
  CoinObject,
  FeatherObject,
  GameObject,
  IObjectBase,
} from "@/lib/game/object"

export type GameState = "waiting" | "playing" | "paused" | "over"

export interface IGame {
  stage: number
  state: GameState
  tick: number
  life: number
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
  public life = GAME_LIFE_MAX // 游戏的血条由掉落的羽毛控制
  public players: Player[] = []
  public objects: GameObject[] = []

  public serialize(): IGame {
    return {
      stage: this.stage,
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
            this.life--
          }
          break

        case "coin":
          if (y < 0.8) break
          if (y >= 1) {
            this.objects.splice(i, 1)
            // this.life -= 2
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

    if (this.life < 0) {
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
    const { x, rage } = player
    const { type } = action.data
    console.log("handlePlayerBlow: ", {
      x,
      rage,
      type,
      feathers: this.objects,
    })
    switch (type) {
      case "rectangle":
        this.objects.forEach((object) => {
          if (
            object.type === "feather" &&
            object.x >= x - 0.1 &&
            object.x <= x + 0.1 &&
            object.y >= 1 - (0.2 + rage / 200)
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
            object.ySpeed -= player.rage / 100
            object.playerBlew = player.id
          }
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
        break

      case "clench-give-up":
        console.log("clench-give-up: ", data)
        player.life += data.consumption / 2 // 返还一半体力
        break

      case "clench-too-long":
        break

      case "blow":
        this.handlePlayerBlow(player, action)
        break

      case "restart":
        this.restart()
        break

      default:
        break
    }

    player.state = type
  }

  public start() {
    this.state = "playing"
    this.players.forEach((p) => (p.prepared = false))
  }

  // reset states
  private restart() {
    // 玩家、关卡 都不要重置
    this.state = "waiting"
    this.tick = 0
    this.life = GAME_LIFE_MAX
    this.objects = []
    this.players.forEach((p) => {
      p.reset()
    })
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
