import "@/style/globals.css"
import { ThemeProvider } from "@/app/utils/theme.provider"
import { TrpcProvider } from "@/app/utils/trpc.provider"
import React, { PropsWithChildren } from "react"
import Screen from "@/app/utils/screen"

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

      <body className={"w-screen h-screen"}>
        <Screen />

        <ThemeProvider>
          <TrpcProvider>{children}</TrpcProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
