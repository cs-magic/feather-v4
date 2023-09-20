import { IGame } from "@/game/game-server"
import { PLAYER_DEFAULT_ID } from "@/config"

export const getMainPlayer = (game: IGame) =>
  game.players.find((p) => p.id === PLAYER_DEFAULT_ID)
