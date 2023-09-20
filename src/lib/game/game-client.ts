import { GameServer, IGame } from "@/lib/game/game-server"
import { Player, PlayerAction } from "@/lib/game/player"
import { CLIENT_FPS, PLAYER_DEFAULT_ID } from "@/config"

export class GameClient {
  private server: GameServer = new GameServer()
  public player: Player = new Player(PLAYER_DEFAULT_ID)

  public game?: IGame

  public sync() {
    return (this.game = this.server.serialize())
  }

  constructor() {
    this.server.addPlayer(this.player)
  }

  public do(action: PlayerAction) {
    this.server.onPlayerAction(this.player.id, action)
  }
}

export const client = new GameClient()
