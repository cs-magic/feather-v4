import { ICoinObj } from "@/lib/game/object/coin"
import { useTexture } from "@react-three/drei"
import React from "react"
import { DoubleSide, Mesh } from "three"
import { useFrame } from "@react-three/fiber"
import { useViewportStore } from "@/hooks/use-viewpoint"
import { ObjContainer } from "@/app/game/entity/obj"
import clsx from "clsx"
import { Coin1 } from "@/app/game/comp/coin/types"

const CSSCoin = ({ obj }: { obj: ICoinObj }) => {
  const { width: vw, height: vh } = useViewportStore()

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
        side={DoubleSide}
        color={"#FFD700"} // gold color
      />
    </mesh>
  )
}

export const Coin = {
  canvas: CanvasCoin,
  css: CSSCoin,
}
