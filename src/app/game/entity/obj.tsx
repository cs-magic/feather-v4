import React, { forwardRef, HTMLAttributes } from "react"
import clsx from "clsx"
import { animated } from "@react-spring/web"
import { pos2str, SNumber } from "@/lib/number"
import { useElementSize } from "@mantine/hooks"
import { useTestStore } from "@/store"
import { ignore } from "@/lib/helpers"

export type IObjContainer = {
  // 坐标
  x: SNumber
  y: SNumber
} & HTMLAttributes<HTMLDivElement>

export const ObjContainer = ({
  x,
  y,
  className,
  children,
  style,
  ...props
}: IObjContainer) => {
  const { isTesting } = useTestStore()
  const { ref, width, height } = useElementSize()
  // console.log("obj: ", { width, height })
  return (
    <animated.div
      ref={ref}
      className={clsx(
        "w-fit -right-64", // 当超出时依旧显示全部子元素
        "absolute",
        "select-none touch-none",
        "bg-contain bg-center bg-no-repeat",
        isTesting && "border",
        className
      )}
      style={{
        top: (typeof y === "number" ? y : y.get()) - (height >> 1),
        left: (typeof x === "number" ? x : x.get()) - (width >> 1),
        ...style,
      }}
      onTouchEnd={ignore}
      {...props}
    >
      {isTesting && (
        <>
          <span className={"absolute right-0 top-0"}>
            {`x:${pos2str(x)}, y:${pos2str(y)}`}
          </span>
          <div
            className={
              "absolute left-1/2 top-1/2 w-2 h-2 bg-red-500 rounded-full -translate-x-1/2 -translate-y-1/2"
            }
          />
        </>
      )}

      {children}
    </animated.div>
  )
}

export type IObj = {
  // size
  w: number
  h: number

  // background image resource
  bg?: string
} & HTMLAttributes<HTMLDivElement> &
  IObjContainer

export const Obj = forwardRef<HTMLDivElement, IObj>(
  ({ w, h, x, y, bg, className, style, children, ...props }, ref) => {
    const { isTesting } = useTestStore()

    return (
      <animated.div
        ref={ref}
        className={clsx(
          "absolute -translate-y-1/2 -translate-x-1/2",
          "select-none touch-none",
          "bg-contain bg-center bg-no-repeat",
          isTesting && "border",
          className
        )}
        style={{
          width: w,
          height: h,
          top: y,
          left: x,
          backgroundImage: bg ? `url(${bg})` : undefined,
          ...style,
        }}
        onTouchEnd={ignore}
        {...props}
      >
        {isTesting && (
          <span className={"absolute right-0 top-0"}>
            {`x:${pos2str(x)}, y:${pos2str(y)}`}
          </span>
        )}
        {children}
      </animated.div>
    )
  }
)

Obj.displayName = "Obj"
