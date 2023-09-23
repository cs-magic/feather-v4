import "@/style/globals.css"
import { ThemeProvider } from "@/app/utils/theme.provider"
import { TrpcProvider } from "@/app/utils/trpc.provider"
import React, { PropsWithChildren } from "react"
import Screen from "@/app/utils/screen"
import { Theme, ThemePanel } from "@radix-ui/themes"

import "@radix-ui/themes/styles.css"

export const metadata = {
  title: "我要吹羽毛",
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
        <ThemeProvider>
          <Theme
            accentColor="crimson"
            grayColor="sand"
            radius="large"
            scaling="95%"
          >
            <Screen />
            <TrpcProvider>{children}</TrpcProvider>

            <ThemePanel defaultOpen={false} />
          </Theme>
        </ThemeProvider>
      </body>
    </html>
  )
}
