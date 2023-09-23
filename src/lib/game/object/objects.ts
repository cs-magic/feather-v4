import { FeatherObject, IFeatherObj } from "@/lib/game/object/feather"
import { CoinObject, ICoinObj } from "@/lib/game/object/coin"

export type IGameObj = IFeatherObj | ICoinObj
export type GameObj = FeatherObject | CoinObject
