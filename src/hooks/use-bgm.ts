import useSound from "use-sound"
import { useEffect } from "react"
import { useBGM, useEvents, useGame } from "@/store"

export const usePlayingBGM = () => {
  const { value: bgmEnabled } = useBGM()
  const { game } = useGame()
  const state = game?.state

  const [play, { sound, stop, pause, duration }] = useSound(
    "/sound/game-start.mp3",
    {}
  )

  /**
   * 用户偏好开，且游戏正在进行，则播放音乐
   * 用户偏好无论是否开，游戏一旦结束，则停止音乐
   */

  useEffect(() => {
    if (!duration) return
    if (!bgmEnabled || state === "paused") {
      pause()
      return
    }
    if (state === "over") {
      stop()
      return
    }
    if (state === "playing") {
      play()
      return
    }
  }, [state, duration, bgmEnabled])
}

export const useEndingBGM = () => {
  const { value: bgmEnabled } = useBGM()
  const { game } = useGame()
  const state = game?.state

  const [play, { sound, stop, pause, duration }] = useSound(
    "/sound/game-over.mp3",
    {}
  )

  useEffect(() => {
    if (state === "over" && bgmEnabled && duration) {
      stop()
    }
  }, [state, bgmEnabled, duration])
}

export const useEventsBGM = () => {
  const { value: bgmEnabled } = useBGM()
  const { events } = useEvents()

  const [playGotCoin] = useSound("/sound/吃金币.mp3")
  const [playBlowLow] = useSound("/sound/吹.mp3", { volume: 0.5 })
  const [playBlowHigh] = useSound("/sound/吹.mp3", { volume: 1 })
  const [playFeatherTobeCoin] = useSound("/sound/羽毛变金币.wav", { volume: 1 })
  const [playSigh] = useSound("/sound/欸79.mp3", { volume: 1 })
  const [playToBeMad] = useSound("/sound/我真地快疯掉了.mp3", { volume: 1 })

  useEffect(() => {
    if (!bgmEnabled) return

    events.forEach((e) => {
      switch (e.type) {
        case "blow":
          const play = e.player.rage > 80 ? playBlowHigh : playBlowLow
          play()
          break
        case "feather-onto-ground":
          playSigh()
          break
        case "coin-onto-ground":
          playToBeMad()
          break
        case "feather-tobe-coin":
          playFeatherTobeCoin()
          break
        case "player-got-coin":
          playGotCoin()
          break
        default:
          break
      }
    })
  }, [bgmEnabled, events])
}
