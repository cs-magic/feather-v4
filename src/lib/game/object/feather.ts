import { GameObjectBase, IObjBase, ObjID } from "@/lib/game/object/base"

export type IFeatherObject = IObjBase<"feather">

export class FeatherObject
  extends GameObjectBase<"feather">
  implements IFeatherObject
{
  // 羽毛可以携带被吹的人的信息（todo: 不一定有必要）
  public playerBlew?: string

  public constructor(id: ObjID, defaultYSpeed: number) {
    // 羽毛可以在一定横向距离内来回飘动
    const radius = 0.2
    const x = Math.random() * (1 - radius * 2) + radius
    const xMin = x - radius
    const xMax = x + radius
    super("feather", id, x, xMin, xMax, defaultYSpeed)

    // 方向随机控制
    this.xSpeed = (Math.random() > 1 ? 1 : -1) * 0.1
  }
}
