import { IGame } from "@/lib/game/server"
import { useRenderMode } from "@/store"
import { useViewportStore } from "@/hooks/use-viewpoint"
import { ObjContainer } from "@/app/game/entity/obj"
import clsx from "clsx"
import Image from "next/image"
import { Assets } from "@/assets"
import { ignore } from "@/lib/helpers"
import { Canvas } from "@react-three/fiber"
import React, { Fragment } from "react"
import { Feather } from "@/app/game/comp/feather"
import { Coin } from "@/app/game/comp/coin"
import { Coin1 } from "@/app/game/comp/coin/coin1"

export const GameRender = ({ game }: { game: IGame }) => {
  const { value: renderMode } = useRenderMode()
  const { width: vw, height: vh } = useViewportStore()

  switch (renderMode) {
    case "CSS":
      return game.objs.map((f, i) => (
        <ObjContainer
          key={i}
          x={f.x * vw}
          y={f.y * vh}
          className={clsx("animate-bounce pointer-events-none")}
        >
          {f.type === "feather" && (
            <Image
              width={80}
              height={20}
              src={Assets.feather.src}
              alt={"object"}
              className={"pointer-events-none w-full h-auto"}
              onDragEnd={ignore}
            />
          )}
          {f.type === "coin" && <Coin1 />}
        </ObjContainer>
      ))

    case "Canvas":
      return (
        <Canvas>
          {game.objs.map((obj, index) => (
            <Fragment key={index}>
              {obj.type === "feather" && <Feather.canvas obj={obj} />}
              {obj.type === "coin" && <Coin.canvas obj={obj} />}
            </Fragment>
          ))}
        </Canvas>
      )

    default:
      throw new Error("")
  }
}
