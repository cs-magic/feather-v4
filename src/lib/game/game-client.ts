import { GameServer, IGame, ServerEvent } from "@/lib/game/game-server"
import { Player, PlayerAction } from "@/lib/game/player"
import { PLAYER_DEFAULT_ID } from "@/config"

export class GameClient {
  private server: GameServer
  public player: Player = new Player(PLAYER_DEFAULT_ID)

  public game?: IGame

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

  public on(event: ServerEvent) {}
}

export const client = new GameClient()
