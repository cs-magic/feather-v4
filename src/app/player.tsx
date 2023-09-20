import { usePlayerStore } from "@/store/player.slice";
import { useEffect, useState } from "react";
import { animated, useSpring } from "@react-spring/web";
import { useElementSize } from "@mantine/hooks";
import { useGesture } from "@use-gesture/react";
import Image from "next/image";
import clsx from "clsx";
import useInterval from "@/hooks/interval";

export const Player = ({ container }: { container: { width: number } }) => {
  const { life, rage, setLife, setRage } = usePlayerStore();

  const [lifeCost, setLifeCost] = useState(0);
  const [isDragging, setDragging] = useState(false);
  const [isMoved, setMoved] = useState(false);
  const leftStart = container.width >> 1;
  const [{ left }, api] = useSpring(() => ({ left: 0 }));

  const { ref, width } = useElementSize();

  const shoot = (playerX: number, playerRage: number) => {
    // todo
  };

  // 玩家一开始居中（anchor也居中），完了，可以朝左或朝右移动到与容器对齐的位置，这两个距离是相等的
  const dragConstraint = (container.width - width) >> 1;

  const bind = useGesture(
    {
      onDrag: ({ movement: [mx], offset: [ox] }) => {
        console.log("onDrag");
        if (Math.abs(mx) > 10 && !isMoved) {
          setMoved(true);
        }
        console.log({ mx, ox, left: left.get() });
        api.start({ left: leftStart + ox });
      },
      onDragStart: () => {
        console.log("onDragStart");
        setDragging(true);
      },
      onDragEnd: () => {
        console.log("onDragEnd");
        setDragging(false);
        setMoved(false);

        // shoot if not moved
        if (!isMoved) {
          shoot(left.get(), rage);
        }
      },
    },
    {
      drag: {
        bounds: {
          left: -dragConstraint,
          right: dragConstraint,
        },
      },
    }
  );

  useEffect(() => {
    api.set({ left: leftStart });
  }, [container.width]);

  useInterval(() => {
    console.log("interval");
    if (isDragging) {
      console.log("拖动中");
      if (!isMoved) {
        console.log("蓄力中");
        setLifeCost(lifeCost + 1);
        setLife(life - 1);
      } else {
        setLife(life + lifeCost / 2); // 恢复一半体力消耗
        setLifeCost(0);
      }
    } else {
    }
  }, 50); // 50 fps

  // console.log({ container, leftStart, left: left.get(), dragConstraint });
  console.log({ life, rage });

  return (
    <animated.div
      {...bind()}
      style={{ left }}
      className={clsx(
        "absolute bottom-0 -translate-x-1/2 touch-none",
        "w-32" // 如果不固定 w 的话，absolute 的机制会让人物拖到右边后被压缩
      )}
    >
      <Image
        ref={ref}
        className={"touch-none select-none pointer-events-none w-full h-auto"}
        src={"/image/player/1-蓄力.png"}
        alt={"player"}
        width={120}
        height={160}
        priority
        sizes={"width:120px;"}
      />
    </animated.div>
  );
};
