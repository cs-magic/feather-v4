import { ICoinObj } from "@/lib/game/object/coin"
import { useTexture } from "@react-three/drei"
import React from "react"
import { DoubleSide, Mesh } from "three"
import { useFrame } from "@react-three/fiber"
import { ObjContainer } from "@/app/game/entity/obj"
import clsx from "clsx"

import { Coin1 } from "@/app/game/comp/coin/coin1"
import { useViewport } from "@/store"
import { TwoPassDoubleSide } from "three/src/constants"

const CSSCoin = ({ obj }: { obj: ICoinObj }) => {
  const {
    viewport: { w: vw, h: vh },
  } = useViewport()

  return (
    <ObjContainer
      x={obj.x * vw}
      y={obj.y * vh}
      className={clsx("animate-bounce z-50 pointer-events-none")}
    >
      <Coin1 />
    </ObjContainer>
  )
}

const CanvasCoin = ({ obj }: { obj: ICoinObj }) => {
  const coinTexture = useTexture("/image/coin.png")

  const meshRef = React.useRef<Mesh>(null)

  // Rotation on each frame

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01
    }
  })

  return (
    <mesh
      ref={meshRef}
      position={[(obj.x * 2 - 1) * 4, -(obj.y * 2 - 1) * 4, 0]}
    >
      <circleGeometry args={[0.5, 50]} />

      <meshBasicMaterial
        map={coinTexture}
        side={TwoPassDoubleSide}
        color={"#FFD700"} // gold color
        // Three.js - Render an object always on top, ref: https://stackoverflow.com/a/62818553/9422455
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  )
}

export const Coin = {
  canvas: CanvasCoin,
  css: CSSCoin,
}
