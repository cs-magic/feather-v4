import { GameEvent } from "@/lib/game/server"
import useSound from "use-sound"

export const useGameEventsHandler = (events: GameEvent[]) => {
  const [playGotCoin] = useSound("/sound/吃金币.mp3")
  const [playBlowLow] = useSound("/sound/吹.mp3", { volume: 0.5 })
  const [playBlowHigh] = useSound("/sound/吹.mp3", { volume: 1 })
  const [playFeatherTobeCoin] = useSound("/sound/羽毛变金币.wav", { volume: 1 })
  const [playSigh] = useSound("/sound/欸79.mp3", { volume: 1 })
  const [playToBeMad] = useSound("/sound/我真地快疯掉了.mp3", { volume: 1 })

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
}
