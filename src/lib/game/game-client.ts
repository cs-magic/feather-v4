import { GameServer, IGameData, GameEvent } from "@/lib/game/game-server"
import { Player, PlayerAction } from "@/lib/game/player"
import { PLAYER_DEFAULT_ID } from "@/config"

export class GameClient {
  public server: GameServer
  public player: Player = new Player(PLAYER_DEFAULT_ID)

  public game?: IGameData

  public eventsRead = 0

  public sync() {
    return (this.game = this.server.serialize())
  }

  constructor() {
    this.server = new GameServer()
    this.server.onPlayerJoin(this.player)
  }

  public restart() {
    this.server = new GameServer()
    this.server.onPlayerJoin(this.player)
  }

  public do(action: PlayerAction) {
    this.server.onPlayerAction(this.player.id, action)
  }

  public on(event: GameEvent) {}
}

export const client = new GameClient()
