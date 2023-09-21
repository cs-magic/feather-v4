import { GameServer, IGameData, GameEvent } from "@/lib/game/server"
import { Player, PlayerAction } from "@/lib/game/player"
import { PLAYER, PLAYER_DEFAULT_ID } from "@/config"

export interface IClientGameData {
  data: IGameData
  events: GameEvent[]
}

export class GameClient {
  public server: GameServer
  public player: Player
  private eventsRead = 0

  public sync(): IClientGameData {
    const events = this.server.events.slice(this.eventsRead)
    this.eventsRead = this.server.events.length
    return {
      data: this.server.serialize(),
      events,
    }
  }

  constructor() {
    this.server = new GameServer()
    this.player = new Player(PLAYER.id.default)
    this.server.onPlayerJoin(this.player)
  }

  public do(action: PlayerAction) {
    this.server.onPlayerAction(this.player.id, action)
  }
}

export let client = new GameClient()

export const restartClient = () => {
  client = new GameClient()
}
