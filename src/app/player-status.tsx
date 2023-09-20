import { PLAYER_LIFE_MAX, PLAYER_RAGE_MAX } from "@/config"
import { LabelLine, ProgressLabelLine } from "@/app/progress"
import { IPlayer } from "@/game/player"

export const PlayerStatus = ({ player }: { player: IPlayer }) => {
  const { life, rage, score } = player

  return (
    <div className={"shrink-0 p-2 bg-gray-700 z-50"}>
      <div className={"flex flex-col gap-2"}>
        <LabelLine label={"⭐️ 得分"}>{score}</LabelLine>

        <ProgressLabelLine
          label={"😁 体力值"}
          value={life}
          valueMax={PLAYER_LIFE_MAX}
          className={"progress-accent w-32"}
        />

        <ProgressLabelLine
          label={"🔥 充能条"}
          value={player.rage}
          valueMax={PLAYER_RAGE_MAX}
          className={"progress-warning w-32"}
        />
      </div>
    </div>
  )
}
