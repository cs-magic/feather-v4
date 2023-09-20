import { GameServer, IGame } from "@/lib/game/game-server"
import { Player, PlayerAction } from "@/lib/game/player"
import { CLIENT_FPS, PLAYER_DEFAULT_ID } from "@/config"

export class GameClient {
  private server: GameServer = new GameServer()
  private player: Player = new Player(PLAYER_DEFAULT_ID)

  public data: IGame = this.server.serialize()

  private interval = setInterval(() => {
    this.data = this.server.serialize()
  }, 1000 / CLIENT_FPS)

  constructor() {
    this.server.addPlayer(this.player)
  }

  public do(action: PlayerAction) {
    this.server.onPlayerAction(this.player.id, action)
  }
}

export const client = new GameClient()
