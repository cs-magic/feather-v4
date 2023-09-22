import { IClientGameData } from "@/lib/game/client"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import React from "react"
import { useTexture } from "@react-three/drei"
import { IGameData } from "@/lib/game/server"
import { useViewportStore } from "@/hooks/use-viewpoint"
import { Coin1, Coin2 } from "@/app/game/comp/coin"
import { DoubleSide, Mesh } from "three"
import { ICoinObj } from "@/lib/game/object/coin"

const Coin = ({ obj }: { obj: ICoinObj }) => {
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

export const GameCanvasImages = ({ gameData }: { gameData: IGameData }) => {
  const {
    viewport: { width: tw, height: th },
  } = useThree()

  const { width: vw, height: vh } = useViewportStore()
  console.log({ tw, th, vw, vh })

  const featherTexture = useTexture("/image/feather.png")
  const coinTexture = useTexture("/image/coin.png")

  return (
    <>
      {gameData.objs.map((obj, index) =>
        obj.type === "feather" ? (
          <sprite
            position={[(obj.x * 2 - 1) * 4, -(obj.y * 2 - 1) * 4, 0]}
            key={index}
          >
            <spriteMaterial
              attach="material"
              map={obj.type === "feather" ? featherTexture : coinTexture}
            />
          </sprite>
        ) : (
          <Coin obj={obj} key={index} />
        )
      )}
    </>
  )
}

export const GameCanvas = ({ data, events }: IClientGameData) => {
  return (
    <Canvas>
      <GameCanvasImages gameData={data} />
    </Canvas>
  )
}
