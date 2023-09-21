import { GameObjectBase, IObjBase, ObjID } from "@/lib/game/object/base"

export type ICoinObject = IObjBase<"coin">

export class CoinObject extends GameObjectBase<"coin"> implements ICoinObject {
  constructor(id: ObjID, x: number) {
    super("coin", id, x, x, x)
  }
}
