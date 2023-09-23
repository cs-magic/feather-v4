import { GAME } from "@/config"
import { IPlayer, Player, PlayerAction, PlayerID } from "@/lib/game/player"
import { ObjID } from "@/lib/game/object/base"
import { FeatherObject } from "@/lib/game/object/feather"
import { CoinObject } from "@/lib/game/object/coin"
import { GameObj, IGameObj } from "@/lib/game/object/objects"

export type IGameEvent =
  | {
      type: "player-got-coin"
      playerId: PlayerID
      objId: ObjID
    }
  | {
      type: "feather-tobe-coin"
      playerId: PlayerID
      objId: ObjID
    }
  | {
      type: "feather-onto-ground"
      objId: ObjID
    }
  | {
      type: "coin-onto-ground"
      objId: ObjID
    }
  | {
      type: "blow"
      player: IPlayer
    }

/**
 * 这是服务器的状态，但也可以表示用户的状态
 *
 * 但是我们的机制设置为，用户在client端基于do触发服务器状态更新
 * 于是用户最好额外维护一个客户端的状态
 */
export type GameServerState =
  // 用户在主页
  | "waiting"
  // 用户在结束页
  | "over"
  // 用户 playing / paused 都代表在玩游戏
  | "playing"
  | "paused"

export type IClientState = GameServerState

export interface IGame {
  stage: number
  state: GameServerState
  tick: number
  progress: number
  life: number
  players: IPlayer[]
  objs: IGameObj[]
}

export class GameServer implements IGame {
  // configurable
  public featherInterval

  // states
  public state: GameServerState = "waiting"
  public stage = 1 // 关卡
  public tick = 0
  public life = GAME.life.max // 游戏的血条由掉落的羽毛控制
  public players: Player[] = []
  public objs: GameObj[] = []
  public progress = 0

  public events: IGameEvent[] = []

  constructor(featherInterval: number = 5, defaultYSpeed: number = 0.06) {
    this.featherInterval = featherInterval

    setInterval(() => {
      if (this.state !== "playing") return

      this.tick += 1

      if (this.progress < GAME.targetFeathers) {
        // n 秒新增一片羽毛
        if (this.tick % (GAME.fps.server * this.featherInterval) === 1)
          this.objs.push(new FeatherObject(++this.progress, defaultYSpeed))
      }

      // 更新玩家的体力等
      this.players.forEach((p) => p.nextTick())

      // 更新羽毛与花西币等
      this.objs.forEach((f) => f.nextTick())
      for (let i = this.objs.length - 1; i >= 0; --i) {
        const obj = this.objs[i]
        const { x, y } = obj

        switch (obj.type) {
          case "feather":
            if (y >= 0 && y < 1) break

            this.objs.splice(i, 1)

            // 羽毛撞到笔，用户奖励 +1
            if (y < 0) {
              const player = this.players.find((p) => p.id === obj.playerBlew)
              if (player) {
                player.score += 1
                this.events.push({
                  type: "feather-tobe-coin",
                  playerId: player.id,
                  objId: obj.id,
                })
              }
              this.objs.push(new CoinObject(obj.id, x))
            }
            // 羽毛落地，游戏生命值 -1
            else if (y >= 1) {
              this.life--
              this.events.push({
                type: "feather-onto-ground",
                objId: obj.id,
              })
            }
            break

          case "coin":
            if (y < 0.8) break
            if (y >= 1) {
              this.events.push({
                type: "coin-onto-ground",
                objId: obj.id,
              })
              this.objs.splice(i, 1)
              // this.life -= 2
              break
            }

            // 寻找附近的玩家
            const adjPlayers = this.players
              .map((p) => ({ p, distance: Math.abs(p.x - x) }))
              .sort((a, b) => a.distance - b.distance)

            if (adjPlayers.length) {
              this.events.push({
                type: "player-got-coin",
                objId: obj.id,
                playerId: adjPlayers[0].p.id,
              })
              adjPlayers[0].p.score += 2
              this.objs.splice(i, 1)
            }
            break

          default:
            break
        }
      }

      if (
        // 玩家挑战失败
        this.life < 0 ||
        // 玩家挑战成功
        !this.objs.length
      ) {
        this.state = "over"
      }
    }, 1000 / GAME.fps.server)
  }

  public onPlayerJoin(player: Player) {
    this.players.push(player)
  }

  public onPlayerQuit(playerId: PlayerID) {
    delete this.players[this.players.findIndex((p) => p.id === playerId)]
  }

  public onPlayerAction(playerId: PlayerID, action: PlayerAction) {
    // console.log({ playerId, action })
    const { type } = action
    const player = this.players.find((p) => p.id === playerId)
    if (!player) return

    switch (type) {
      case "prepare":
        player.prepared = !player.prepared
        if (this.players.every((p) => p.prepared)) {
          this.start()
        }
        break

      case "pause":
        this.pause()
        break

      case "resume":
        this.resume()
        break

      case "move":
        // console.log("onMove")
        player.x = action.x
        break

      case "clench-start":
      case "pressDown":
        console.log("onPressDown")
        player.pressing = true
        player.pressDownTime = Date.now()
        player.pressDownX =
          "x" in action
            ? action.x
            : // clench-start 不需要上报 x 位置
              player.x
        break

      case "clench-end":
      case "pressUp":
        console.log("onPressUp")
        //  既可以是 idle，也可以是 clenching，吹气
        if (player.state !== "moving") {
          this.events.push({ type: "blow", player })
          player.blow(this.objs)
        }

        player.pressing = false
        player.state = "idle"
        console.log("player state: --> idle")
        break

      case "stop":
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

  public serialize(): IGame {
    return {
      stage: this.stage,
      state: this.state,
      tick: this.tick,
      life: this.life,
      players: this.players.map((p) => p.serialize()),
      objs: this.objs.map((f) => f.serialize()),
      progress: this.progress,
    }
  }
}
