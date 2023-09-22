import { GameObjectBase, IObjBase, ObjID } from "@/lib/game/object/base"

export type ICoinObj = IObjBase<"coin">

export class CoinObject extends GameObjectBase<"coin"> implements ICoinObj {
  constructor(id: ObjID, x: number) {
    super("coin", id, x, x, x)
  }
}
