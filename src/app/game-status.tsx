import { usePlayerStore } from "@/store/player.slice"
import { PLAYER_LIFE_MAX, PLAYER_RAGE_MAX } from "@/config"
import { ProgressWithLabel } from "@/app/progress"

export const GameStatus = () => {
  const { life, rage } = usePlayerStore()

  return (
    <div className={"shrink-0 p-2 bg-base-100"}>
      <div className={"flex flex-col gap-2"}>
        <ProgressWithLabel
          label={"😁体力值"}
          value={life}
          valueMax={PLAYER_LIFE_MAX}
          className={"progress-accent w-32"}
        />

        <ProgressWithLabel
          label={"😡愤怒值"}
          value={rage}
          valueMax={PLAYER_RAGE_MAX}
          className={"progress-error w-16"}
        />
      </div>
    </div>
  )
}
