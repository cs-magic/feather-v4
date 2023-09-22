import React, { useEffect, useState } from "react"
import { client, IClientGameData } from "@/lib/game/client"
import useInterval from "@/hooks/use-interval"
import { CLIENT_FPS } from "@/config"
import { useTexture } from "@react-three/drei"
import { GameCanvas } from "@/app/game/game-canvas"

interface ImageProps {
  url: string

  position: [number, number, number]
}

const Image: React.FC<ImageProps> = ({ url, position }) => {
  const texture = useTexture("/image/feather.png")

  return (
    <sprite position={position}>
      <spriteMaterial attach="material" map={texture} />
    </sprite>
  )
}

const App = () => {
  const [game, setGame] = useState<IClientGameData>()

  useInterval(() => {
    setGame(client.sync())
  }, 1000 / CLIENT_FPS)

  useEffect(() => {
    client.do({ type: "prepare" })
  }, [])

  return <GameCanvas game={game} />
}

export default App
