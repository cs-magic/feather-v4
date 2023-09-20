import { IGame } from "@/lib/game/game-server"
import useSound from "use-sound"
import { useEffect } from "react"

export const useAudio = ({ game }: { game: IGame }) => {
  const { state } = game
  const [playStart, { sound: soundStart, stop: stopStart, pause: pauseStart }] =
    useSound("/music/game-start.mp3", {
      id: "start",
    })
  const [playOver, { sound: soundOver, stop: stopOver, pause: pauseOver }] =
    useSound("/music/game-over.mp3", {
      id: "over",
    })
  // todo: resume ?
  useEffect(() => {
    console.log({ state })
    if (state === "playing") {
      stopOver()
      playStart()
    } else if (state === "over") {
      stopStart()
      playOver()
    } else if (state === "paused") {
      pauseStart()
    }
  }, [state])

  return {
    playStart,
  }
}
