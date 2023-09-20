import "@/style/globals.css"

export const metadata = {
  title: "「吹羽毛」小游戏",
  description: "李佳琦吹羽毛",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </head>

      <body>{children}</body>
    </html>
  )
}
