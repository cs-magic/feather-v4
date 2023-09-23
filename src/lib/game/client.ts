import { GameServer } from "@/lib/game/server"
import { Player, PlayerAction } from "@/lib/game/player"
import { PLAYER } from "@/config"

export class GameClient {
  public server: GameServer
  public player: Player
  private eventsRead = 0

  constructor() {
    this.server = new GameServer(0.1, 0.03)
    this.player = new Player(PLAYER.id.default)
    this.server.onPlayerJoin(this.player)
  }

  public sync() {
    const events = this.server.events.slice(this.eventsRead)
    this.eventsRead = this.server.events.length
    return {
      game: this.server.serialize(),
      events,
    }
  }

  public do(action: PlayerAction) {
    this.server.onPlayerAction(this.player.id, action)
  }
}

export let client = new GameClient()

export const restartClient = () => {
  client = new GameClient()
}
