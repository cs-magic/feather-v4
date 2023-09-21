import "@/style/globals.css"
import { ThemeProvider } from "@/app/utils/theme.provider"
import { TrpcProvider } from "@/app/utils/trpc.provider"
import React, { PropsWithChildren } from "react"
import clsx from "clsx"
import Screen from "@/app/utils/screen"
import { TOP } from "@/config"

export const metadata = {
  title: "「吹羽毛」小游戏",
  description: "李佳琦吹羽毛",
}

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </head>

      <body>
        <Screen />

        <ThemeProvider>
          <TrpcProvider>
            <main
              className={clsx(
                "w-full h-full overflow-auto",
                "md:w-[640px] mx-auto border border-gray-800 flex flex-col bg-cover"
              )}
              style={{
                backgroundImage: `url(/image/rain01.gif)`,
              }}
            >
              {/*  顶部的花西子笔，（基于笔的高度）固定高度 */}
              <div
                className="bg-repeat-x w-full shrink-0"
                style={{
                  height: TOP,
                  backgroundImage: "url(/image/pen2.png)",
                }}
              />

              {children}
            </main>
          </TrpcProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
