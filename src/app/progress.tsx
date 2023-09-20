import { HTMLAttributes } from "react"
import clsx from "clsx"

export const ProgressWithLabel = ({
  label,
  valueMax,
  value,
  className,
  ...props
}: {
  label: string
  value: number
  valueMax: number
} & HTMLAttributes<HTMLProgressElement>) => {
  return (
    <div className={"inline-flex gap-2 items-center"}>
      <span className={"text-xs"}>{label} </span>
      <progress
        className={clsx("progress w-32", className)}
        value={value}
        max={valueMax}
        {...props}
      ></progress>
    </div>
  )
}
