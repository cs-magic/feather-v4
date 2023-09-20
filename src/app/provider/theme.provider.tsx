"use client"

import { ThemeProvider as NextThemeProvider } from "next-themes"
import { PropsWithChildren } from "react"

export function ThemeProvider({ children }: PropsWithChildren) {
  return <NextThemeProvider defaultTheme={"dark"}>{children}</NextThemeProvider>
}
