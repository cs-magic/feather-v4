import { IFeatherObj } from "@/lib/game/object/feather"
import { useViewportStore } from "@/hooks/use-viewpoint"
import { ObjContainer } from "@/app/game/entity/obj"
import clsx from "clsx"
import Image from "next/image"
import { Assets } from "@/assets"
import { ignore } from "@/lib/helpers"
import React from "react"
import { ICoinObj } from "@/lib/game/object/coin"
import { useTexture } from "@react-three/drei"

const CSSFeather = ({ obj }: { obj: IFeatherObj }) => {
  const { width: vw, height: vh } = useViewportStore()

  return (
    <ObjContainer
      x={obj.x * vw}
      y={obj.y * vh}
      className={clsx("animate-bounce z-50 pointer-events-none")}
    >
      <Image
        width={80}
        height={20}
        src={Assets.feather.src}
        alt={"object"}
        className={"pointer-events-none w-full h-auto"}
        onDragEnd={ignore}
      />
    </ObjContainer>
  )
}

const CanvasFeather = ({ obj }: { obj: IFeatherObj }) => {
  const featherTexture = useTexture("/image/feather.png")

  return (
    <sprite position={[(obj.x * 2 - 1) * 4, -(obj.y * 2 - 1) * 4, 0]}>
      <spriteMaterial attach="material" map={featherTexture} />
    </sprite>
  )
}

export const Feather = {
  css: CSSFeather,
  canvas: CanvasFeather,
}
