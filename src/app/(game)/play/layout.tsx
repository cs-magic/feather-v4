"use client"
import { Player } from "@/app/components/player"
import React, { PropsWithChildren, useEffect } from "react"
import { client } from "@/lib/game/game-client"
import { useElementSize } from "@mantine/hooks"

export default function GamePage({ children }: PropsWithChildren) {
  const { ref, width } = useElementSize()

  useEffect(() => {
    client.do({ type: "prepare" })
  }, [])

  return (
    <>
      {/* 道具*/}
      {children}

      {/* 人 */}
      <div
        ref={ref}
        className={"select-none touch-none shrink-0 relative h-36"}
        onTouchEnd={(event) => event.preventDefault()}
      >
        <Player container={{ width }} player={client.player} />
      </div>
    </>
  )
}
