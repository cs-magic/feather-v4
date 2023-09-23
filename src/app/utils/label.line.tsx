import { HTMLAttributes, PropsWithChildren, ReactNode } from "react"
import clsx from "clsx"
import { useLabelEnabled } from "@/store"

type ILabelLine = { icon?: string; label: ReactNode } & PropsWithChildren

export const LabelLine = ({ icon, label, children }: ILabelLine) => {
  const { value: labelEnabled } = useLabelEnabled()

  return (
    <div
      className={clsx(
        "flex gap-2 items-center text-xs font-medium",
        "select-none touch-none" // 关键，否则会误触
      )}
    >
      <label className={"w-fit"}>
        <span>{icon}</span>
        <span className={"ml-1"}>{labelEnabled && label}</span>
      </label>
      {children}
    </div>
  )
}

interface IProgressLabelLine
  extends ILabelLine,
    HTMLAttributes<HTMLProgressElement> {
  valueMax: number
  value: number
}

export const ProgressLabelLine = ({
  icon,
  label,
  valueMax,
  value,
  className,
  ...props
}: IProgressLabelLine) => {
  return (
    <LabelLine label={label} icon={icon}>
      <progress
        className={clsx("progress w-32", className)}
        value={value}
        max={valueMax}
        {...props}
      />
    </LabelLine>
  )
}
