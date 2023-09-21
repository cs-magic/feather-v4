import { GameState } from "@/lib/game/server"
import useSound from "use-sound"
import { useEffect, useState } from "react"

export const useAudio = (state?: GameState) => {
  const [triggered, setTriggered] = useState(false)

  const [
    playStart,
    {
      sound: soundStart,
      stop: stopStart,
      pause: pauseStart,
      duration: durationStart,
    },
  ] = useSound("/sound/game-start.mp3", {})

  const [playOver, { sound: soundOver, stop: stopOver, pause: pauseOver }] =
    useSound("/sound/game-over.mp3", {})

  useEffect(() => {
    // todo: resume ?
    if (
      // 当游戏开始后正式开始音乐
      state === "playing" &&
      // 基于web规定，在用户没有操纵网页之前，无法自动播放音乐
      // triggered &&
      // 在音乐没有加载之前，播放会失效，导致没有音乐
      durationStart
    ) {
      stopOver()
      playStart()
    } else if (state === "over") {
      stopStart()
      playOver()
    } else if (state === "paused") {
      pauseStart()
    }
  }, [state, triggered, durationStart])

  // console.log({ durationStart })

  return {
    setTriggered,
  }
}
