import { usePlayerStore } from "@/store/player.slice"
import { PLAYER_LIFE_MAX, PLAYER_RAGE_MAX } from "@/config"

export const GameStatus = () => {
  const { life, rage } = usePlayerStore()

  return (
    <div className={"shrink-0 p-2 bg-base-100"}>
      <div className={"flex flex-col gap-2"}>
        <progress
          className="progress progress-accent w-56"
          value={life}
          max={PLAYER_LIFE_MAX}
        ></progress>

        <progress
          className="progress progress-error w-16"
          value={rage}
          max={PLAYER_RAGE_MAX}
        ></progress>
      </div>
    </div>
  )
}
