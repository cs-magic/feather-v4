import { FeatherObject, IFeatherObject } from "@/lib/game/object/feather"
import { CoinObject, ICoinObject } from "@/lib/game/object/coin"

export type IGameObj = IFeatherObject | ICoinObject
export type GameObj = FeatherObject | CoinObject
