import { FeatherObject, IFeatherObject } from "@/lib/game/object/feather"
import { CoinObject, ICoinObj } from "@/lib/game/object/coin"

export type IGameObj = IFeatherObject | ICoinObj
export type GameObj = FeatherObject | CoinObject
