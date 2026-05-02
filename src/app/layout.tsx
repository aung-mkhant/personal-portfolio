import "./globals.css"
import { ThemeProvider } from "@/components/ThemeProvider"
import React from "react"
import { literata, youngSerif } from "@/lib/fonts"

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  const scriptProps =
    typeof window === "undefined"
      ? undefined
      : ({ type: "application/json" } as const)
  return (
    <html
      lang="en"
      className={` ${youngSerif.variable} ${literata.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-background text-foreground">
        <ThemeProvider
          scriptProps={scriptProps}
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
