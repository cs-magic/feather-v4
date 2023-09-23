import { IPlayer } from "@/lib/game/player"
import { IGame } from "@/lib/game/server"
import { useTestingEnabled } from "@/store"
import clsx from "clsx"
import { PlayerStatus } from "@/app/game/entity/player"
import { LabelLine } from "@/app/utils/label.line"
import { GAME } from "@/config"
import { range } from "lodash"
import React from "react"
import * as Select from "@radix-ui/react-select"
import { SelectItemProps } from "@radix-ui/react-select"
import classnames from "classnames"
import { CheckIcon } from "@radix-ui/react-icons"
import { GameSettingsContainer } from "@/app/game/comp/settings"

export const GameStatusbar = ({
  player,
  game,
}: {
  player: IPlayer
  game: IGame
}) => {
  const { isTesting, setIsTesting } = useTestingEnabled()

  return (
    <div
      className={clsx(
        "absolute inset-0 w-full flex gap-2 justify-between p-2 sm:p-4"
        // "scale-[70%] -translate-x-[80px] -translate-y-[80px]"
      )}
    >
      {/* 左上： 玩家状态 */}

      <PlayerStatus player={player} />

      {/* 右上： 游戏状态*/}
      <div className={"flex flex-col gap-1 "}>
        <GameSettingsContainer asChild state={game.state}>
          <button className={"text-left"}>
            <LabelLine icon={"⚙️"} label={"设置"} />
          </button>
        </GameSettingsContainer>

        <LabelLine icon={"🚪"} label={"关卡"}>
          <p className={"text-xs font-medium text-primary"}>
            {game.stage.toString().padStart(2, "0")}
          </p>
        </LabelLine>

        <LabelLine icon={"💫"} label={"进度"}>
          <p className={"text-xs font-medium"}>
            {`${game.progress.toString().padStart(2, "0")} / ${
              GAME.targetFeathers
            }`}
          </p>
        </LabelLine>

        <LabelLine icon={"❤️"} label={"生命"}>
          <div className={"flex h-full divide-x border border-gray-200"}>
            {range(GAME.life.max).map((k, i) => (
              <div
                className={clsx(
                  "w-2 h-full border-gray-300",
                  i < game.life &&
                    (game.life <= GAME.life.max * 0.2
                      ? "bg-red-500"
                      : game.life <= GAME.life.max * 0.4
                      ? "bg-yellow-500"
                      : "bg-green-500")
                )}
                key={i}
              />
            ))}
          </div>
        </LabelLine>

        {process.env.NODE_ENV === "development" && (
          <button
            className={"btn btn-xs text-xs z-50"}
            onClick={() => {
              setIsTesting(!isTesting)
            }}
          >
            测试 ({isTesting ? "on" : "off"})
          </button>
        )}
      </div>
    </div>
  )
}

export const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <Select.Item
        className={classnames(
          "text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] pr-[35px] pl-[25px] relative select-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1",
          className
        )}
        {...props}
        ref={forwardedRef}
      >
        <Select.ItemText>{children}</Select.ItemText>
        <Select.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
          <CheckIcon />
        </Select.ItemIndicator>
      </Select.Item>
    )
  }
)
SelectItem.displayName = "SelectItem"
