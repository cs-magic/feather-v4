import { HTMLAttributes, PropsWithChildren, ReactNode } from "react"
import clsx from "clsx"
import ReactMarkdown from "react-markdown"
import children = ReactMarkdown.propTypes.children

export const LabelLine = ({
  label,
  children,
}: { label: ReactNode } & PropsWithChildren) => {
  return (
    <div
      className={clsx(
        "inline-flex gap-2 items-center ",
        "select-none touch-none" // 关键，否则会误触
      )}
    >
      <span className={"text-xs font-medium w-12"}>{label} </span>
      {children}
    </div>
  )
}

export const ProgressLabelLine = ({
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
    <LabelLine label={label}>
      <progress
        className={clsx("progress w-32", className)}
        value={value}
        max={valueMax}
        {...props}
      />
    </LabelLine>
  )
}
